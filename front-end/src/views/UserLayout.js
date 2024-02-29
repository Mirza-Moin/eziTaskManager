import React from 'react'

function UserLayout() {
    const onLogout = () =>{
        console.log('running')
      localStorage.removeItem('token')
      window.location='/login'
    }
    return (
        <div> heloo world
            <button onClick={onLogout} className="bg-blue-500 ">User Logout</button>
        </div>
    );
}


export default UserLayout
