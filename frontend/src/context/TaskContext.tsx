import React, { createContext, useContext, useState, useEffect } from 'react';

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
  tasks: Task[];
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
  const [tasks, setTasks] = useState<Task[]>([]);
  
  useEffect(() => {
      const sampleTasks: Task[] = [
        {
          id: '1',
          title: 'Create project plan',
          description: 'Develop a comprehensive project plan including timeline, resources, and deliverables.',
          dueDate: '2025-04-15',
          priority: 'high',
          status: 'inProgress',
          createdBy: '123',
          assignedTo: '123',
          assignedToName: 'Sahil'
        },
        {
          id: '2',
          title: 'Design user interface',
          description: 'Create wireframes and mockups for the application user interface.',
          dueDate: '2025-04-20',
          priority: 'medium',
          status: 'todo',
          createdBy: '456',
          assignedTo: '123',
          assignedToName: 'Sahil'
        },
        {
          id: '3',
          title: 'Implement authentication',
          description: 'Add user registration, login, and authentication functionality.',
          dueDate: '2025-04-10',
          priority: 'high',
          status: 'review',
          createdBy: '123',
          assignedTo: '2',
          assignedToName: 'Vishal'
        },
        {
          id: '4',
          title: 'Write documentation',
          description: 'Create user and developer documentation for the application.',
          dueDate: '2025-04-30',
          priority: 'low',
          status: 'todo',
          createdBy: '123',
          assignedTo: '3',
          assignedToName: 'Govind'
        },
        {
          id: '5',
          title: 'Test application',
          description: 'Perform thorough testing of all application features and fix any bugs.',
          dueDate: '2025-04-25',
          priority: 'medium',
          status: 'todo',
          createdBy: '123',
          assignedTo: '123',
          assignedToName: 'Sahil'
        }
      ];
      
      setTasks(sampleTasks);
      localStorage.setItem('tasks', JSON.stringify(sampleTasks));
    
  }, []);
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
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
        tasks,
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