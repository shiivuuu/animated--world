// ParulVerse 3D - AI Campus Assistant (UniGuide AI)
// Grounded natural language query engine that triggers real 3D campus actions

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  Navigation,
  Compass,
  Building,
  Bot,
  User,
  ArrowRight
} from 'lucide-react';
import { QUICK_PROMPTS, queryAssistant } from '../data/aiKnowledge.js';

export default function AIAssistantModal({
  isOpen,
  onClose,
  onSelectBuilding,
  onStartNavigation,
  onStartTour
}) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: "Namaste! I am ParulVerse AI, your official interactive campus guide. How can I assist your visit to Parul University today? Ask me about departments, hostels, hospital emergency, or where to find any facility.",
      action: null
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages, isTyping]);

  const handleSend = (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    // Add user message
    const userMsg = { id: `u-${Date.now()}`, sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate fast intelligent processing
    setTimeout(() => {
      const result = queryAssistant(query);
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: result.text,
        action: result.action
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);

      // Auto-trigger controlled app actions if resolved
      if (result.action) {
        if (result.action.type === 'SELECT_BUILDING' && onSelectBuilding) {
          onSelectBuilding(result.action.buildingId);
        } else if (result.action.type === 'NAVIGATE_TO' && onStartNavigation) {
          onStartNavigation(result.action.buildingId);
        } else if (result.action.type === 'START_TOUR' && onStartTour) {
          onStartTour(result.action.tourId);
        }
      }
    }, 450);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-end p-2 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#F7F5EF] w-full max-w-lg h-full max-h-[92vh] rounded-3xl shadow-2xl border border-gray-200/90 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Assistant Header */}
        <div className="p-4 bg-[#183D32] text-white flex items-center justify-between border-b border-[#83B7A1]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#E2B357] to-amber-200 flex items-center justify-center text-[#183D32] shadow-md">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base">UniGuide AI</h3>
                <span className="px-2 py-0.5 text-[9px] uppercase font-bold tracking-wider bg-[#83B7A1]/30 text-emerald-200 rounded-full">
                  Official Assistant
                </span>
              </div>
              <p className="text-[11px] text-gray-300">Grounded in verified Parul University data</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2. Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#F7F5EF]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 max-w-[88%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-[#183D32] text-white'
                    : 'bg-[#E2B357] text-[#183D32]'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>

              <div
                className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-[#183D32] text-white rounded-tr-none'
                    : 'bg-white text-[#262D2A] border border-gray-200/80 rounded-tl-none'
                }`}
              >
                <p>{msg.text}</p>

                {/* Interactive Action Chip attached to message */}
                {msg.action && (
                  <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center gap-2">
                    {msg.action.type === 'SELECT_BUILDING' && (
                      <button
                        onClick={() => {
                          onSelectBuilding(msg.action.buildingId);
                          onClose();
                        }}
                        className="flex items-center gap-1.5 px-3 py-1 bg-[#D9E9DF] text-[#183D32] hover:bg-[#83B7A1] text-xs font-bold rounded-lg transition-colors"
                      >
                        <Building className="w-3.5 h-3.5" />
                        <span>Focus on 3D Building</span>
                      </button>
                    )}
                    {msg.action.type === 'NAVIGATE_TO' && (
                      <button
                        onClick={() => {
                          onStartNavigation(msg.action.buildingId);
                          onClose();
                        }}
                        className="flex items-center gap-1.5 px-3 py-1 bg-[#183D32] text-white hover:bg-[#122D25] text-xs font-bold rounded-lg transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5 text-[#E2B357]" />
                        <span>Plot Walking Route</span>
                      </button>
                    )}
                    {msg.action.type === 'START_TOUR' && (
                      <button
                        onClick={() => {
                          onStartTour(msg.action.tourId);
                          onClose();
                        }}
                        className="flex items-center gap-1.5 px-3 py-1 bg-[#E2B357] text-[#183D32] text-xs font-bold rounded-lg transition-colors"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>Launch Guided Tour</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2 max-w-[80%] items-center text-xs text-gray-500 italic py-1">
              <span className="w-2 h-2 rounded-full bg-[#183D32] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#183D32] animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-[#183D32] animate-bounce [animation-delay:0.4s]" />
              <span className="ml-1">UniGuide is searching campus records...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 3. Quick Suggestions Chips */}
        <div className="p-3 bg-white border-t border-gray-200/70 overflow-x-auto flex items-center gap-1.5 scrollbar-none">
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 text-[11px] font-medium bg-[#EFECE3] hover:bg-[#D9E9DF] text-[#183D32] rounded-xl whitespace-nowrap transition-colors shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* 4. Chat Input Box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-white border-t border-gray-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about Parul University..."
            className="flex-1 text-xs sm:text-sm font-medium px-4 py-2.5 bg-gray-100 rounded-2xl outline-none text-[#262D2A] focus:ring-2 focus:ring-[#183D32]/20"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className={`p-2.5 rounded-2xl transition-all ${
              input.trim()
                ? 'bg-[#183D32] text-white shadow-md active:scale-95'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
