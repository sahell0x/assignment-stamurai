import { useEffect } from "react";
import socket from "../socket";
import { useRecoilState, useRecoilValue } from "recoil";
import userInfoAtom from "../store/userInfoAtom";
import tasksAtom from "../store/tasksAtom";



const useSocketSetup = () => {

  const userInfo = useRecoilValue(userInfoAtom)
  const [tasks,setTasks] = useRecoilState(tasksAtom);

  useEffect(() => {
    if (userInfo) {

      const handleAssigned = (task:any)=>{
        if(task){
          setTasks(prevTasks => [...prevTasks, task]);
        }
      }

      const handleUpdateTask = (updatedTask:any)=>{
        const id = updatedTask.id;
        if(updatedTask){
          setTasks(prevTasks => 
            prevTasks.map(task => 
              task.id === id ? { ...task, ...updatedTask } : task
            )
          );
        }
      }

      const handleStatusUpdate =(data:any)=>{
        if(data){
          const id = data.id;
        const status = data.status;
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task.id === id ? { ...task, status } : task
          )
        );
        }
      }

      const handleDeleteTask = (data:any)=>{
        const id = data?.id;

        if(id){
          setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        }
      }

      socket.on("assigned",handleAssigned);
      
      socket.on("update-task",handleUpdateTask);

      socket.on("status-update",handleStatusUpdate);

      socket.on("delete-task",handleDeleteTask);

      socket.connect();

      return () => {

        socket.off("assigned",handleAssigned);

        socket.off("update-task",handleUpdateTask);

        socket.off("status-update",handleStatusUpdate);

        socket.off("delete-task",handleDeleteTask);

        socket.disconnect();
      };
    }
  }, [userInfo]);
};

export default useSocketSetup;
