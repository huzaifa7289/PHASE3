"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TaskList from "@/components/TaskList";
import ChatAssistant from "@/components/ChatAssistant";

export default function TaskPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"tasks" | "chat">("chat");

  const handleSignOut = () => {
    router.push("/");
  };

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-700 px-6 py-4 flex justify-between items-center">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab("tasks")}
            className={`flex items-center gap-2 ${
              activeTab === "tasks" ? "text-white" : "text-gray-500"
            }`}
          >
            📋 Tasks
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex items-center gap-2 ${
              activeTab === "chat" ? "text-white" : "text-gray-500"
            }`}
          >
            💬 Chat Assistant
          </button>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm">subhankaladi898@gmail.com</span>
          <button
            onClick={handleSignOut}
            className="text-sm text-red-500 hover:text-red-400"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-hidden">
        {activeTab === "tasks" ? <TaskList /> : <ChatAssistant />}
      </main>
    </div>
  );
}