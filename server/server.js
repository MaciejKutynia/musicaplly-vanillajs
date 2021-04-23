import express from "express";
import cors from "cors";

import { connect } from "./config/db.js";
import router from "./routes/track.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cors());

app.use(router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

connect();
