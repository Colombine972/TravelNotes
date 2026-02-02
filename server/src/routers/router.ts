import express from "express";


const router = express.Router();

router.get("/", (_req, res) => {
  res.send("🔥 ROUTER OK 🔥");
});




export default router;

