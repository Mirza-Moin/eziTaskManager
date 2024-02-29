import React from 'react'

function AdminLayout() {
  const onLogout = () =>{
    console.log('running')
  localStorage.removeItem('token')
  window.location='/login'
}
return (
    <div> heloo world
        <button onClick={onLogout} className="bg-blue-500 ">Admin Logout</button>
    </div>
);
}


export default AdminLayout
