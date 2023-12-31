// sk_test_51NkXQqEoL5f3nSze6nJmK4rm3OxlgVY3NeRZRRIAdSO4Xp8NBJqpc1ggbBLRqjmGbC3HdDQgDUHAgSGZBcemSYHD00BXWjDM2E
// Anthem = price_1OHAXAEoL5f3nSze3rB78Pcg
// Lucid = price_1OHAYwEoL5f3nSzeKSYIquHW
// Soulect = price_1OHAZnEoL5f3nSzeCYdP95Nu

const express = require("express");
var cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51NkXQqEoL5f3nSze6nJmK4rm3OxlgVY3NeRZRRIAdSO4Xp8NBJqpc1ggbBLRqjmGbC3HdDQgDUHAgSGZBcemSYHD00BXWjDM2E"
);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
  console.log(req.body);
  // should this be req.body.products?
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );

  // window.localStorage.clear();
});

app.listen(4000, () => console.log("Listening on port 4000!"));
