const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const cors = require("cors");
const { Client } = require("pg");

const app = express();
const port = 4000;

// PostgreSQL connection configuration
const pool = new Client({
  user: "postgres",
  host: "localhost",
  database: "database8",
  password: "root",
  port: 5432,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to handle signup
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Email already registered." });
    }

    await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
      [username, email, password]
    );

    res.status(200).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Route to handle login

// Connect to PostgreSQL database
pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err.stack));

// POST request to /checkout to store order in the database
app.post("/checkout", (req, res) => {
  // Destructure data from the request body
  const { name, phone, address, cardNumber, expiryMonth, expiryYear, cvv } =
    req.body;

  // Insert the order data into the PostgreSQL database
  const query = `
        INSERT INTO checkout (name, phone, address, card_number, expiry_month, expiry_year, cvv)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
    `;

  const values = [
    name,
    phone,
    address,
    cardNumber,
    expiryMonth,
    expiryYear,
    cvv,
  ];

  pool
    .query(query, values)
    .then((result) => {
      // Return success response with the inserted order ID
      const orderId = result.rows[0].id;
      res.status(200).json({ success: true, orderId: orderId });
    })
    .catch((err) => {
      console.error("Error inserting data:", err);
      res.status(500).json({
        success: false,
        error: "An error occurred while processing your order.",
      });
    });
});

// Start the Express server

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
