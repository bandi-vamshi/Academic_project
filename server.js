const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const cors = require("cors");
const { Client } = require("pg");

const app = express();
const port = 4000;

const pool = new Client({
  user: "postgres",
  host: "localhost",
  database: "database8",
  password: "root",
  port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

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

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (user.rows.length > 0) {
      res.status(200).json({
        message: "Login successful!",
        redirectTo: "./htmlfile.html",
      });
    } else {
      res.status(400).json({ message: "Invalid email or password." });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error." });
  }
});

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err.stack));

app.post("/checkout", (req, res) => {
  const { name, phone, address, cardNumber, expiryMonth, expiryYear, cvv } =
    req.body;

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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
