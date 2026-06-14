import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import app from "./app.js";

import connectDB from "./db/db.js";

const port = process.env.PORT || 8000;

// Initialize MongoDB connection and start the Express HTTP server
connectDB()
  .then(() => {
    // Start listening on the designated port once DB connection is resolved
    const server = app.listen(port, () => {
      console.log(`The server is listening at http://localhost:${port}`);
    });
    
    // Handle post-activation server errors gracefully
    server.on("error", (err) => {
      console.error(`Server error: ${err.message}`);
      process.exit(1);
    });
  })
  .catch((error) => {
    // Shutdown application if database connection fails initially
    console.error(
      `The MongoDB database connection failed. The error is : ${error.message}`
    );
    process.exit(1);
  });
