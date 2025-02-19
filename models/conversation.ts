import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  session_id: { type: String, required: true },
  user_message: { type: String, required: true },
  bot_response: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
