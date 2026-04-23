
import Message from "../models/message.model.ts";

// 📥 GET CHAT BETWEEN TWO USERS
export const getMessages = async (req: any, res: any) => {
  try {
    const userId = req.user.id;
    const { receiverId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: receiverId },
        { sender: receiverId, receiver: userId },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};