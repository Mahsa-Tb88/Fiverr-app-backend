import Conversation from "../models/conversationSchema.js";
import Message from "../models/messageModel.js";

export async function createMessage(req, res, next) {
  console.log("yes");
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.userId,
    desc: req.body.desc,
  });
  console.log(newMessage);
  try {
    const savedMessage = await newMessage.save();

    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
          lastMessage: req.body.desc,
        },
      },
      { new: true }
    );

    res.status(200).send(savedMessage);
  } catch (err) {
    next(err);
  }
}
export async function getMessages(req, res, next) {
  try {
    const messages = await Message.find({ conversationId: req.params.id });
    res.status(200).send(messages);
  } catch (err) {
    next(err);
  }
}
