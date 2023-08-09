import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {showSuccessMessage,showErrorMessage,showInfoMessage} from './ToastMessages'
var Toasts = require('./ToastMessages.js');

// Validation Patterns
const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
const phoneNumberPattern = /^03[0-9]{2}-[0-9]{7}$/;
const cnicPattern = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;
const serverAddress= require('./serverAddress.js').serverAddress;

const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    cnic: "",
    age: "",
    userType: "individual",
    password: "",
  });

  // State to store field validation status
  const [validationErrors, setValidationErrors] = useState({
    email: false,
    phoneNumber: false,
    cnic: false,
    age: false,
    password: false,
  });




  //uisng react toastify








  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    // Validate the form before submitting
    if (validateForm()) {

      Toasts.showInfoMessage('Validating the form')

      try {
        const response = await fetch(serverAddress+"/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok && data.status === "ok") {
          
   
     
          navigate("/login");



        } else {
          Toasts.showErrorMessage('Already Registered with same email');
          // toast.error('Already Registered with same email', {
          //   position: toast.POSITION.TOP_CENTER,
          //   autoClose: 3000, //3 seconds
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          
          // });

        }
      } catch (error) {

        Toasts.showErrorMessage('Server not responding');
        console.error("Error submitting the form:", error);
      }
    } else {
      // Form is invalid
      

    }
  }

  // Validate the entire form
  const validateForm = () => {
    const emailIsValid = emailPattern.test(formData.email);
    const phoneNumberIsValid = phoneNumberPattern.test(formData.phoneNumber);
    const cnicIsValid = cnicPattern.test(formData.cnic);
    const ageIsValid = parseInt(formData.age, 10) >= 18 && parseInt(formData.age, 10) <= 100;
    const passwordIsValid = passwordPattern.test(formData.password);

    setValidationErrors({
      email: !emailIsValid,
      phoneNumber: !phoneNumberIsValid,
      cnic: !cnicIsValid,
      age: !ageIsValid,
      password: !passwordIsValid,
    });

    return emailIsValid && phoneNumberIsValid && cnicIsValid && ageIsValid && passwordIsValid;
  };

  const handleEmailValidation = (e) => {
    setValidationErrors({ ...validationErrors, email: !emailPattern.test(e.target.value) });
  };

  const handlePhoneNumberValidation = (e) => {
    setValidationErrors({ ...validationErrors, phoneNumber: !phoneNumberPattern.test(e.target.value) });
  };

  const handleCnicValidation = (e) => {
    setValidationErrors({ ...validationErrors, cnic: !cnicPattern.test(e.target.value) });
  };

  const handleAgeValidation = (e) => {
    const age = parseInt(e.target.value, 10);
    setValidationErrors({ ...validationErrors, age: age < 18 || age > 100 });
  };

  const handlePasswordValidation = (e) => {
    setValidationErrors({ ...validationErrors, password: !passwordPattern.test(e.target.value) });
  };

  return (
    <div className="container">
      <ToastContainer/>
      <div className="row justify-content-center">
        <div className="col-lg-9 col-md-8 col-sm-10 my-3">
          <div className="card shadow registration-form">
            <div className="card-body">
              <h3 className="card-title text-center">Registration</h3>
        
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`form-control ${validationErrors.email ? "is-invalid" : ""}`}
                    id="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleEmailValidation}
                    required
                  />
                  {validationErrors.email && (
                    <div className="invalid-feedback">Please enter a valid email address.</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className={`form-control ${validationErrors.phoneNumber ? "is-invalid" : ""}`}
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Enter your phone number (03XX-XXXXXXX)"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    onBlur={handlePhoneNumberValidation}
                    required
                  />
                  {validationErrors.phoneNumber && (
                    <div className="invalid-feedback">Please enter a valid phone number (03XX-XXXXXXX).</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="cnic" className="form-label">
                    CNIC Number
                  </label>
                  <input
                    type="text"
                    className={`form-control ${validationErrors.cnic ? "is-invalid" : ""}`}
                    id="cnic"
                    name="cnic"
                    placeholder="Enter your CNIC number (XXXXX-XXXXXXX-X)"
                    value={formData.cnic}
                    onChange={handleChange}
                    onBlur={handleCnicValidation}
                    required
                  />
                  {validationErrors.cnic && (
                    <div className="invalid-feedback">Please enter a valid CNIC number (XXXXX-XXXXXXX-X).</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="age" className="form-label">
                    Age
                  </label>
                  <input
                    type="number"
                    className={`form-control ${validationErrors.age ? "is-invalid" : ""}`}
                    id="age"
                    name="age"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={handleChange}
                    onBlur={handleAgeValidation}
                    required
                  />
                  {validationErrors.age && (
                    <div className="invalid-feedback">Please enter a valid age (between 18 and 100).</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="userType" className="form-label">
                    Sign Up As
                  </label>
                  <select
                    className="form-select"
                    id="userType"
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                  >
                    <option value="individual">Individual</option>
                    <option value="ngo">NGO</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${validationErrors.password ? "is-invalid" : ""}`}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handlePasswordValidation}
                    required
                  />
                  {validationErrors.password && (
                    <div className="invalid-feedback">
                      Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase
                      letter, and one number.
                    </div>
                  )}
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>

                <div className="text-center mt-3">
                  <Link to="/login">
                    <button type="button" className="btn btn-link">
                      Already have an account?
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;



