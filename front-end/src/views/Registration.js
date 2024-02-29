import React, { useState } from "react";
import axios from "axios";
// import { GiFlyingFlag } from "react-icons/gi";
import { Link,useNavigate } from "react-router-dom";

function Registration() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const enabled =
    formData.userName.length > 0 &&
    formData.email.length > 0 &&
    formData.email.includes("@") &&
    formData.email.includes("gmail.com") &&
    formData.password.length > 7 &&
    formData.confirmPassword.length > 7 &&
    formData.role.length > 0;
  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/v1/users/new", formData, 
     {
      // headers: {
      //   'Access-Control-Request-Headers': 'set-cookie'
      // },
      withCredentials:true
    },
    
    )
      .then((data) => {
        console.log(data)
         if(data.data.success){
          navigate('/login')
         }
      })
      .catch((e) => console.log(e));
    console.log(formData);
  };
  return (
    <section className="bg-darkBg py-20">
      <div className="sm:flex justify-center ">
        <div className="">
          <div className="sm:w-[550px] w-[100%] p-1 mx-auto ">
            <div className="w-[100%] px-5">
              <div className=" bg-lightBg py-10 px-7 rounded-md">
                <h1 className="text-green text-2xl font-bold">
                  Create an account
                </h1>
                <form autoComplete="off" onSubmit={onSubmit}>
                  <div className="mt-5 text-black">
                    <div className="mt-1">
                      <input
                        value={formData.userName}
                        onChange={(e) =>
                          setFormData({ ...formData, userName: e.target.value })
                        }
                        type="text"
                        name="serName"
                        required
                        placeholder="Username"
                        autoComplete="off"
                        className="border-2 border-gray-400 w-full px-3 py-2 h-[50px] rounded-sm focus:border-green  focus:border focus:placeholder:text-black focus:outline-none focus:text-black"
                      />
                    </div>
                  </div>
                  <div className="mt-5 text-black">
                    <div className="mt-1">
                      <input
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        type="email"
                        name="Email"
                        required
                        autoComplete="off"
                        placeholder="email"
                        className="border-2 border-gray-400 w-full px-3 py-2 h-[50px] focus:border-green rounded-sm  focus:border focus:placeholder:text-black focus:outline-none focus:text-black"
                      />
                    </div>
                  </div>

                  <div className="mt-5 text-black">
                    <div className="mt-1 ">
                      <input
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        type="password"
                        name="password"
                        required
                        placeholder="Password"
                        autoComplete="off"
                        className="border-2 border-gray-400 w-full px-3 py-2 h-[50px] focus:border-green rounded-sm  focus:border focus:placeholder:text-black focus:outline-none focus:text-black"
                      />
                    </div>
                  </div>
                  <div className="mt-5 text-black">
                    <div className="mt-1">
                      <input
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        type="password"
                        name="confirmPassword"
                        required
                        placeholder="Confirm Password"
                        autoComplete="off"
                        className="border-2 border-gray-400 w-full px-3 py-2 h-[50px] focus:border-green rounded-sm  focus:border focus:placeholder:text-black focus:outline-none focus:text-black"
                      />
                    </div>
                    {formData.password !== formData.confirmPassword && (
                      <p className="text-red-500 text-sm">
                        Confirm password doesn't match
                      </p>
                    )}
                  </div>

                  <div className="mt-5 text-black">
                    <div className="mt-1">
                      <select
                        // value={formData.uniRole}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            role: e.target.value,
                          })
                        }
                        className="appearance-none block w-full border-2 border-gray-400 h-[70px]  rounded py-3 px-4 mb-3 leading-tight focus:outline-none   focus:border  focus:placeholder:text-black focus:border-green"
                        required
                        autoComplete="off"
                      >
                        <option className="" value="Role*" disabled selected>
                          Role*
                        </option>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="User">User</option>
                      </select>
                    </div>
                  </div>

                  {!enabled && (
                    <p className="text-red-500 text-sm mt-3">
                      Please fill out all the fields to submit the form
                    </p>
                  )}

                  <div className="mt-5">
                    <button
                      // onClick={onSubmit}

                      disabled={!enabled}
                      type="submit"
                      className={
                        enabled
                          ? "bg-[rgba(58,143,62,0.9)] text-black w-full text-center font-bold text-sm py-4 rounded-md"
                          : "bg-[rgba(58,143,62,0.37)]  text-gray-500 w-full text-center  text-[12px] font-medium py-4 rounded-md"
                      }
                    >
                      CREATE ACCOUNT
                    </button>
                  </div>
                  <p className="text-sm text-black mt-5">
                    Already have an account{" "}
                    <Link to="/login" className="text-blue-600">
                      Sign In
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Registration;
