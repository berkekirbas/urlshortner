import express, {
  Application,
  Request,
  Response,
  NextFunction,
  Router,
} from "express";

const router: Router = express.Router();

const Url = require("../models/Url");

// @route   GET Request /:code

router.get("/:code", async (req: Request, res: Response) =>
  reDirector(req, res)
);

const reDirector = async (req: Request, res: Response) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("Url not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
};

module.exports = router;
