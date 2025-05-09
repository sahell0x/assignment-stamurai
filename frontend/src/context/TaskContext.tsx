import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../lib/api-client';
import { GET_TASKS_ROUTE } from '../utils/constant';
import { useRecoilState } from 'recoil';
import tasksAtom from '../store/tasksAtom';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'inProgress' | 'review' | 'completed';
  createdBy: string;
  assignedTo: string;
  assignedToName?: string;
}

interface TaskContextType {
  createTask: (task: Task) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  updateTaskStatus: (id: string, status: string) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: React.ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useRecoilState<any>(tasksAtom);

  useEffect(()=>{
    console.log("tasks:",tasks);
  },[tasks]);
  
  useEffect(() => {
      
    (
     async ()=>{
        try{
          const response = await apiClient.get(GET_TASKS_ROUTE,{withCredentials:true});
          console.log(response);
          if(response.status === 200){
            setTasks([...response.data as Task[]]);
          }
        }catch{};
      }
    )();
    
  }, []);
  
  const createTask = (task: Task) => {
    setTasks(prevTasks => [...prevTasks, task]);
  };
  
  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };
  
  const updateTaskStatus = (id: string, status: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, status: status as Task['status'] } : task
      )
    );
  };
  
  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };
  
  return (
    <TaskContext.Provider
      value={{
        createTask,
        updateTask,
        updateTaskStatus,
        deleteTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};