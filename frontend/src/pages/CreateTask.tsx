import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import apiClient from '../lib/api-client';
import { GET_USER_ROUTE } from '../utils/constant';

const CreateTask = () => {
type Users = {
  id:string,
  name:string,
  email:string

}


  const navigate = useNavigate();
  const { createTask } = useTask();
  const { user } = useAuth();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [assignedTo, setAssignedTo] = useState('');
  const [users,setUsers] = useState<Users[]>([]);
  
  useEffect(()=>{
    (async ()=>{
      try{
        const response = await apiClient.get(GET_USER_ROUTE,{withCredentials:true});
        if(response.status === 200){
          setUsers([...response.data as Users[]]);
        }
      }catch(e){
      }
    })();
  },[]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !dueDate || !priority) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    try{
      const newTask = {
        title,
        description,
        dueDate,
        priority,
        status: 'todo',
        createdBy: user?.id,
        assignedTo: assignedTo || user?.id,
        assignedToName: assignedTo 
          ? users.find(u => u.id === assignedTo)?.name
          : user?.name
      };
      
      createTask(newTask);
      
     toast.success("Task created successfully");
      
      navigate('/tasks');
    }catch{

    }
  };
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={18} className="mr-1" />
        Back
      </button>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h1 className="text-2xl font-semibold mb-6">Create New Task</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter task title"
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter task description"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                Due Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority <span className="text-red-500">*</span>
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 mb-1">
              Assign To
            </label>
            <select
              id="assignedTo"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Assign to me</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/tasks')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;