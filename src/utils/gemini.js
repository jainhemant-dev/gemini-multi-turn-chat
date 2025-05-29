import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client
export const initGeminiClient = (apiKey) => {
    if (!apiKey) {
        throw new Error('API key is required to initialize Gemini client');
    }

    return new GoogleGenerativeAI(apiKey);
};

// Create a chat session with the specified model
export const createChatSession = (client, modelName = 'gemini-1.5-flash', temperature = 0.7) => {
    const model = client.getGenerativeModel({
        model: modelName,
        generationConfig: {
            temperature,
        },
    });

    return model.startChat();
};

// Send a message to the chat session and get a response
export const sendMessage = async (chatSession, message) => {
    try {
        const result = await chatSession.sendMessage(message);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error sending message to Gemini:', error);
        throw error;
    }
};