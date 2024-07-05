import express, { Request, Response } from "express";
import Ad from "../models/ad.model";
import auth from "../middlewares/auth";
import mongoose, { isValidObjectId } from "mongoose";
import User from "../models/user.model";
import { uploadImages } from "../middlewares/upload";
import Tag from "../models/tag.model";
import {
  cancelPayment,
  capturePayment,
  createPaymentSession,
} from "../utils/payment";
import { isTimeConflict } from "../utils/time";

const router = express.Router();

function convertAd(ad: any) {
  return {
    ...(ad.toObject !== undefined ? ad.toObject() : ad),
    imgs: ad.imgs.map(
      (img: Buffer) => "data:image;base64," + img.toString("base64")
    ),
  };
}
function convertAds(ads: any[]) {
  return ads.map((ad) => convertAd(ad));
}

// use set is faster for large array; for loop is faster for small array
function hasIntersection(arr1: any[], arr2: any[]) {
  for (let item of arr1) {
    if (arr2.includes(item)) {
      return true;
    }
  }
  return false;
}

// audience get by id after browse
router.post("/getbyid", async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;

    const ad = await Ad.findById(_id);

    if (ad && ad.status === "approved") {
      ad.explosure = ad.explosure + 1;
      await ad.save();
      const convertedAd = convertAd(ad);
      return res.status(200).json({
        _id: convertedAd._id,
        imgs: convertedAd.imgs,
        links: convertedAd.links,
        tags: convertedAd.tags,
        catIds: convertedAd.catIds,
        is18: convertedAd.is18,
      });
    }
    return res.status(404).json({ msg: "Not Found" });
  } catch (error) {
    console.log(JSON.stringify(error));
    return res.status(500).json("error");
  }
});

// audience browse or search
router.post("/browse", async (req: Request, res: Response) => {
  try {
    const { excludedCatIds, tags, locations, is18 } = req.body;
    const isBrowse = tags.length === 0;

    let searchCriteria = {};
    if (isBrowse) {
      if (is18) {
        searchCriteria = {
          status: "approved",
          endDate: { $gte: new Date() },
          locations: { $in: locations },
          startDate: { $lte: new Date() },
          catIds: { $nin: excludedCatIds },
        };
      } else {
        searchCriteria = {
          status: "approved",
          is18: false,
          endDate: { $gte: new Date() },
          locations: { $in: locations },
          startDate: { $lte: new Date() },
          catIds: { $nin: excludedCatIds },
        };
      }
    } else {
      if (is18) {
        searchCriteria = {
          status: "approved",
          endDate: { $gte: new Date() },
          tags: { $in: tags },
          locations: { $in: locations },
          startDate: { $lte: new Date() },
        };
      } else {
        searchCriteria = {
          status: "approved",
          is18: false,
          endDate: { $gte: new Date() },
          tags: { $in: tags },
          locations: { $in: locations },
          startDate: { $lte: new Date() },
        };
      }
    }

    const ads = await Ad.aggregate([
      {
        $match: searchCriteria,
      },
      {
        $project: {
          _id: 1,
        },
      },
      { $sample: { size: 100 } },
    ]);

    return res.status(200).json(ads.map((ad) => ad._id));
  } catch (error) {
    console.log(JSON.stringify(error));
    return res.status(500).json("error");
  }
});

// audience / admin autocomplete tags
router.get("/tags", async (req: Request, res: Response) => {
  try {
    const tags = await Tag.find({}, { _id: 0, name: 1 }).lean();
    return res.status(200).json(tags);
  } catch (error) {
    console.log(JSON.stringify(error));
    return res.status(500).json("error");
  }
});

