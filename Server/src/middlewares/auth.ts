import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  if (!JWT_SECRET) {
    return res.status(500).json({ msg: "No JWT Secret" });
  }

  // Verify token
  try {
    jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: "Token is not valid" });
      } else {
        if (typeof decoded === "string" || !decoded?.email) {
          return res.status(401).json({ msg: "Token is not valid" });
        }
        res.locals.email = decoded.email;
        next();
      }
    });
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
}

export default authMiddleware;
