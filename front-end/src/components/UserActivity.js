import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { usersStatus } from "../store";
import AdminControls from "./AdminControls";

function UserActivity({ taskId }) {
  
  const { users, feedbacks, isLoading, error } = useSelector(
    (state) => state.usersStatus
  );
  console.log("user activity running")
  const dispatch = useDispatch();
  const [showIndex, setShowIndex] = useState(null);
//  console.log(error)

  // if(isLoading){
  //   return <h1 className="w-[70%] mx-auto text-center">Loading....</h1>
  // }
  if (error) {
    return <h1 className="w-[70%] mx-auto text-center">Some error occur</h1>;
  }
  return (
    <>
      <div className="bg-gray-200   w-[70%] mx-auto grid grid-cols-3">
        <button
          onClick={() => {
            dispatch(usersStatus({ taskId, status: "In Progress" }));
            setShowIndex(0);
          }}
          className={`${
            showIndex === 0
              ? "text-black border-b-[3px] border-black font-medium py-5"
              : "text-gray-400 font-medium border-none py-5 hover:text-black"
          }`}
        >
          Users In Progress
        </button>
        <button
          onClick={() => {
            dispatch(usersStatus({ taskId, status: "Completed" }));
            setShowIndex(1);
          }}
          className={`${
            showIndex === 1
              ? "text-black border-b-[3px] border-black font-medium py-5"
              : "text-gray-400 font-medium border-none py-5 hover:text-black"
          }`}
        >
          Users Who Completed
        </button>
        <button
          onClick={() => {
            dispatch(usersStatus({ taskId, status: "Feedback" }));
            setShowIndex(2);
          }}
          className={`${
            showIndex === 2
              ? "text-black border-b-[3px] border-black font-medium py-5"
              : "text-gray-400 font-medium border-none py-5 hover:text-black"
          }`}
        >
          FeedBack From Users
        </button>
      </div>
      {/* table for users in progress */}
      {showIndex === 0 && (
        <div className=" w-[70%] mx-auto">
          <div
            onClick={() => setShowIndex(null)}
            className="text-center py-2 bg-red-500 cursor-pointer"
          >
            Close
          </div>
          <div className="mb-4 mt-2 px-10 flex justify-between items-center">
            <h2 className="text-lg font-semibold">User In Progress</h2>
            <span className="text-sm text-gray-500">
              Total Users: {users.length}
            </span>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Sr No.
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  User Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Task Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users
                .slice()
                .reverse()
                .map((user, index) => {
                  return (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user?.userName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user?.status}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
      {/* table for users completed*/}
      {showIndex === 1 && (
        <div className=" w-[70%] mx-auto">
          <div
            onClick={() => setShowIndex(null)}
            className="text-center py-2 bg-red-500 cursor-pointer"
          >
            Close
          </div>
          <div className="mb-4 mt-2 px-10 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Users Completed </h2>
            <span className="text-sm text-gray-500">
              Total Users: {users.length}
            </span>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Sr No.
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  User Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Task Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users
                .slice()
                .reverse()
                .map((user, index) => {
                  return (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user?.userName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user?.status}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
      {/* table for users feedback */}
      {showIndex === 2 && (
        <div className="w-[70%] mx-auto">
          <div
            onClick={() => setShowIndex(null)}
            className="text-center py-2 bg-red-500 cursor-pointer"
          >
            Close
          </div>
          <div className="mb-4 px-10 flex justify-between items-center mt-2">
            <h2 className="text-lg font-semibold">Users Feedbacks</h2>
            <span className="text-sm text-gray-500">
              Total Feedback: {feedbacks?.lenght}
            </span>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Sr No.
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Username
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Controls
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {feedbacks
                .slice()
                .reverse()
                .map((feedback, index) => {
                  return (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {feedback.userName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {feedback.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {feedback.status}
                      </td>
                      <td className="px-6 py-4 ">
                        <AdminControls taskId={taskId} userId={feedback?.user}/>
                        {/* <div className="flex items-center gap-10">
                          <div>
                            <button
                              onClick={() => setShowForm(!showForm)}
                              className="text-indigo-600 hover:text-indigo-900 mr-2"
                            >
                              Change Status
                            </button>
                          </div>
                          <div>
                            <button className="text-red-600 hover:text-red-900">
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
                        )} */}
                      </td>
                    </tr>
                  );
                })}

              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default UserActivity;
