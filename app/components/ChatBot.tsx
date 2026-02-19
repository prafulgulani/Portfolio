'use client';
import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    streamProtocol: 'text', 
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 1. Launcher Button: Using 'bg' as text to contrast against the 'accent' circle */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-on-accent hover:bg-accent text-bg p-4 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer"
        >
          <MessageCircle size={25} />
        </button>
      )}

      {/* 2. Chat Window */}
      {isOpen && (
        <div className="bg-bg border border-accent/50 w-87.5 h-125 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header: accent/10 for a subtle tinted background */}
          <div className="bg-accent/10 p-4 border-b border-accent/50 flex justify-between items-center">
            <div className="flex items-center gap-2 text-accent">
              <Bot size={20} />
              <span className="font-bold text-sm tracking-wider">Praful's bot</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-text-dim hover:text-accent">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.length === 0 && (
              <div className="text-text-dim text-sm text-center mt-10">
                Ask me about Praful's LeetCode stats, skills, or education!
              </div>
            )}
            
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-accent text-bg shadow-md'
                    : 'bg-surface text-text-main shadow-sm'
                }`}>
                  <div className="max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {m.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-surface p-3 rounded-xl text-xs text-accent animate-pulse">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form 
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
            }} 
            className="p-2 flex gap-2 bg-bg"
          >
            <input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask anything..."
                /* Using 'surface' for the input box to make it pop against 'bg' */
                className="flex-1 bg-accent/10 border border-accent/50 rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:border-accent placeholder:text-text-dim"
            />
            <button 
                type="submit" 
                disabled={isLoading || !input}
                /* Button: on-accent background, bg text, turns accent on hover */
                className="bg-on-accent text-bg p-2 rounded-lg disabled:opacity-50 hover:bg-accent transition-colors cursor-pointer"
            >
                <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}