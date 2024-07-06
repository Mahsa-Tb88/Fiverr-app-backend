import Conversation from "../models/conversationSchema.js";

export async function createConversation(req, res, next) {
  const newConversation = new Conversation({
    id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
    sellerId: req.isSeller ? req.userId : req.body.to,
    buyerId: req.isSeller ? req.body.to : req.userId,
    readBySeller: req.isSeller,
    readByBuyer: !req.isSeller,
  });
  try {
    const savedConversation = await newConversation.save();

    res.status(201).send(savedConversation);
  } catch (err) {
    next(err);
  }
}
export async function updateConversation(req, res, next) {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      { $set: { readByBuyer: true, readBySeller: true } },
      { new: true }
    );
    res.status(200).send(updatedConversation);
  } catch (err) {
    next(err);
  }
}
export async function getConversation(req, res, next) {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });
    res.status(201).send(conversation);
  } catch (err) {
    next(err);
  }
}
export async function getConversations(req, res, next) {
  try {
    const conversations = await Conversation.find(
      req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    );
    res.status(201).send(conversations);
  } catch (err) {
    next(err);
  }
}
