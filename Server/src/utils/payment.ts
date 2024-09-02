import Stripe from "stripe";
import { PUBLISHER_URL, STRIPE_PRIVATE_KEY } from "../config";
import { displayDate, getDaysDiff } from "./time";

const UNIT_PRICE = 1;
const stripe = new Stripe(STRIPE_PRIVATE_KEY || "");

export async function createPaymentSession(ad: any, email: string) {
  return await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    metadata: { _id: ad._id.toString() },
    customer_email: email,
    allow_promotion_codes: true,
    payment_intent_data: { capture_method: "manual" },
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${displayDate(ad.startDate)}-${displayDate(
              ad.endDate
            )}: ${ad.locations.join(", ")}`,
          },
          unit_amount:
            UNIT_PRICE *
            getDaysDiff(new Date(ad.startDate), new Date(ad.endDate)) *
            100,
        },
        quantity: 1,
      },
    ],
    success_url: `${PUBLISHER_URL}`,
  });
}

export async function capturePayment(paymentIntent: string) {
  return await stripe.paymentIntents.capture(paymentIntent);
}

export async function cancelPayment(paymentIntent: string) {
  return await stripe.paymentIntents.cancel(paymentIntent);
}

export async function refund(paymentIntent: string, amount: number) {
  return await stripe.refunds.create({
    payment_intent: paymentIntent,
    amount,
  });
}
