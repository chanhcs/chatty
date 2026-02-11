import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { io } from "../socket/index.js";
import {
  emitNewMessage,
  updateConversationAfterCreateMessage,
} from "../utils/messageHelper.js";
import { v2 as cloudinary } from "cloudinary";

export const uploadChatImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "chatty/messages",
          resource_type: "image",
          transformation: [{ width: 800, height: 800, crop: "limit" }],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });
    return res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error("Upload chat image error", error);
    return res.status(500).json({ message: "Upload failed" });
  }
};

export const sendDirectMessage = async (req, res) => {
  try {
    const { recipientId, content, imgUrl, conversationId } = req.body;
    const senderId = req.user._id;

    let conversation;

    if (!content && !imgUrl) {
      return res.status(400).json({ message: "Missing content or image" });
    }

    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
    }

    if (!conversation) {
      conversation = await Conversation.create({
        type: "direct",
        participants: [
          { userId: senderId, joinedAt: new Date() },
          { userId: recipientId, joinedAt: new Date() },
        ],
        lastMessageAt: new Date(),
        unreadCounts: new Map(),
      });
    }

    const message = await Message.create({
      conversationId: conversation._id,
      senderId,
      content,
      imgUrl,
    });

    updateConversationAfterCreateMessage(conversation, message, senderId);
    await conversation.save();
    emitNewMessage(io, conversation, message)

    return res.status(201).json({ message });
  } catch (error) {
    console.error("An error occurred while sending a direct message", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const sendGroupMessage = async (req, res) => {
  try {
    const { conversationId, content, imgUrl } = req.body;
    const senderId = req.user._id;
    const conversation = req.conversation;

    if (!content && !imgUrl) {
      return res.status(400).json("Missing content or image");
    }

    const message = await Message.create({
      conversationId,
      senderId,
      content,
      imgUrl,
    });

    updateConversationAfterCreateMessage(conversation, message, senderId);
    await conversation.save();
    emitNewMessage(io, conversation, message)

    return res.status(201).json({ message });
  } catch (error) {
    console.error("An error occurred while sending a group message", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};