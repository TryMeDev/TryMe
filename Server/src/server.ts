import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import InitiateMongoServer from "./db";
import { ADMIN_URL, AUDIENCE_URL, PORT, PUBLISHER_URL } from "./config";
import adRouter from "./routes/ad";
import catRouter from "./routes/cat";
import userRouter from "./routes/user";
import stripeRouter from "./routes/stripe";
import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

InitiateMongoServer();

const app: Express = express();
const port = PORT || 5000;

app.use(
  cors({
    origin: [
      ADMIN_URL || "http://localhost:5173/",
      PUBLISHER_URL || "http://localhost:5173/",
      AUDIENCE_URL || "http://localhost:5173/",
    ],
  })
);

app.use(limiter);

app.use("/stripe", stripeRouter);

app.use(express.json());

app.use("/ad", adRouter);
app.use("/cat", catRouter);
app.use("/user", userRouter);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  const error = {
    status: 404,
    message: "Api endpoint does not found",
  };
  next(error);
});

app.listen(port, () => {
  console.log(`${port}`);
});
