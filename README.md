# Gemini Multi-Turn Chat

A context-aware chat application built with Next.js and Google's Gemini API. This application demonstrates how to create a multi-turn conversation with Gemini that maintains context across messages.


### Note -  As mentioned in the Assignment problem statement:
No GUI or written essay is required – focus on writing code. but for better Interative UI, I have added some UI components.

## Features

- Multi-turn conversation with Gemini AI that preserves context
- Adjustable temperature parameter to control response creativity
- Clean, responsive UI built with Tailwind CSS
- Dark mode support

## Prerequisites

- Node.js 18.17.0 or later
- A Google Gemini API key (get one from [Google AI Studio](https://makersuite.google.com/app/apikey))

## Setup and Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/gemini-multi-turn-chat.git
cd gemini-multi-turn-chat
```

2. Install dependencies:

```bash
npm install
```
3. Create a `.env.local` file in the root directory and add your Gemini API key:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Use

1. Enter your Gemini API key when prompted
2. Adjust the temperature slider if desired (higher values = more creative responses)
3. Start chatting with Gemini!
4. The conversation maintains context across messages, so Gemini will remember previous exchanges

## How It Works

This application uses the Google Generative AI JavaScript SDK to interact with the Gemini API. The key components are:

- `src/utils/gemini.js`: Contains utility functions for initializing the Gemini client, creating a chat session, and sending messages
- `src/components/ChatInterface.js`: The main chat interface component that handles user input and displays messages
- `src/app/page.js`: The main page that renders the chat interface

The application creates a chat session with Gemini and maintains the conversation history, allowing for contextual follow-up questions and responses.

## License

MIT
