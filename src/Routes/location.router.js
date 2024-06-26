import { Router } from "express";
const router = Router();
import {
  getLocations,
  newLocation,
} from "../Controllers/LocationController.js";

router.get("/getLocations", getLocations);

router.post("/newLocation", newLocation);

export default router;
