import axios from 'axios'

function ManagerLayout() {
    const onLogout = () =>{
        console.log('running')
      localStorage.removeItem('token')
      window.location='/login'
    }
    return (
        <div> heloo world
            <button onClick={onLogout} className="bg-blue-500 ">Manager Logout</button>
        </div>
    );
}

export default ManagerLayout;