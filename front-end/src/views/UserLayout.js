import React from 'react'
import TaskList from '../components/TaskList';

function UserLayout({role}) {
    return (
        <>
          <TaskList role={role}/>
        </>
    );
}


export default UserLayout
