import { logger, task, wait } from "@trigger.dev/sdk/v3";
import openai from "../openaiClient"; 
import { v4 as uuidv4 } from 'uuid';
import mongoose from "mongoose";
import Conversation from "../models/conversation";  
import connectDB from "../db"; 

connectDB();

export const chatTask = task({
  id: "chat-task",
  maxDuration: 300,
  run: async (payload: any, { ctx }) => {
    console.log(payload);
    
    let sessionId = payload.session_id; 
    if (!sessionId) {
      sessionId = uuidv4(); 
    }

    const userMessage = payload.user_message;
    if (!userMessage || userMessage.trim() === "") {
      const newConversation = new Conversation({
      session_id: sessionId,
      user_message: userMessage,
      bot_response: "You sent an empty message!",
      });

      await newConversation.save();
      return {
        user_message: userMessage,
        bot_response: "You sent an empty message!",
        session_id: sessionId,
      };
    }
    logger.log("User message:", { userMessage, sessionId, ctx });

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userMessage },
        ],
        max_tokens: 20, 
      });

      const botResponse = response.choices[0].message.content;

   
      const newConversation = new Conversation({
        session_id: sessionId,
        user_message: userMessage,
        bot_response: botResponse,
      });

      await newConversation.save();  

      logger.log("Conversation saved to MongoDB", { sessionId });

      return {
        message: botResponse,
        session_id: sessionId,  
      };
    } catch (error) {
      logger.error("Error with OpenAI API", error);

      const newConversation = new Conversation({
        session_id: sessionId,
        user_message: userMessage,
        bot_response:"Sorry, something went wrong. Please try again later.",
      });

      await newConversation.save();  
      return {
        message: "Sorry, something went wrong. Please try again later.",
        session_id: sessionId,  
      };
    }
  },
});
