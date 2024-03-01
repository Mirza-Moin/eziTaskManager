import React, { useEffect,useMemo } from "react";
import {io} from 'socket.io-client'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks,deleteTask,createTask} from "../store";
import { Link,useNavigate } from "react-router-dom";


function TaskList({ role }) {
  // const socket = useMemo(() => io("http://localhost:4000"), []);

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { data, isLoading, error } = useSelector((state) => state.tasks);
 
  // console.log("task list rerender")

  // useEffect(() => {
  //  if(role === "User"){
    
  //   socket.on("connect", () => {
  //     console.log("socket id", socket.id);
  //   });

  //   socket.on("task-update", (data) => {
  //     console.log("Task is updated", data);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };}
 
  // }, []) 



  useEffect(() => {

    dispatch(fetchTasks());
  }, [dispatch]);

const onDeleteTask = async(id)=>{
    dispatch(deleteTask(id))
    }
     
  if (isLoading) {
    return <h1>Loading.....</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <section className="  ">
      <div className=" font-bold  bg-[rgba(58,143,62,0.37)] p-20 flex justify-evenly items-center">
        <h1 className="text-[32px]">List of All Tasks</h1>

        {role === "Admin" && (
          <button 
          onClick={()=>navigate('/admin/addnew')}
           className="bg-gray-400  font-[medium] px-7 py-3 border-[3px] border-blue-800 rounded-lg ">
            Add New
          </button>
        )}
         <button onClick={()=>{localStorage.removeItem('token')
        window.location = '/'}} className="bg-gray-400  font-[medium] px-7 py-3 border-[3px] border-blue-800 rounded-lg ">
            Log out
          </button>
      </div>
      <div className=" w-[100%] mx-auto bg-gray-100 py-10 rounded-lg">
        {/* task body start for here */}
        {data?.map((task,index) => {
            
          return (
            <div
              key={index}
              className="shadow-lg py-5 my-5 px-10 border flex justify-between items-center w-[70%] mx-auto"
            >
              {/* the task info */}
              <div
                className={`${
                  role === "User" ? "cursor-pointer" : "w-[60%] cursor-pointer"
                }`}
              >
                <h1 className="text-blue-800 text-[22px] font-bold">
                  {task?.title}
                </h1>
                <p className=" mt-3 truncate">{task?.description}</p>
                <h1 className="font-medium mt-5">
                  Status:{" "}
                  <span className="text-green-900 font-extrabold">
                    {" "}
                    {task?.status}
                  </span>
                </h1>
              </div>
              {/* the  task controlls */}
              {role !== "User" && (
                <div className="flex justify-center gap-5 items-center w-[30%] ">
                  {(role === "Admin" || role === "Manager") && (
                   <Link to={`${role === "Admin" ? "/admin/update":"/manager/update"}`} state={task}> <FaEdit className="text-blue-900 text-3xl cursor-pointer" /> </Link>
                  )}
                  {role === "Admin" && (
                    <MdDelete onClick={()=>onDeleteTask(task._id)} className="text-red-800 text-3xl cursor-pointer" />
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* task body end here */}
      </div>
    </section>
  );
}

export default TaskList;
