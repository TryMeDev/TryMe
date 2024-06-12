import express, { Request, Response } from "express";
import auth from "../middlewares/auth";
import Cat from "../models/cat.model";
import User from "../models/user.model";

const router = express.Router();
export type display = { en: string; "zh-TW": string };

// audience/publisher/admin get cats
router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await Cat.find({}).lean();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// admin create cat
router.post("/", auth, async (req: Request, res: Response) => {
  try {
    const email = res.locals.email;
    const user = await User.findOne({ email }).lean();
    if (!user || !user.isAdmin) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const {
      display,
    }: {
      display: display;
    } = req.body;

    const cat = await Cat.create({ display });

    return res.status(200).json(cat);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// admin update cat
router.put("/", auth, async (req: Request, res: Response) => {
  try {
    const email = res.locals.email;
    const user = await User.findOne({ email }).lean();
    if (!user || !user.isAdmin) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const {
      catId,
      display,
    }: {
      catId: string;
      display: { en: string; "zh-TW": string };
    } = req.body;

    const cat = await Cat.findOne({ _id: catId });
    if (cat) {
      cat.display = display;
      await cat.save();
    }

    return res.status(200).json(cat);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default router;
