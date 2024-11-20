let express = require('express');
let cors = require('cors');

let app = express();
app.use(cors());
const port = 3000;

//server side values
let taxRate = 5; //5%
let discountRange = 10; //10%
let loyaltyRate = 2; //2 points per $1

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalCartPrice = newItemPrice + cartTotal;
  res.send(totalCartPrice.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  let discountRange = 10;
  let finalPrice;
  if (isMember) {
    let finalDiscount = (cartTotal * discountRange) / 100;
    finalPrice = cartTotal - finalDiscount;
  } else {
    finalPrice = cartTotal;
  }
  res.send(finalPrice.toString());
});

app.get('/calculate-Tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let tax = (cartTotal * taxRate) / 100;
  res.send(tax.toString());
});

function getEstimate(shippingMethod, distance) {
  let days;
  if (shippingMethod === 'Standard') {
    days = distance / 50;
  } else if (shippingMethod === 'express') {
    days = distance / 100;
  }
  return days.toString();
}

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(getEstimate(shippingMethod, distance));
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let ShippingCost = weight * distance * 0.1;
  res.send(ShippingCost.toString());
});

app.get('/loyality-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * 2;
  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
