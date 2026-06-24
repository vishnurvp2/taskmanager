// The entry point of the application.
import app from "./app";
import { initializeDatabase } from "./config/db";
import dotenv from "dotenv";
dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});
const port = process.env.PORT || 3000;
async function start() {
  await initializeDatabase();
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}
start();
