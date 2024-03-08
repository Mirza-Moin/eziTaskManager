import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask, createTask } from "../store";
import { Link, useNavigate } from "react-router-dom";
import FeedBack from "./FeedBack";

function TaskList({ role }) {
  const [notification, setNotification] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const socket = useMemo(() => io("http://localhost:4000"), []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading, error } = useSelector((state) => state.tasks);

  console.log("task list rerender");

  useEffect(() => {
    if (role === "User") {
      socket.on("connect", () => {
        console.log("socket id", socket.id);
      });

      socket.on("task-updated", (data) => {
        console.log("Task is updated", data);
        dispatch(fetchTasks());
        setNotification(data);
        setShowNotification(!showNotification);
      });

      return () => {
        socket.disconnect();
      };
    }
    if (role === "Admin") {
      socket.on("feedback-added", (data) => {
        console.log("feedback is added", data);
      });
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const onDeleteTask = async (id) => {
    dispatch(deleteTask(id));
  };

  if (isLoading) {
    return <h1>Loading.....</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <section className="  ">
      {showNotification && (
        <div
          id="toast-notification"
          className="fixed bottom-5 right-5  w-full max-w-xs p-4 text-gray-900 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-300"
          role="alert"
        >
          <div className="flex items-center mb-3">
            <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
              New notification
            </span>
            <button
              onClick={() => setShowNotification(!showNotification)}
              type="button"
              className="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              data-dismiss-target="#toast-notification"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center">
            <div className="ms-3 text-sm font-normal">
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {notification?.title}
              </div>
              <div className="text-sm font-normal truncate">
                {notification?.description}
              </div>
              <span className="text-xs font-medium text-blue-600 dark:text-blue-500">
                a few seconds ago
              </span>
            </div>
          </div>
        </div>
      )}

      <div className=" font-bold  bg-[rgba(58,143,62,0.37)] p-20 flex justify-evenly items-center">
        <h1 className="text-[32px]">List of All Tasks</h1>

        {role === "Admin" && (
          <button
            onClick={() => navigate("/admin/addnew")}
            className="bg-gray-400  font-[medium] px-7 py-3 border-[3px] border-blue-800 rounded-lg "
          >
            Add New
          </button>
        )}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location = "/";
          }}
          className="bg-gray-400  font-[medium] px-7 py-3 border-[3px] border-blue-800 rounded-lg "
        >
          Log out
        </button>
      </div>
      <div className=" w-[100%] mx-auto bg-gray-100 py-10 rounded-lg">
        {/* task body start for here */}
        {data
          ?.slice()
          .reverse()
          .map((task, index) => {
            return (
              <div
                key={index}
                className="shadow-lg py-5 my-5 px-10 border flex justify-between items-center w-[70%] mx-auto"
              >
                {/* the task info */}
                <div
                  className={`${
                    role === "User"
                      ? "cursor-pointer"
                      : "w-[60%] cursor-pointer"
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
                {role !== "User" ? (
                  <div className="flex justify-center gap-5 items-center w-[30%] ">
                    {(role === "Admin" || role === "Manager") && (
                      <Link
                        to={`${
                          role === "Admin" ? "/admin/update" : "/manager/update"
                        }`}
                        state={task}
                      >
                        {" "}
                        <FaEdit className="text-blue-900 text-3xl cursor-pointer" />{" "}
                      </Link>
                    )}
                    {role === "Admin" && (
                      <MdDelete
                        onClick={() => onDeleteTask(task._id)}
                        className="text-red-800 text-3xl cursor-pointer"
                      />
                    )}
                  </div>
                ) : (
                  //  <div className="">
                  //   <h1 className="text-lg font-medium">Any Feedback to user</h1>
                  //   <div className=" mt-1 mr-10 text-black">
                  //       <textarea
                  //         value={feedback.description}
                  //         onChange={(e) =>
                  //           setFeedBack({ description: e.target.value })
                  //         }
                  //         rows={4}
                  //         type="text"
                  //         name="description"
                  //         required
                  //         placeholder="description"
                  //         className="border-2 border-gray-500 w-[400px] px-3 py-2 h-[50px] rounded-sm focus:border focus:border-green focus:outline-none focus:text-black "
                  //       />
                  //     </div>
                  //     </div>
                  <FeedBack taskId={task?._id} status={task?.status} />
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
