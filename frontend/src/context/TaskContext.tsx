import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../lib/api-client';
import { GET_TASKS_ROUTE } from '../utils/constant';
import { useRecoilState, useRecoilValue } from 'recoil';
import tasksAtom from '../store/tasksAtom';
import userInfoAtom from '../store/userInfoAtom';
import socket from '../socket';

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
  updateTaskStatus: (id: string,eventFor:string, status: string) => void;
  deleteTask: (id: string,assignedTo:string) => void;
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
  const userInfo = useRecoilValue(userInfoAtom);

  useEffect(()=>{
  },[tasks]);
  
  useEffect(() => {
      
    (
     async ()=>{
        try{
          const response = await apiClient.get(GET_TASKS_ROUTE,{withCredentials:true});
          if(response.status === 200){
            setTasks([...response.data as Task[]]);
          }
        }catch{};
      }
    )();
    
  }, []);
  
  const createTask = (task: Task) => {
    setTasks(prevTasks => [...prevTasks, task]);
    if(task.assignedTo != userInfo.id){
      socket.emit("assigned",{task,createdByName:userInfo?.name});
    }
  };
  
  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
    if(updatedTask?.assignedTo != userInfo?.id){
      socket.emit("update-task",updatedTask);
    }
  };
  
  const updateTaskStatus = (id: string,eventFor:string,status: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, status: status as Task['status'] } : task
      )
    );
    socket.emit("status-update",{id,status,eventFor});
  };
  
  const deleteTask = (id: string,assignedTo:string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    socket.emit("delete-task",{id,assignedTo});
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