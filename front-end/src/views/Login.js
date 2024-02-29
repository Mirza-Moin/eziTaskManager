import React, { useState } from "react";
// import { GiFlyingFlag } from "react-icons/gi";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const enabled = formData.userName.length > 7 && formData.password.length > 7;
  const onSubmit = async (e) => {
    e.preventDefault();
    try{
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/users/login",
      formData
    );
    localStorage.setItem('token',data.token)
    localStorage.setItem('role',JSON.stringify(data.role))
    // navigate('/')
    window.location=JSON.stringify(data.role).toLowerCase().replace(/"/g, '')
  }
  catch(error){
    console.log(error)
  }

  };
  return (
    <div>
      <section className="bg-darkBg py-20">
        <div className="sm:w-[500px] w-[100%] p-1 mx-auto ">
          <div className="w-[100%] px-5">
            <div className=" bg-lightBg py-10 px-7 rounded-md">
              <h1 className="text-green text-2xl font-bold">
                Sign in to your account
              </h1>
              <form autoComplete="off" onSubmit={onSubmit}>
                <div className="mt-7 text-black">
                  <div className="mt-1">
                    <input
                      value={formData.userName}
                      onChange={(e) =>
                        setFormData({ ...formData, userName: e.target.value })
                      }
                      type="text"
                      name="UserName"
                      required
                      autoComplete="off"
                      placeholder="User Name"
                      className="w-full px-3 py-2 h-[50px] rounded-sm border-2 border-gray-400 focus:border focus:border-green focus:outline-none focus:text-black"
                    />
                  </div>
                </div>

                <div className="mt-7 text-black">
                  <div className="mt-1">
                    <input
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      type="password"
                      name="password"
                      required
                      placeholder="Password"
                      className="border-2 border-gray-400 w-full px-3 py-2 h-[50px] rounded-sm focus:border focus:border-green focus:outline-none focus:text-black "
                    />
                  </div>
                </div>

                <div className="mt-10 ">
                  <Link className="text-blue-600 text-sm">
                    Forgot Your password?
                  </Link>
                </div>

                <div className="mt-5">
                  <button
                    // onClick={onSubmit}

                    disabled={!enabled}
                    type="submit"
                    className={
                      enabled
                        ? "bg-[rgba(58,143,62,0.9)]  text-black w-full text-center font-bold text-sm py-4 rounded-md"
                        : "bg-[rgba(58,143,62,0.37)]  text-black w-full text-center  text-[12px] font-medium py-4 rounded-md"
                    }
                  >
                    SIGN IN
                  </button>
                </div>
              </form>
            </div>
            <div
              onClick={() => navigate("/registration")}
              className="bg-[rgba(58,143,62,0.37)] border text-green border-green hover:bg-[rgba(58,143,62,0.9)] hover:text-black text-[12px] font-bold mt-5 flex justify-center items-center py-8 rounded-md cursor-pointer"
            >
              CREATE AN ACCOUNT
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
