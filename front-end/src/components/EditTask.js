import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTask } from "../store/thunks/updateTask";



function Login() {
    const dispatch = useDispatch()
    const location = useLocation()
    const taskInfo = location.state
  
  const [task, setTask] = useState({
    id:taskInfo._id,
    title: taskInfo.title,
    description: taskInfo.description,
    status:taskInfo.status
  });
  console.log(task)
  const enabled = task.title.length > 10 && task.description.length > 15 && task.status.length > 4;
  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateTask(task))
    window.history.back();

  }
  return (
    <div>
      <section className="bg-gray-100 h-screen">
              <h1 className="text-green py-20 text-center text-2xl font-bold bg-[rgba(58,143,62,0.37)]">
                Edit and save changes to task
              </h1>
        <div className="sm:w-[60%] w-[100%] p-1 mx-auto ">
          <div className="w-[100%] px-5">
            <div className=" bg-lightBg py-10 px-7 rounded-md">
              <form autoComplete="off" onSubmit={onSubmit}>
                <div className="mt-7 text-black">
                  <div className="mt-1">
                    <input
                      value={task.title}
                      onChange={(e) =>
                        setTask({ ...task, title: e.target.value })
                      }
                      type="text"
                      name="title"
                      required
                      autoComplete="off"
                      placeholder="title"
                      className="w-full px-3 py-2 h-[50px] rounded-sm border-2 border-gray-400 focus:border focus:border-green focus:outline-none focus:text-black"
                    />
                  </div>
                </div>

                <div className="mt-7 text-black">
                  <div className="mt-1">
                    <textarea
                      value={task.description}
                      onChange={(e) =>
                        setTask({ ...task, description: e.target.value })
                      }
                      rows={4}
                      type="text"
                      name="description"
                      required
                      placeholder="description"
                      className="border-2 border-gray-400 w-full px-3 py-2 h-[50px] rounded-sm focus:border focus:border-green focus:outline-none focus:text-black "
                    />
                  </div>
                </div>

                <div className="mt-5 text-black">
                    <div className="mt-1">
                      <select
                        // value={formData.uniRole}
                        onChange={(e) =>
                          setTask({
                            ...task,
                            status: e.target.value,
                          })
                        }
                        className="appearance-none block w-full border-2 border-gray-400 h-[70px]  rounded py-3 px-4 mb-3 leading-tight focus:outline-none   focus:border  focus:placeholder:text-black focus:border-green"
                        required
                        autoComplete="off"
                      >
                        <option className="" value="Role*" disabled selected>
                          Status*
                        </option>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>

               

                <div className="mt-5">
                  <button
                    // onClick={onSubmit}

                    disabled={!enabled}
                    type="submit"
                    className={
                      enabled
                        ? "bg-[rgba(58,143,62,0.9)]  text-black w-full text-center font-bold text-sm py-4 rounded-md"
                        : "bg-[rgba(58,143,62,0.37)]  text-black w-full text-center  text-[12px] font-medium py-4 rounded-md"
                    }
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
