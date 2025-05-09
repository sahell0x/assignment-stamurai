import React from 'react';
import { Link } from 'react-router-dom';
import { useTask } from '../../context/TaskContext';
import { Calendar, Flag, ArrowRight } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../lib/api-client';
import { TASKS_STATUS_UPDATE_ROUTE } from '../../utils/constant';
import toast from 'react-hot-toast';
import { useRecoilValue } from 'recoil';
import userInfoAtom from '../../store/userInfoAtom';

interface TaskCardProps {
  task: any;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { updateTaskStatus } = useTask();
  const user = useRecoilValue(userInfoAtom);
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
  
  const statusColors = {
    todo: 'bg-gray-100 text-gray-800',
    inProgress: 'bg-blue-100 text-blue-800',
    review: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800'
  };
  
  const priorityColors = {
    low: 'text-gray-500',
    medium: 'text-orange-500',
    high: 'text-red-500'
  };
  
  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {

    try{
      const eventFor = (user.id === task.createdBy) ? task.assignedTo :task.createdBy;
      updateTaskStatus(task?.id,eventFor, e.target.value);
      const response = await apiClient.patch(TASKS_STATUS_UPDATE_ROUTE,{taskId:task.id,taskUpdatedStatus:{
        status:e.target.value
      }},{withCredentials:true});

      if(response.status === 200){

        toast.success("Status updated successfully");
      }
    }catch{
      toast.error("Status update failed");
    }
  };
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md ${
        isOverdue ? 'border-red-200' : 'border-gray-100'
      }`}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium text-gray-900 line-clamp-1">{task.title}</h3>
            <p className="text-sm text-gray-500 mt-1">Assigned to: {(task?.assignedTo === user?.id) ? "Me" : task.assignedToName }</p>
          </div>
          <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[task.status] || statusColors.todo}`}>
            {task.status}
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{task.description}</p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-500">
            <Calendar size={14} className="mr-1" />
            <span className={isOverdue ? 'text-red-500 font-medium' : ''}>
              {formatDate(task.dueDate)}
              {isOverdue && ' (Overdue)'}
            </span>
          </div>
          <div className={`flex items-center ${priorityColors[task.priority]}`}>
            <Flag size={14} className="mr-1" />
            <span className="capitalize">{task.priority}</span>
          </div>
        </div>
      </div>
      
      <div className="px-5 py-3 bg-gray-50 rounded-b-lg flex justify-between items-center border-t border-gray-100">
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="text-sm border border-gray-200 rounded-md py-1 px-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="todo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="review">Review</option>
          <option value="completed">Completed</option>
        </select>
        
        <Link 
          to={`/tasks/${task.id}`}
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          Details
          <ArrowRight size={14} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default TaskCard;