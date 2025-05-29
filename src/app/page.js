import ChatInterface from '@/components/ChatInterface';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Context-Aware Gemini Chat</h1>
        <p className="text-gray-600 dark:text-gray-400">
          A multi-turn conversation with Google's Gemini AI that maintains context across messages
        </p>
      </header>
      
      <main className="flex-1 w-full max-w-4xl mx-auto">
        <ChatInterface />
      </main>
      
      <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Built with Next.js and Google Generative AI</p>
      </footer>
    </div>
  );
}
