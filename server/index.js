import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser"
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from './routes/users.js';
import popupRoutes from './routes/popups.js';
import siteRoutes from './routes/sites.js';

const app = express()
dotenv.config();

app.use(cors())
app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/popups', popupRoutes);
app.use('/sites', siteRoutes);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5001;
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: https://localhost:${PORT}`),
    ),
  )
  .catch((error) => console.log(`${error} did not connect`));
