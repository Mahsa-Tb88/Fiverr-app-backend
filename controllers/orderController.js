import Gig from "../models/gigSchema.js";
import Order from "../models/orderSchema.js";

import Stripe from "stripe";

export async function intent(req, res, next) {
  const gig = await Gig.findById(req.params.id);
  const stripe = new Stripe(process.env.STRIPE_KEY);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price * 100,
    currency: "cad",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    gigId: gig._id,
    title: gig.title,
    image: gig.cover,
    price: gig.price,
    buyerId: req.userId,
    sellerId: gig.userId,
    payment_intent: paymentIntent.id,
  });
  const savedOrder = await newOrder.save();

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
}

// export async function createOrder(req, res, next) {
//   try {
//     const gig = await Gig.findById(req.params.gigId);
//     const newOrder = new Order({
//       gigId: gig._id,
//       title: gig.title,
//       image: gig.cover,
//       price: gig.price,
//       buyerId: req.userId,
//       sellerId: gig.userId,
//       payment_intent: "Temporary",
//     });
//     const savedOrder = await newOrder.save();
//     res.status(201).send("successful");
//   } catch (err) {
//     next(err);
//   }
// }

export async function getOrders(req, res, next) {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });

    res.status(201).send(orders);
  } catch (err) {
    next(err);
  }
}

export async function confirm(req, res, next) {
  try {
    const order = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );
    res.status(201).send("Order has been confirmed.");
  } catch (err) {
    next(err);
  }
}
