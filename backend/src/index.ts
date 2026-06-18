// The entry point of the application.
import app from "./app";
import { initializeDatabase } from "./config/db";
require("dotenv").config();
const port = process.env.PORT || 3000;
async function start() {
  await initializeDatabase();
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

start();
