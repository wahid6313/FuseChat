// import Conversation from "../models/conversation.model.js";
// import Message from "../models/message.model.js";

// export const sendMessage = async (req, res) => {
//   try {
//     const senderId = req.id;
//     const receiverId = req.params.id;
//     const { message } = req.body;

//     let conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     });

//     //establish if conversation if not started yet---
//     if (!conversation) {
//       conversation = await Conversation.create({
//         participants: [senderId, receiverId],
//       });
//     }
//     const newMessage = await Message.create({
//       senderId,
//       receiverId,
//       message,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