// publisher get ad history
router.get("/profile", auth, async (req: Request, res: Response) => {
  try {
    const email = res.locals.email;
    const user = await User.findOne({ email }).lean();
    if (!user) {
      return res.status(400).json({ msg: "Bad Request" });
    }
    const ads = await Ad.find(
      {
        _id: { $in: user.adIds },
      },
      {
        imgs: 1,
        links: 1,
        startDate: 1,
        endDate: 1,
        status: 1,
        locations: 1,
        tags: 1,
        catIds: 1,
        statusDescription: 1,
        is18: 1,
        explosure: 1,
      }
    ).lean();

    return res.status(200).json(convertAds(ads));
  } catch (error) {
    console.log(JSON.stringify(error));
    return res.status(500).json("error");
  }
});

// admin get ad for approval
router.post("/adminsearch", auth, async (req: Request, res: Response) => {
  try {
    const email = res.locals.email;
    const user = await User.findOne({ email }).lean();
    if (!user || !user.isAdmin) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const { search, earlierThan, locations, statuses } = req.body;

    const query: any = { $and: [] };
    if (isValidObjectId(search)) {
      const ad = await Ad.findById(search).lean();
      if (ad) {
        return res.status(200).json(convertAd(ad));
      }
    }

    if (Array.isArray(locations) && locations.length !== 0) {
      query.$and.push({ locations: { $in: locations } });
    }

    if (Array.isArray(statuses) && statuses.length !== 0) {
      query.$and.push({ status: { $in: statuses } });
    }

    if (earlierThan) {
      query.$and.push({
        startDate: { $lte: new Date(earlierThan as string) },
      });
    }

    if (search && typeof search === "string") {
      query.$and.push({ $text: { $search: search } });
    }

    const pipeline = [{ $match: query }, { $sample: { size: 1 } }];

    const [ad] = await Ad.aggregate(pipeline);

    if (ad) {
      return res.status(200).json(convertAd(ad));
    } else {
      return res.status(404).json({ msg: "Not Found" });
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    return res.status(500).json({ msg: "Internal server error" });
  }
});

// publisher create unpaid ad
router.post("/", auth, uploadImages, async (req: Request, res: Response) => {
  try {
    const email = res.locals.email;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Bad Request" });
    }

    const {
      links,
      startDate,
      endDate,
      locations,
    }: {
      links: string[];
      startDate: Date;
      endDate: Date;
      locations: string[];
    } = JSON.parse(req.body.data);

    const userAds = await Ad.find({
      _id: { $in: user.adIds },
      status: { $in: ["unpaid", "paid", "approved"] },
    }).lean();

    if (
      isTimeConflict(
        { startDate, endDate },
        userAds
          .filter((ad) => hasIntersection(locations, ad.locations))
          .map((ad) => ({
            startDate: ad.startDate,
            endDate: ad.endDate,
          }))
      )
    ) {
      return res.status(400).json({ msg: "Bad Request" });
    }

    const ad = await Ad.create({
      imgs: (req.files as Express.Multer.File[]).map((file) => file.buffer),
      links,
      startDate,
      endDate,
      createDate: new Date(),
      status: "unpaid",
      locations,
      tags: [],
      catIds: [],
      statusDescription: "",
      is18: false,
    });

    user.adIds = [...user.adIds, ad._id];
    await user.save();

    const session = await createPaymentSession(ad, user.email);
    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.log(JSON.stringify(error));
    return res.status(500).json("error");
  }
});

// publisher pay for unpaid ad
router.put("/pay", auth, async (req: Request, res: Response) => {
  try {
    const email = res.locals.email;
    const user = await User.findOne({ email }).lean();

    if (!user) {
      return res.status(400).json({ msg: "Bad Request" });
    }

    const { adId } = req.body;
    if (!user.adIds.map((id) => id.toString()).includes(adId)) {
      return res.status(400).json({ msg: "Bad Request" });
    }

    const ad = await Ad.findById(adId);

    if (!ad) {
      return res.status(400).json({ msg: "Bad Request" });
    }
    if (ad.status !== "unpaid") {
      return res.status(400).json({ msg: "Bad Request" });
    }

    const session = await createPaymentSession(ad, user.email);
    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.log(JSON.stringify(error));
    return res.status(500).json("error");
  }
});

