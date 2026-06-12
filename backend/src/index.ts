// The entry point of the application.
import app from "./app";
process.loadEnvFile(".env");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
