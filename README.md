🤖 AI-Powered Chatbot

This is an AI-powered chatbot application built using Trigger.dev, MongoDB, OpenAI, and Retool. The chatbot is designed to facilitate conversations, store chat history, and enhance user experience with automation and AI-generated responses.
Retool contains 2 chats, the first one is made from scratch and the other one is made using the retool "chat" component

🚀 Features

Real-time AI Conversations - Uses OpenAI's API to generate intelligent responses.

Persistent Chat Storage - Saves user interactions in MongoDB for future reference.

Automated Task Execution - Utilizes Trigger.dev to streamline workflow automation.

Retool UI Integration - Provides a user-friendly front-end for interacting with the chatbot.

🛠️ Tech Stack

Backend: Trigger.dev (for workflow automation)

Database: MongoDB (for storing conversations)

AI Model: OpenAI GPT (for generating responses)

Frontend: Retool (for UI interaction)

📦 Installation & Setup

1. Clone the Repository

git clone https://github.com/your-username/your-repo.git
cd your-repo

2. Install Dependencies

npm install

3. Configure Environment Variables

Create a .env file and add your API keys:

OPENAI_API_KEY=your-openai-key
MONGODB_URI=your-mongodb-connection-string
TRIGGER_API_KEY=your-trigger-dev-key

4. Start the Server

npx trigger.dev@latest  dev

⚡ Usage

Open the Retool app and interact with the chatbot.
When a user sends a message, Retool triggers the workflow:
Retool → Trigger.dev: Retool sends the user’s message to Trigger.dev via query2.
Trigger.dev → OpenAI & MongoDB: Trigger.dev forwards the message to OpenAI, receives the AI response, and stores both the user message and the AI response in MongoDB.
MongoDB → Retool: Retool fetches the updated conversation history using query1.
UI Update: The response is displayed in the Retool chat interface.
Retool Workflow Breakdown:

query3: Orchestrates the workflow by calling query2 (sends the message) and query1 (retrieves conversation history).
query2: Sends the message to the Trigger.dev trigger.
query1: Fetches the conversation history from MongoDB.
When the "Send Message" button is pressed in Retool, query3 runs to send the message, fetch updated conversation data, and update the UI.

🔧 API Endpoints

Send a Message from Retool

POST [/chat](https://api.trigger.dev/api/v1/tasks/<trigger_id>/trigger)

Request Body:

{
  "payload":{
    "user_message": {{textInput1.value}},
    "session_id": "caeeabe7-929a-4fa3-b6e5-851ab78ce0d9",
  }
}

Retrieve Conversation History using the retoool build in mongodb api tool

📝 To-Do/Problems

Optimize communication between MongoDB and OpenAI to generate faster responses
Implement chat sessions to start a new chat when someone new opens the chat page


