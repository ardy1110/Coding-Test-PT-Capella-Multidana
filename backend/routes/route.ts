import { Router } from "express";
import { createPengajuan } from "../controllers/formController";
import {
  getAllPengajuan,
  getPengajuanById,
  updateStatusPengajuan,
} from "../controllers/tabelController";

const router = Router();

router.post("/", createPengajuan);
router.get("/", getAllPengajuan);
router.get("/:id", getPengajuanById);
router.patch("/:id/status", updateStatusPengajuan);
export default router;
