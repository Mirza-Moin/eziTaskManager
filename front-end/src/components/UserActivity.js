import React, { useState } from "react";

function UserActivity() {
    const [showIndex, setShowIndex] =  useState(null)
  return (
    <>
      <div className="bg-gray-200   w-[70%] mx-auto grid grid-cols-3">
        <button onClick={()=>setShowIndex(0)} className={`${showIndex === 0 ? "text-black border-b-[3px] border-black font-medium py-5":"text-gray-400 font-medium border-none py-5 hover:text-black"}`}>
          Users In Progress
        </button>
        <button onClick={()=>setShowIndex(1)} className={`${showIndex === 1 ? "text-black border-b-[3px] border-black font-medium py-5":"text-gray-400 font-medium border-none py-5 hover:text-black"}`}>Users Who Completed</button>
        <button onClick={()=>setShowIndex(2)} className={`${showIndex === 2 ? "text-black border-b-[3px] border-black font-medium py-5":"text-gray-400 font-medium border-none py-5 hover:text-black"}`}>FeedBack From Users</button>
      </div>
      {/* table for users in progress */}
     {showIndex === 0 && <div className=" w-[70%] mx-auto">
        <div onClick={()=>setShowIndex(null)} className="text-center py-2 bg-red-500 cursor-pointer">Close</div>
        <div className="mb-4 mt-2 px-10 flex justify-between items-center">
          <h2 className="text-lg font-semibold">User In Progress</h2>
          <span className="text-sm text-gray-500">Total Users: 10</span>
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
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">1</td>
              <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
              <td className="px-6 py-4 whitespace-nowrap">Completed</td>
            </tr>
          </tbody>
        </table>
      </div>}
      {/* table for users completed*/}
      {showIndex === 1 && <div className=" w-[70%] mx-auto">
      <div onClick={()=>setShowIndex(null)} className="text-center py-2 bg-red-500 cursor-pointer">Close</div>
        <div className="mb-4 mt-2 px-10 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Users Completed </h2>
          <span className="text-sm text-gray-500">Total Users: 10</span>
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
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">1</td>
              <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
              <td className="px-6 py-4 whitespace-nowrap">Completed</td>
            </tr>
          </tbody>
        </table>
      </div>}
      {/* table for users feedback */}
     {showIndex === 2 && 
     <div className="w-[70%] mx-auto">
        <div onClick={()=>setShowIndex(null)} className="text-center py-2 bg-red-500 cursor-pointer">Close</div>
        <div className="mb-4 px-10 flex justify-between items-center mt-2">
          <h2 className="text-lg font-semibold">Users Feedbacks</h2>
          <span className="text-sm text-gray-500">Total Feedback: 10</span>
        </div>
     <table className="min-w-full divide-y divide-gray-200">
       <thead className="bg-gray-50">
         <tr>
           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr No.</th>
           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Controls</th>
         </tr>
       </thead>
       <tbody className="bg-white divide-y divide-gray-200">
         <tr>
           <td className="px-6 py-4 whitespace-nowrap">1</td>
           <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
           <td className="px-6 py-4 whitespace-nowrap">Task description goes here</td>
           <td className="px-6 py-4 whitespace-nowrap">Completed</td>
           <td className="px-6 py-4 whitespace-nowrap">
             <button className="text-indigo-600 hover:text-indigo-900 mr-2">Change Status</button>
             <button className="text-red-600 hover:text-red-900">Delete Feedback</button>
           </td>
         </tr>
         <tr>
           <td className="px-6 py-4 whitespace-nowrap">1</td>
           <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
           <td className="px-6 py-4 whitespace-nowrap">Task description goes here</td>
           <td className="px-6 py-4 whitespace-nowrap">Completed</td>
           <td className="px-6 py-4 whitespace-nowrap">
             <button className="text-indigo-600 hover:text-indigo-900 mr-2">Change Status</button>
             <button className="text-red-600 hover:text-red-900">Delete Feedback</button>
           </td>
         </tr>
         {/* Add more rows as needed */}
       </tbody>
     </table>
   </div>
     }
    </>
  );
}

export default UserActivity;
