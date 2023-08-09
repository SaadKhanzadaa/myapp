import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Dashbaord from "./Dashbaord";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

var Toasts = require("./ToastMessages.js"); //importing Toasts
const serverAddress= require('./serverAddress.js').serverAddress;

// import './Form.css'; // Create this file for custom styles

function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentialsData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentialsData({ ...credentials, [name]: value });
  };

  async function handleLogin(e) {
    e.preventDefault();
    Toasts.showInfoMessage("requesting !!!");

    try {
      const response = await fetch("https://fyp-deployement-server-id.de.r.appspot.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...credentials,
        }),
      });
      const data = await response.json();
      if (data.user) {
        //check user is login ornt
        localStorage.setItem("token", data.user);
        // console.log(data.user)

        window.location.href = "/dashbaord";
      } else {
        Toasts.showErrorMessage("Invalid Credentials !");
      }
      console.log(data);
    } catch (err) {
      Toasts.showInfoMessage("Plase Try again later,Server is not responding");
    }
  }
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 col-sm-8">
            <div className="card shadow login-form">
              <div className="card-body">
                <h3 className="card-title text-center">
                  {isLogin ? "Login" : "Sign Up"}
                </h3>
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      value={credentials.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      id="password"
                      value={credentials.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                    />
                  </div>

                  {/* Additional fields for registration form */}

                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">
                      {isLogin ? "Login" : "Sign Up"}
                    </button>
                  </div>
                </form>

                {/* Switch between Login and Sign Up */}
                <Link to="/signup">
                  <div className="text-center mt-3">
                    <button type="button" className="btn btn-link">
                      Create an account
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginForm;



// antd design

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Form, Input, Button, Card, message } from "antd";
// import { UserOutlined, LockOutlined } from "@ant-design/icons";

// // import "antd/dist/antd.css"; // Import Ant Design CSS

// const LoginForm = () => {
//   const [loading, setLoading] = useState(false);

//   const onFinish = async (values) => {
//     setLoading(true);
//     try {
//       const response = await fetch(serverAddress+"/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       });
//       const data = await response.json();
//       setLoading(false);

//       if (data.user) {
//         localStorage.setItem("token", data.user);
//         window.location.href = "/dashboard";
//       } else {
//         message.error("Invalid credentials!");
//       }
//     } catch (err) {
//       setLoading(false);
//       message.error("Server is not responding. Please try again later.");
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center min-vh-100">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-lg-4 col-md-6 col-sm-8">
//             <Card className="shadow login-form" title="Login">
//               <Form name="login-form" onFinish={onFinish}>
//                 <Form.Item
//                   name="email"
//                   rules={[
//                     {
//                       required: true,
//                       message: "Please enter your email!",
//                     },
//                   ]}
//                 >
//                   <Input
//                     prefix={<UserOutlined className="site-form-item-icon" />}
//                     placeholder="Email"
//                   />
//                 </Form.Item>

//                 <Form.Item
//                   name="password"
//                   rules={[
//                     {
//                       required: true,
//                       message: "Please enter your password!",
//                     },
//                   ]}
//                 >
//                   <Input.Password
//                     prefix={<LockOutlined className="site-form-item-icon" />}
//                     placeholder="Password"
//                   />
//                 </Form.Item>

//                 <Form.Item>
//                   <Button
//                     type="primary"
//                     htmlType="submit"
//                     className="login-form-button"
//                     loading={loading}
//                   >
//                     Log in
//                   </Button>
//                 </Form.Item>
//               </Form>

//               <div className="text-center mt-3">
//                 <Link to="/signup">
//                   <Button type="link">Create an account</Button>
//                 </Link>
//               </div>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

