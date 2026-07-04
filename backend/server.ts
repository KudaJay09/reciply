import dotenv from "dotenv";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./src/lib/auth";
import categoryRouter from "./src/routes/category";
import activitiesLogRouter from "./src/routes/activitiesLog";

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

// better-auth
app.all("/api/auth/*splat", toNodeHandler(auth));

// parsing
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/category", categoryRouter);
app.use("/api/activities-log", activitiesLogRouter);

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello from the backend!");
});

app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});

app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
