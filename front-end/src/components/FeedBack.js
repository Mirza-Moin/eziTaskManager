import React, { useState } from "react";
import {  useDispatch } from "react-redux";
import { addFeedback } from "../store";

function FeedBack({taskId,status}) {
  const dispatch = useDispatch()
  const [feedback, setFeedBack] = useState({
    taskId:taskId,
    description: "",
    status:""
  });
  const [showForm, setShowForm] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addFeedback(feedback))
    setShowForm(!showForm);
    setFeedBack({
      userFeedback:"",
      status:""
    })
  };


  return (
    <div className="">
      {!showForm && (
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gray-400  font-[medium] px-7 py-3 border-[3px] border-blue-800 rounded-lg"
        >
          Send FeedBack
        </button>
      )}
      {showForm && (
        <div>
          <h1 className="text-lg font-medium">Any Feedback to user</h1>
          <form onSubmit={(e)=>handleSubmit(e)}>
            <div className=" mt-1 mr-10 text-black">
              <textarea
                value={feedback.description}
                onChange={(e) => setFeedBack({...feedback, description: e.target.value })}
                rows={4}
                type="text"
                name="description"
                required
                placeholder="description"
                className="border-2 border-gray-500 w-[400px] px-3 py-2 h-[50px] rounded-sm focus:border focus:border-green focus:outline-none focus:text-black "
              />
            </div>
            <div className="space-x-5 mt-2 mb-2">
              {/* <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-blue-500"
                  name="status"
                  value='To Do'
                  checked = {feedback.status === 'To Do'}
                onChange={(e) => setFeedBack({...feedback, status: e.target.value })}

                />
                <span className="ml-2 text-gray-700">Todo</span>
              </label> */}
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-yellow-500"
                  name="status"
                  value='In Progress'
                  checked = {feedback.status === 'In Progress'}
                onChange={(e) => setFeedBack({...feedback, status: e.target.value })}

                />
                <span className="ml-2 text-gray-700">In Progress</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  disabled = {status === "To Do"}
                  type="radio"
                  className="form-radio h-5 w-5 text-green-500"
                  name="status"
                  value='Completed'
                  checked = {feedback.status === 'Completed'}
                  onChange={(e) => setFeedBack({...feedback, status: e.target.value })}

                />
                <span className="ml-2 text-gray-700">Completed</span>
              </label>
            </div>
            <button
              type="submit"
              className="bg-gray-400  font-[medium] px-7  border-[2px] border-blue-800 rounded-lg"
            >
              Send
            </button>
            <button
              onClick={()=>setShowForm(!showForm)}
              className="bg-gray-400 ml-5  font-[medium] px-7  border-[2px] border-blue-800 rounded-lg"
            >
              Close
            </button>

          </form>
        </div>
      )}
    </div>
  );
}

export default FeedBack;
