"use client";

import React, { useState } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  createdAt: string;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Build chat interface",
      description: "Create a chat assistant component",
      status: "completed",
      createdAt: "2025-02-05",
    },
    {
      id: "2",
      title: "Add task management",
      description: "Implement task CRUD operations",
      status: "in-progress",
      createdAt: "2025-02-05",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending" as const,
  });

  const statusColors = {
    pending: "bg-gray-600",
    "in-progress": "bg-yellow-600",
    completed: "bg-green-600",
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      status: formData.status,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setTasks((prev) => [newTask, ...prev]);
    setFormData({ title: "", description: "", status: "pending" });
    setShowForm(false);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleUpdateStatus = (id: string, newStatus: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Tasks</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {showForm ? "Cancel" : "+ Add Task"}
          </button>
        </div>

        {/* Add Task Form */}
        {showForm && (
          <form
            onSubmit={handleAddTask}
            className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-6"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter task title"
                className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter task description"
                className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-blue-500 h-20 resize-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as Task["status"],
                  })
                }
                className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Create Task
            </button>
          </form>
        )}

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <p className="text-gray-500">
              No tasks yet. Create one manually or ask the AI!
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-800 p-4 rounded-lg border border-gray-700"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-white">{task.title}</h3>
                  <div className="flex gap-2">
                    <select
                      value={task.status}
                      onChange={(e) =>
                        handleUpdateStatus(
                          task.id,
                          e.target.value as Task["status"]
                        )
                      }
                      className="text-xs px-2 py-1 rounded bg-gray-700 text-white border border-gray-600"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-xs px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-2">{task.description}</p>
                <p className="text-gray-500 text-xs">{task.createdAt}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}