import multer from "multer";
import { NextFunction, Request, Response } from "express";
import sharp from "sharp";

const storage = multer.memoryStorage();

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (!file.mimetype.startsWith("image")) {
    cb(null, false);
  } else if (file.size > 10 * 1024 * 1024) {
    cb(null, false);
  } else {
    cb(null, true);
  }
};

const upload = multer({ storage: storage, fileFilter: multerFilter });
const uploadFiles = upload.array("images");

export const uploadImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  uploadFiles(req, res, async (err) => {
    if ((req.files as Express.Multer.File[]).length <= 0) {
      return res.send(`You must select at least 1 file.`);
    }
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.send("Too many files to upload.");
      }
    } else if (err) {
      return res.send(`Error when trying upload many files: ${err}`);
    }

    try {
      const resizedImages = await Promise.all(
        (req.files as Express.Multer.File[]).map(async (file) => {
          const buffer = await sharp(file.buffer)
            .resize(1080, 1920, { fit: "cover" })
            .jpeg({ quality: 80 })
            .toBuffer();
          return {
            ...file,
            buffer,
            mimetype: "image/jpeg",
          };
        })
      );
      (req.files as Express.Multer.File[]) = resizedImages;
      next();
    } catch (error) {
      return res.status(500).json({ error: "Error resizing images" });
    }
  });
};
