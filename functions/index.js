const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "STRIPE_SECRET_KEY"
);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("hello wodddrld");
});

app.post("payments/create", async (req, response) => {
  console.log("dddddddddddddddddddddddd");
  const total = req.query.total;

  const payment = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  response.status(201).send({
    clientSecret: payment.client_secret,
  });
});

exports.api = functions.https.onRequest(app);
