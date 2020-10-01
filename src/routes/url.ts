import express, {
  Application,
  Request,
  Response,
  NextFunction,
  Router,
} from "express";
import validUrl from "valid-url";
import shortid from "shortid";
import config from "config";
import { Schema } from "mongoose";

const router: Router = express.Router();

const Url = require("../models/Url");

// @route   POST Request /api/url/shorten
router.post("/shorten", async (req: Request, res: Response) =>
  shorter(req, res)
);

const shorter = async (req: Request, res: Response) => {
  const { longUrl } = req.body;
  const baseUrl: string = config.get("baseUrl");

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base url");
  }

  // Create url code
  const urlCode: string = shortid.generate();

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });

        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.error(err.message), res.status(500).json("Server Error");
    }
  } else {
    res.status(401).json("Invalid long Url");
  }
};

module.exports = router;
