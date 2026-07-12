import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { Send, Sparkles, User, RefreshCw, MessageSquare } from "lucide-react";

interface AICoachProps {
  onSuggestAction?: (amount: number) => void;
  employeeSalary?: number;
}

export default function AICoach({ onSuggestAction, employeeSalary = 18000 }: AICoachProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `🇿🇦 **Howzit!** I'm your **CZApay Financial Wellness Coach**. 

I can help you build an emergency fund, learn to budget using your remaining salary, understand South African payroll taxes, or explain how Earned Wage Access (EWA) is a 100% interest-free alternative to debt.

Here are some helpful things you can ask me:`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { label: "Is EWA a loan?", text: "Is Earned Wage Access a loan? How does CZApay differ from high-interest payday loans in South Africa?" },
    { label: "50/30/20 Budget Rule", text: `Can you create a South African 50/30/20 budget for my monthly salary of R${employeeSalary}?` },
    { label: "How tax is calculated", text: "How does CZApay or payroll tax (PAYE) work under SARS regulations for monthly earnings?" },
    { label: "Avoid Debt Spirals", text: "What are the danger signs of borrowing from mashonisas (payday lenders) and how can I avoid them?" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/advisor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          // Map to match API structure of previous turns
          history: messages.slice(-6).map(m => ({ role: m.role, text: m.content }))
        })
      });

      if (!response.ok) {
        throw new Error("Advisor API failed to respond");
      }

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: data.text || "Sorry, I had some trouble processing that question. Could you try asking again?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      const errMsg: ChatMessage = {
        role: "assistant",
        content: `😔 **Oops, I couldn't reach the advisor network.** 

But here is a friendly tip: Remember that CZApay is **never a debt product**. It only unlocks the cash you have already worked hard for, so you don't have to borrow from high-rate card lenders or overdrafts in times of emergency!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[520px] bg-white rounded-2xl border border-indigo-brand/10 shadow-card overflow-hidden">
      {/* Header */}
      <div className="bg-[#0B2545] p-4 text-white flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#00CFFF]/25 flex items-center justify-center border border-[#00CFFF]/30 text-[#00CFFF]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-display font-bold text-sm tracking-tight">Financial Wellness AI Coach</h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 bg-[#00CFFF] rounded-full dot-live-glow"></span>
              <span className="text-[10px] font-data text-[#00CFFF] tracking-wider uppercase">Active & Grounded</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setMessages([
              {
                role: "assistant",
                content: `🇿🇦 **Coach Reset!** Let's start fresh. I'm here to support your wealth journey. Ask me any financial or budgeting question!`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]);
          }}
          className="text-white/60 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-lg"
          title="Reset conversation"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex gap-3 max-w-[85%] ${
              msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-none text-xs font-bold ${
                msg.role === "user"
                  ? "bg-[#3151B9] text-white"
                  : "bg-[#0B2545] text-[#00CFFF]"
              }`}
            >
              {msg.role === "user" ? <User className="w-4 h-4" /> : "ZA"}
            </div>
            <div>
              <div
                className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#3151B9] text-white rounded-tr-none"
                    : "bg-white text-slate-800 border border-slate-200/70 rounded-tl-none shadow-sm shadow-indigo-900/5"
                }`}
              >
                {/* Simple line break and bold markdown renderer helper */}
                {msg.content.split("\n").map((line, i) => {
                  // Basic formatting for bolding (**text**)
                  let formattedLine = line;
                  const boldRegex = /\*\*(.*?)\*\*/g;
                  const parts = [];
                  let lastIndex = 0;
                  let match;

                  while ((match = boldRegex.exec(line)) !== null) {
                    if (match.index > lastIndex) {
                      parts.push(line.substring(lastIndex, match.index));
                    }
                    parts.push(<strong key={match.index} className="font-bold text-slate-900 dark:text-inherit">{match[1]}</strong>);
                    lastIndex = boldRegex.lastIndex;
                  }
                  
                  if (lastIndex < line.length) {
                    parts.push(line.substring(lastIndex));
                  }

                  return (
                    <p key={i} className={i > 0 ? "mt-2" : ""}>
                      {parts.length > 0 ? parts : line}
                    </p>
                  );
                })}

                {/* Show starter suggestions ONLY on first assistant bubble */}
                {index === 0 && (
                  <div className="mt-4 grid grid-cols-1 gap-2.5">
                    {quickPrompts.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(p.text)}
                        className="text-left text-xs bg-slate-50 border border-slate-200 hover:border-[#3151B9]/40 hover:bg-[#EAF4FF] p-2.5 rounded-xl transition-all font-medium text-slate-700 flex items-center gap-2 group"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-[#3151B9] flex-none" />
                        <span className="truncate group-hover:text-[#3151B9]">{p.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-400 font-data mt-1 block px-1 text-right">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 max-w-[85%] mr-auto">
            <div className="w-8 h-8 rounded-full bg-[#0B2545] text-[#00CFFF] flex items-center justify-center flex-none text-xs font-bold animate-pulse">
              ZA
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-100 rounded-tl-none shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(input);
        }}
        className="p-3 border-t border-slate-100 bg-white flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Coach about South African finances..."
          className="flex-1 px-4 py-2.5 text-sm border border-slate-200 focus:border-[#3151B9] focus:outline-none rounded-xl"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="bg-[#0B2545] hover:bg-[#1B3A63] text-[#00CFFF] disabled:opacity-40 p-2.5 rounded-xl transition-all flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
