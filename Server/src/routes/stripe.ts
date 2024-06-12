import express from "express";
import Stripe from "stripe";
import bodyParser from "body-parser";
import { STRIPE_PRIVATE_KEY, STRIPE_ENDPOINT_SECRET } from "../config";
import Ad from "../models/ad.model";

const router = express.Router();
const stripe = new Stripe(STRIPE_PRIVATE_KEY || "");

router.post(
  "/",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const payload = req.body;
      const sig = req.headers["stripe-signature"];

      let event;

      if (!sig || !STRIPE_ENDPOINT_SECRET) {
        return res
          .status(400)
          .send(`Webhook Error: No sig or no endpoint secret`);
      }
      event = stripe.webhooks.constructEvent(
        payload,
        sig,
        STRIPE_ENDPOINT_SECRET
      );

      if (event.type === "checkout.session.completed") {
        const session = await stripe.checkout.sessions.retrieve(
          event.data.object.id
        );

        const { metadata, payment_intent } = session;

        const ad = await Ad.findById(metadata?._id);
        if (ad && payment_intent) {
          ad.stripe_payment_id =
            typeof payment_intent === "string"
              ? payment_intent
              : payment_intent.id;
          ad.status = "paid";
          await ad.save();
        }

        res.status(200).end();
      }
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err}`);
    }
  }
);
export default router;
