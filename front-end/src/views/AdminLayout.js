import React from 'react'
import TaskList from '../components/TaskList'

function AdminLayout({role}) {

return (
    <>
      <TaskList role={role}/>
    </>
);
}


export default AdminLayout
