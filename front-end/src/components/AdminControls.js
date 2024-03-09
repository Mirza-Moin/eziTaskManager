import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { deleteFeedback } from '../store';
import { updateFeedback } from '../store';

function AdminControls({taskId,userId}) {
  console.log("admin controls running")
  const dispatch = useDispatch()
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateFeedback({taskId,userId,status}))
    console.log(userId,taskId,status);
  };
  const handleDeleteFeedback = ()=>{
    dispatch(deleteFeedback({taskId,userId}))
    console.log(taskId, userId)
    
    }
  return (
    <>
     <div className="flex items-center gap-10">
                          <div>
                            <button
                              onClick={() => setShowForm(!showForm)}
                              className="text-indigo-600 hover:text-indigo-900 mr-2"
                            >
                              Change Status
                            </button>
                          </div>
                          <div>
                            <button onClick={()=>handleDeleteFeedback(taskId,userId)}  className="text-red-600 hover:text-red-900">
                              Delete Feedback
                            </button>
                          </div>
                        </div>
                        {showForm && (
                          <form onSubmit={(e) => handleSubmit(e)} className="border rounded-lg mt-2 px-3 pb-3">
                            <div className="flex flex-col gap-2 mt-2 mb-2">
                              <label className="inline-flex items-center">
                                <input
                                  // disabled = {status === "To Do"}
                                  
                                  type="radio"
                                  className="form-radio h-4 w-4 text-green-500"
                                  name="status"
                                  value="To Do"
                                  checked={status === "To Do"}
                                  onChange={(e) => setStatus(e.target.value)}
                                  
                                  />
                                <span className="ml-2 text-sm text-gray-700">
                                  To Do
                                </span>
                              </label>
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  className="form-radio h-4 w-4 text-yellow-500"
                                  name="status"
                                  value="In Progress"
                                  checked={status === "In Progress"}
                                  onChange={(e) => setStatus(e.target.value)}
                                />
                                <span className="ml-2 text-sm text-gray-700">
                                  In Progress
                                </span>
                              </label>
                              <label className="inline-flex items-center">
                                <input
                                  // disabled={status === "To Do"}
                                  type="radio"
                                  className="form-radio h-4 w-4 text-green-500"
                                  name="status"
                                  value="Completed"
                                  checked={status === "Completed"}
                                  onChange={(e) => setStatus(e.target.value)}
                                />
                                <span className="ml-2 text-sm text-gray-700">
                                  Completed
                                </span>
                              </label>
                            </div>
                            <button
                              type="submit"
                              className="bg-gray-400  font-[medium] px-7  border-[2px] border-blue-800 rounded-lg"
                            >
                              Send
                            </button>
                            <button
                              onClick={() => setShowForm(!showForm)}
                              className="bg-gray-400 ml-5  font-[medium] px-7  border-[2px] border-blue-800 rounded-lg"
                            >
                              Close
                            </button>
                          </form>
                        )}
    </>
  )
}

export default AdminControls
