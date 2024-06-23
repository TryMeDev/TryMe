import express, { Request, Response } from "express";
import User from "../models/user.model";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { GOOGLE_CLIENT_ID, JWT_SECRET } from "../config";

const router = express.Router();

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token: string) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: "Invalid user detected. Please try again" };
  }
}

// publisher register/login;
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { clientId, credential } = req?.body?.credentials;
    if (credential) {
      const verificationResponse = await verifyGoogleToken(credential);

      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const email = verificationResponse?.payload?.email;
      let user = await User.findOne({ email: email }).lean();

      if (!user) {
        user = await User.create({ email });
      }

      if (JWT_SECRET) {
        const token = jwt.sign({ email }, JWT_SECRET, {
          expiresIn: "30d",
        });
        return res.status(200).json({ token });
      } else {
        return res.status(500).json("No JWT Secret");
      }
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    return res.status(500).json("error");
  }
});

export default router;
