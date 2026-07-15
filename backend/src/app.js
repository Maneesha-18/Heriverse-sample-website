import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import placeRoutes from "./routes/placeRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// basic API root check
app.get("/", (req, res) => {
    res.send("Welcome to HeriVerse Backend API");
});

// route registration
app.use("/api/auth", authRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/profile", profileRoutes);

export default app;
