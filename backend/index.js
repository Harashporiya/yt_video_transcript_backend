import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import youtubeRoutes from "./routes/youtube.routes.js"
import userRoutes from "./routes/user.routes.js"
dotenv.config();

const app = express();

app.use(cors({
  origin: ["http://localhost:3001", "http://localhost:3000"],
  methods: ["GET","POST","DELETE","PUT","PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/youtube", youtubeRoutes);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});