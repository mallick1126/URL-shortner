import express from "express";

import { Router } from "express";
import { createShortUrl } from "../controller/urlShortner.controller.js";
import { getOriginalUrl } from "../controller/urlShortner.controller.js";

const router = Router();

router.route("/short-url").post(createShortUrl);
router.route("/:shortId").get(getOriginalUrl);
router.route("/health").get((req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});

export default router;
