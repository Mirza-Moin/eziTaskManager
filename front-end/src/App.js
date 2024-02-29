import {Routes, Route} from 'react-router-dom';
import Login from './views/Login';
import Registration from './views/Registration';
import ManagerLayout from './views/ManagerLayout';
import UserLayout from './views/UserLayout';
import AdminLayout from './views/AdminLayout';


function App() {
  const userToken = localStorage.getItem('token')
  const role = JSON.parse(localStorage.getItem('role'));
  return (
    <Routes>
      { userToken ? (role === "Manager" ? (<Route path='/manager' element ={<ManagerLayout/>} ></Route>) :
      role === "Admin" ? (<Route path='/admin' element ={<AdminLayout/>} ></Route>) : (<Route path='/user' element ={<UserLayout/>} ></Route>))  :
      (
        <>
           <Route path="/login" element={<Login/>}></Route>
           <Route path="/registration" element={<Registration/>}></Route>
        </>
      )     
}

      <Route path="*" element={<h1>Page not found 404</h1>}></Route>
    </Routes>
   
  );
}

export default App;
