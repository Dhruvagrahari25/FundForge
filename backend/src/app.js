import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

console.log("AuthRoutes imported:", authRoutes);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
});

// 404 logging
app.use((req, res, next) => {
    console.log(`404 Error: ${req.method} ${req.originalUrl}`);
    next();
});

export default app;
