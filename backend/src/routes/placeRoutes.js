import express from "express";
import { getPlaces, getPlaceById, seedPlaces } from "../controllers/placeController.js";

const router = express.Router();

router.get("/", getPlaces);
router.get("/:id", getPlaceById);
router.post("/seed", seedPlaces);

export default router;