// admin review ad
router.put("/", auth, async (req: Request, res: Response) => {
  try {
    const email = res.locals.email;
    const user = await User.findOne({ email }).lean();

    if (!user || !user.isAdmin) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const {
      adId,
      catIds,
      tags,
      status,
      statusDescription,
      is18,
    }: {
      adId: string;
      catIds: string[];
      tags: string[];
      status: "unpaid" | "paid" | "approved" | "rejected" | "canceled";
      statusDescription: string;
      is18: boolean;
    } = req.body;

    const ad = await Ad.findById(adId);
    if (ad) {
      if (ad.status === "unpaid" && status === "rejected") {
      } else if (ad.status === "paid" && status === "approved") {
        await capturePayment(ad.stripe_payment_id);
      } else if (ad.status === "paid" && status === "rejected") {
        await cancelPayment(ad.stripe_payment_id);
      } else if (ad.status === "approved" && status === "canceled") {
      } else if (status !== ad.status) {
        return res.status(400).json({ msg: "Bad Request" });
      }

      ad.catIds = catIds.map((id) => new mongoose.Types.ObjectId(id));
      ad.tags = tags;
      ad.status = status;
      ad.statusDescription = statusDescription;
      ad.is18 = is18;
      await Promise.all([
        ad.save(),
        ...tags?.map(
          (tag) =>
            Tag.findOneAndUpdate(
              { name: tag },
              { name: tag },
              { upsert: true }
            ) || []
        ),
      ]);

      return res.status(200).json({ _id: ad._id });
    }

    return res.status(404).json({ msg: "Not Found" });
  } catch (error) {
    console.log(JSON.stringify(error));
    return res.status(500).json("error");
  }
});

// publisher cancel ad
router.put("/cancel", auth, async (req: Request, res: Response) => {
  try {
    const email = res.locals.email;
    const user = await User.findOne({ email }).lean();

    const {
      adId,
    }: {
      adId: string;
    } = req.body;

    if (!user) {
      return res.status(400).json({ msg: "Bad Request" });
    }

    const ad = await Ad.findById(adId);

    if (!ad) {
      return res.status(400).json({ msg: "Bad Request" });
    }

    if (!user.adIds.some((id) => id.toString() === adId)) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    if (ad.status === "paid") {
      await cancelPayment(ad.stripe_payment_id);
      ad.status = "canceled";
      await ad.save();
    } else if (ad.status === "approved") {
      ad.status = "canceled";
      await ad.save();
    } else {
      return res.status(400).json({ msg: "Bad Request" });
    }

    return res.status(200).json({ _id: ad._id });
  } catch (error) {
    console.log(JSON.stringify(error));
    return res.status(500).json("error");
  }
});

// publisher delete ad
router.delete("/", auth, async (req: Request, res: Response) => {
  try {
    const email = res.locals.email;
    const user = await User.findOne({ email });

    const {
      adId,
    }: {
      adId: string;
    } = req.body;

    if (!user) {
      return res.status(400).json({ msg: "Bad Request" });
    }

    const ad = await Ad.findById(adId);

    if (!ad) {
      return res.status(400).json({ msg: "Bad Request" });
    }

    if (!user.adIds.some((id) => id.toString() === adId)) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    if (
      ad.status === "unpaid" ||
      ad.status === "rejected" ||
      ad.status === "canceled" ||
      (ad.status === "approved" && ad.endDate < new Date())
    ) {
      user.adIds = user.adIds.filter((id) => id.toString() !== adId);
      await user.save();
      await Ad.findByIdAndDelete(adId);
    } else {
      return res.status(400).json({ msg: "Bad Request" });
    }

    return res.status(200).json({ _id: ad._id });
  } catch (error) {
    console.log(JSON.stringify(error));
    return res.status(500).json("error");
  }
});

export default router;
