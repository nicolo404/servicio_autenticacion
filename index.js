import express from "express";
import { dbMongoDB } from "./database/dbMongoDB.js"; // Assuming "database" subdirectory
import rutasUser from "./src/Routes/auth.routes.js"; // Assuming "Routes" subdirectory
import rutasLocation from "./src/Routes/location.router.js"; // Assuming "Routes" subdirectory
import { port } from "./src/config.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", rutasLocation);
app.use("/api", rutasUser);

// Connect to MongoDB before starting the server
dbMongoDB()
  .then(() => {
    console.log("Connected to MongoDB database");
    // Your Express app routes here (e.g., app.get("/", ...))
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    // Handle connection errors gracefully (e.g., exit the application)
    process.exit(1);
  });
