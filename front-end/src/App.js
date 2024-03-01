import {Routes, Route, Navigate} from 'react-router-dom';
import Login from './views/Login';
import Registration from './views/Registration';
import ManagerLayout from './views/ManagerLayout';
import UserLayout from './views/UserLayout';
import AdminLayout from './views/AdminLayout';
import EditTask from './components/EditTask'
import NewTask from './components/NewTask'


function App() {
  const userToken = localStorage.getItem('token')
  const role = JSON.parse(localStorage.getItem('role'));
  return (
    <Routes>
      { userToken ? (role === "Manager" ? (<Route path='/manager' element ={<ManagerLayout role={role} />} ></Route>) :
      role === "Admin" ? (<Route path='/admin' element ={<AdminLayout role={role}/>} ></Route>) : (<Route path='/user' element ={<UserLayout role={role}/>} ></Route>))  :
      (
        <>
           <Route path="/login" element={<Login/>}></Route>
           <Route path="/registration" element={<Registration/>}></Route>
        </>
      )     
}
      <Route path="/" element={<Navigate to="/login" replace />} /> 
      <Route path="/update" element={<EditTask/>} /> 
      <Route path="/add" element={<NewTask/>} />   
      <Route path="*" element={<h1 className='h-screen text-center text-[26px] p-20 bg-blue-100 font-extrabold'>Page not found 404</h1>}></Route>
    </Routes>
   
  );
}

export default App;
