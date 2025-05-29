'use client';

import { useState, useRef, useEffect } from 'react';
import { initGeminiClient, createChatSession, sendMessage } from '@/utils/gemini';

export default function ChatInterface() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [temperature, setTemperature] = useState(0.7);
    const [error, setError] = useState('');

    const chatSessionRef = useRef(null);
    const messagesEndRef = useRef(null);

    // Scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Initialize Gemini client and chat session on mount or temperature change
    useEffect(() => {
        setError('');
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        if (!apiKey) {
            setError('Gemini API key is missing. Please set NEXT_PUBLIC_GEMINI_API_KEY in your .env.local file.');
            return;
        }
        try {
            const client = initGeminiClient(apiKey);
            chatSessionRef.current = createChatSession(client, 'gemini-1.5-flash', temperature);
        } catch (err) {
            setError('Failed to initialize chat: ' + err.message);
        }
    }, [temperature]);

    // Handle sending a message
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || !chatSessionRef.current) return;

        const userMessage = input.trim();
        setInput('');
        setIsLoading(true);
        setError('');

        // Add user message to chat
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

        try {
            // Get response from Gemini
            const response = await sendMessage(chatSessionRef.current, userMessage);

            // Add AI response to chat
            setMessages(prev => [...prev, { role: 'model', content: response }]);
        } catch (err) {
            setError('Error: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full max-w-3xl mx-auto p-4">
            <div className="flex items-center gap-4 mb-4">
                <label htmlFor="temperature" className="block text-sm font-medium">
                    Temperature: {temperature}
                </label>
                <input
                    type="range"
                    id="temperature"
                    min="0"
                    max="1"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-40"
                />
                <span className="text-xs text-gray-500">{temperature <= 0.3 ? 'More Focused' : temperature >= 0.7 ? 'More Creative' : ''}</span>
            </div>
            <div className="flex-1 overflow-auto mb-4 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 my-8">
                        <p>Start a conversation with Gemini!</p>
                        <p className="text-sm mt-2">Your messages will appear here.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-100 dark:bg-blue-900 ml-auto' : 'bg-gray-100 dark:bg-gray-700 mr-auto'} max-w-[80%]`}
                            >
                                <div className="font-medium mb-1">
                                    {msg.role === 'user' ? 'You' : 'Gemini'}
                                </div>
                                <div className="whitespace-pre-wrap">{msg.content}</div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>
            <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading || !input.trim()}
                >
                    {isLoading ? 'Sending...' : 'Send'}
                </button>
            </form>
            {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md">
                    {error}
                </div>
            )}
        </div>
    );
}