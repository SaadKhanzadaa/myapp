import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDropzone } from "react-dropzone";
import LoadingSpinner from "./LoadingSpinner";


//Toasts required Lib and functions
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
var Toasts = require('./ToastMessages.js');
const serverAddress= require('./serverAddress.js').serverAddress;



const UnusedMedicineDonationForm = () => {
  const [formData, setFormData] = useState({
    medicineName: "",
    expiryDate: "",
    quantity: "",
    donorName: "",
    contactNumber: "",
    address: "",
    cnicFrontImage: null,
    cnicBackImage: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCNICFrontImageDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cnicFrontImage:
          "Invalid file format. Please upload a valid image (png, jpg, jpeg).",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cnicFrontImage: "",
      }));
      setFormData((prevData) => ({
        ...prevData,
        cnicFrontImage: acceptedFiles[0],
      }));
    }
  };

  const handleCNICBackImageDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cnicBackImage:
          "Invalid file format. Please upload a valid image (png, jpg, jpeg).",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cnicBackImage: "",
      }));
      setFormData((prevData) => ({
        ...prevData,
        cnicBackImage: acceptedFiles[0],
      }));
    }
  };

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   const validationErrors = validateForm();
  //   if (Object.keys(validationErrors).length === 0) {
  //     console.log("Form submitted:", formData);
  //     try {
  //       const response = await fetch(serverAddress+"/api/donate", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formData),
  //       });

  //       const data = await response.json();
  //       console.log(data);
  //     } catch (err) {
  //       console.log(err);
  //     }

  //     setFormData({
  //       medicineName: "",
  //       expiryDate: "",
  //       quantity: "",
  //       donorName: "",
  //       contactNumber: "",
  //       address: "",
  //       cnicFrontImage: null,
  //       cnicBackImage: null,
  //     });
  //     setErrors({});
  //   } else {
  //     setErrors(validationErrors);
  //   }
  // }

  const [isLoading, setLoading] = useState(false);


  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("medicineName", formData.medicineName);
        formDataToSend.append("expiryDate", formData.expiryDate);
        formDataToSend.append("quantity", formData.quantity);
        formDataToSend.append("donorName", formData.donorName);
        formDataToSend.append("contactNumber", formData.contactNumber);
        formDataToSend.append("address", formData.address);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("cnicFrontImage", formData.cnicFrontImage);
        formDataToSend.append("cnicBackImage", formData.cnicBackImage);
        console.log(formData.cnicBackImage);

        const response = await fetch(serverAddress+"/api/donate", {
          method: "POST",
          body: formDataToSend,
        });

        const data = await response.json();
        Toasts.showSuccessMessage("Donated !");
        console.log(data);
        setFormData({
          medicineName: "",
          expiryDate: "",
          quantity: "",
          donorName: "",
          contactNumber: "",
          address: "",
          email: "",
          cnicFrontImage: null,
          cnicBackImage: null,
        });
        setErrors({});

      } catch (err) {
        console.log(err);
        Toasts.showErrorMessage(err);

      }
    } else {
      setErrors(validationErrors);

    }
    setLoading(false);

  }

  const validateForm = () => {
    const validationErrors = {};

    if (!formData.medicineName.trim()) {
      validationErrors.medicineName = "Medicine name is required.";
    }

    if (!formData.expiryDate) {
      validationErrors.expiryDate = "Expiry date is required.";
    } else {
      const today = new Date();
      const expiryDate = new Date(formData.expiryDate);
      if (expiryDate <= today) {
        validationErrors.expiryDate = "Expiry date must be in the future.";
      }
    }

    if (!formData.quantity) {
      validationErrors.quantity = "Quantity is required.";
    } else if (isNaN(formData.quantity) || formData.quantity <= 0) {
      validationErrors.quantity = "Quantity must be a positive number.";
    }

    if (!formData.donorName.trim()) {
      validationErrors.donorName = "Donor name is required.";
    }

    if (!formData.contactNumber.trim()) {
      validationErrors.contactNumber = "Contact number is required.";
    }

    if (!formData.address.trim()) {
      validationErrors.address = "Address is required.";
    }

    if (!formData.cnicFrontImage) {
      validationErrors.cnicFrontImage = "CNIC front image is required.";
    }

    if (!formData.cnicBackImage) {
      validationErrors.cnicBackImage = "CNIC back image is required.";
    }

    return validationErrors;
  };

  const {
    getRootProps: getCNICFrontRootProps,
    getInputProps: getCNICFrontInputProps,
  } = useDropzone({
    accept: ".png, .jpg, .jpeg",
    multiple: false,
    onDrop: handleCNICFrontImageDrop,
  });

  const {
    getRootProps: getCNICBackRootProps,
    getInputProps: getCNICBackInputProps,
  } = useDropzone({
    accept: ".png, .jpg, .jpeg",
    multiple: false,
    onDrop: handleCNICBackImageDrop,
  });

  return (
    <div className="form-container container">
      <h2 className="text-center">Donation Form For Unused Medicines</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="medicineName" className="form-label">
            Medicine Name
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.medicineName ? "is-invalid" : ""
            }`}
            id="medicineName"
            name="medicineName"
            value={formData.medicineName}
            onChange={handleChange}
          />
          {errors.medicineName && (
            <div className="invalid-feedback">{errors.medicineName}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="expiryDate" className="form-label">
            Expiry Date
          </label>
          <input
            type="date"
            className={`form-control ${errors.expiryDate ? "is-invalid" : ""}`}
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
          />
          {errors.expiryDate && (
            <div className="invalid-feedback">{errors.expiryDate}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            className={`form-control ${errors.quantity ? "is-invalid" : ""}`}
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
          {errors.quantity && (
            <div className="invalid-feedback">{errors.quantity}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="donorName" className="form-label">
            Donor Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.donorName ? "is-invalid" : ""}`}
            id="donorName"
            name="donorName"
            value={formData.donorName}
            onChange={handleChange}
          />
          {errors.donorName && (
            <div className="invalid-feedback">{errors.donorName}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="contactNumber" className="form-label">
            Contact Number
          </label>
          <input
            type="tel"
            className={`form-control ${
              errors.contactNumber ? "is-invalid" : ""
            }`}
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
          />
          {errors.contactNumber && (
            <div className="invalid-feedback">{errors.contactNumber}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <textarea
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && (
            <div className="invalid-feedback">{errors.address}</div>
          )}
        </div>

        {/* CNIC Front Image Upload */}
        <div className="mb-3">
          <label htmlFor="cnicFrontImage" className="form-label">
            CNIC Front Image
          </label>
          <div className="dropzone" {...getCNICFrontRootProps()}>
            <input {...getCNICFrontInputProps()} />
            <p>
              Drag 'n' drop a CNIC front image here, or click to select image
            </p>
            {formData.cnicFrontImage && (
              <img
                className="uploaded-image"
                src={URL.createObjectURL(formData.cnicFrontImage)}
                alt="CNIC Front"
              />
            )}
          </div>
          {errors.cnicFrontImage && (
            <div className="invalid-feedback">{errors.cnicFrontImage}</div>
          )}
        </div>

        {/* CNIC Back Image Upload */}
        <div className="mb-3">
          <label htmlFor="cnicBackImage" className="form-label">
            CNIC Back Image
          </label>
          <div className="dropzone" {...getCNICBackRootProps()}>
            <input {...getCNICBackInputProps()} />
            <p>
              Drag 'n' drop a CNIC back image here, or click to select image
            </p>
            {formData.cnicBackImage && (
              <img
                className="uploaded-image"
                src={URL.createObjectURL(formData.cnicBackImage)}
                alt="CNIC Back"
              />
            )}
          </div>
          {errors.cnicBackImage && (
            <div className="invalid-feedback">{errors.cnicBackImage}</div>
          )}
        </div>
        {isLoading == false ? (
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        ) : <LoadingSpinner/>}
      </form>
      <ToastContainer/>
    </div>
  );
};

export default UnusedMedicineDonationForm;
