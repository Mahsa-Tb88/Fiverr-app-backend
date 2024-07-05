import Gig from "../models/gigSchema.js";
import Order from "../models/orderSchema.js";
export async function createOrder(req, res, next) {
  try {
    const gig = await Gig.findById(req.params.gigId);
    const newOrder = new Order({
      gigId: gig._id,
      title: gig.title,
      image: gig.cover,
      price: gig.price,
      buyerId: req.userId,
      sellerId: gig.userId,
      payment_intent: "Temporary",
    });
    const savedOrder = await newOrder.save();
    res.status(201).send("successful");
  } catch (err) {
    next(err);
  }
}
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
