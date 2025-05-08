import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTask } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";
import {
  Calendar,
  Flag,
  Clock,
  User,
  ArrowLeft,
  Trash2,
  Edit,
  Save,
  X,
} from "lucide-react";
import { formatDate } from "../utils/dateUtils";
import toast from "react-hot-toast";
import apiClient from "../lib/api-client";
import { TASKS_ROUTE } from "../utils/constant";

const TaskDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks, updateTask, deleteTask } = useTask();
  const { user, users } = useAuth();

  const [task, setTask] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<any>({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const foundTask = tasks.find((t) => t.id === id);
    if (foundTask) {
      setTask(foundTask);
      setEditedTask({ ...foundTask });
    } else {
      navigate("/tasks");
      toast.error("Task not found");
    }
  }, [id, tasks, navigate]);

  if (!task) {
    return <div className="p-6">Loading...</div>;
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({
      ...prev,
      [name]: value,
      assignedToName:
        name === "assignedTo"
          ? users?.find((u) => u.id === value)?.name || value
          : prev.assignedToName,
    }));
  };

  const handleSaveEdit = async() => {
      try{
        if (
          !editedTask.title ||
          !editedTask.description ||
          !editedTask.dueDate ||
          !editedTask.priority
        ) {
          toast.error("Please fill in all required fields");
          return;
        }


        const response = await apiClient.patch(TASKS_ROUTE,{taskId:task.id,payload:editedTask},{withCredentials:true});

        if(response.status === 200){
          updateTask(task.id, editedTask);
          setTask(editedTask);
          setIsEditing(false);
      
          toast.success("Task updated successfully");
          return;
        }
    
        throw new Error("somthing wents wrong");
      }catch{
        toast.error("Cant save changes");
      }
  };

  const handleDelete = async () => {
    try {
      const response = await apiClient.delete(`${TASKS_ROUTE}?taskId=${task.id}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        deleteTask(task.id);
        navigate("/tasks");

        toast.success("Task deleted successfully");
      }
    } catch {
      toast.error("Cant delete task");
    }
  };

  const statusColors = {
    todo: "bg-gray-100 text-gray-800",
    inProgress: "bg-blue-100 text-blue-800",
    review: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
  };

  const priorityColors = {
    low: "text-gray-500",
    medium: "text-orange-500",
    high: "text-red-500",
  };

  const renderReadOnlyView = () => (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">{task.title}</h1>
        
       
         {
          (task?.createdBy === user?.id) ? 
          <div className="flex space-x-2">
          <button
          onClick={() => setIsEditing(true)}
          className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100"
          title="Edit Task"
        >
          <Edit size={18} />
        </button>

          <button
          onClick={() => setShowDeleteConfirm(true)}
          className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-gray-100"
          title="Delete Task"
        >
          <Trash2 size={18} />
        </button> 
        </div>: ""
         }
        
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex items-center text-gray-600">
          <Calendar size={16} className="mr-2" />
          <span>Due {formatDate(task.dueDate)}</span>
        </div>
        <div className={`flex items-center ${priorityColors[task.priority]}`}>
          <Flag size={16} className="mr-2" />
          <span className="capitalize">{task.priority} Priority</span>
        </div>
        <div className="flex items-center text-gray-600">
          <User size={16} className="mr-2" />
          <span>Assigned to {(task?.assignedTo === user?.id) ? "Me" : task.assignedToName }</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock size={16} className="mr-2" />
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
              statusColors[task.status]
            }`}
          >
            {task.status === "todo"
              ? "To Do"
              : task.status === "inProgress"
              ? "In Progress"
              : task.status === "review"
              ? "Review"
              : "Completed"}
          </span>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-2">Description</h2>
        <p className="text-gray-700 whitespace-pre-line">{task.description}</p>
      </div>
    </div>
  );

  const renderEditView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Edit Task</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setIsEditing(false);
              setEditedTask({ ...task });
            }}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
            title="Cancel"
          >
            <X size={18} />
          </button>
          <button
            onClick={handleSaveEdit}
            className="p-2 text-gray-600 hover:text-green-600 rounded-full hover:bg-gray-100"
            title="Save"
          >
            <Save size={18} />
          </button>
        </div>
      </div>

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={editedTask.title}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={editedTask.description}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Due Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={editedTask.dueDate}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Priority <span className="text-red-500">*</span>
          </label>
          <select
            id="priority"
            name="priority"
            value={editedTask.priority}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Status <span className="text-red-500">*</span>
          </label>
          <select
            id="status"
            name="status"
            value={editedTask.status}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="review">Review</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="assignedTo"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Assign To
          </label>
          <select
            id="assignedTo"
            name="assignedTo"
            value={editedTask.assignedTo}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={user?.id}>Assign to me</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate("/tasks")}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={18} className="mr-1" />
        Back to Tasks
      </button>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        {isEditing ? renderEditView() : renderReadOnlyView()}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Delete Task</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this task? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
