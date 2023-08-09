// import React, { useState } from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useDropzone } from 'react-dropzone';

// const AcceptanceForm = () => {
//   const [formData, setFormData] = useState({
//     acceptorName: '',
//     contactNumber: '',
//     address: '',
//     cnicFrontImage: null,
//     cnicBackImage: null,
//   });

//   const [errors, setErrors] = useState({});
//   const { getRootProps: getFrontRootProps, getInputProps: getFrontInputProps } = useDropzone({
//     accept: 'image/*',
//     multiple: false,
//     onDrop: (acceptedFiles) => {
//       setFormData((prevData) => ({
//         ...prevData,
//         cnicFrontImage: acceptedFiles[0],
//       }));
//     },
//   });

//   const { getRootProps: getBackRootProps, getInputProps: getBackInputProps } = useDropzone({
//     accept: 'image/*',
//     multiple: false,
//     onDrop: (acceptedFiles) => {
//       setFormData((prevData) => ({
//         ...prevData,
//         cnicBackImage: acceptedFiles[0],
//       }));
//     },
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length === 0) {
//       // Submit the form (You can handle form submission logic here)
//       console.log('Form submitted:', formData);

//       // BACKEND CODE (Save the formData to MongoDB)

//       // Reset the form after submission
//       setFormData({
//         acceptorName: '',
//         contactNumber: '',
//         address: '',
//         cnicFrontImage: null,
//         cnicBackImage: null,
//       });
//       setErrors({});
//     } else {
//       setErrors(validationErrors);
//     }
//   };

//   const validateForm = () => {
//     // Form validation logic
//     const validationErrors = {};

//     if (!formData.acceptorName.trim()) {
//       validationErrors.acceptorName = 'Acceptor name is required.';
//     }

//     if (!formData.contactNumber.trim()) {
//       validationErrors.contactNumber = 'Contact number is required.';
//     }

//     if (!formData.address.trim()) {
//       validationErrors.address = 'Address is required.';
//     }

//     if (!formData.cnicFrontImage) {
//       validationErrors.cnicFrontImage = 'CNIC front image is required.';
//     }

//     if (!formData.cnicBackImage) {
//       validationErrors.cnicBackImage = 'CNIC back image is required.';
//     }

//     return validationErrors;
//   };

//   return (
//     <div className="form-container container">
//       <h2 className="text-center">Acceptance Form for Unused Medicines</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="acceptorName" className="form-label">Acceptor Name</label>
//           <input
//             type="text"
//             className={`form-control ${errors.acceptorName ? 'is-invalid' : ''}`}
//             id="acceptorName"
//             name="acceptorName"
//             value={formData.acceptorName}
//             onChange={handleChange}
//           />
//           {errors.acceptorName && <div className="invalid-feedback">{errors.acceptorName}</div>}
//         </div>

//         <div className="mb-3">
//           <label htmlFor="contactNumber" className="form-label">Contact Number</label>
//           <input
//             type="tel"
//             className={`form-control ${errors.contactNumber ? 'is-invalid' : ''}`}
//             id="contactNumber"
//             name="contactNumber"
//             value={formData.contactNumber}
//             onChange={handleChange}
//           />
//           {errors.contactNumber && <div className="invalid-feedback">{errors.contactNumber}</div>}
//         </div>

//         <div className="mb-3">
//           <label htmlFor="address" className="form-label">Address</label>
//           <textarea
//             className={`form-control ${errors.address ? 'is-invalid' : ''}`}
//             id="address"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//           />
//           {errors.address && <div className="invalid-feedback">{errors.address}</div>}
//         </div>

//         {/* CNIC Front Image Upload */}
//         <div className="mb-3">
//           <label htmlFor="cnicFrontImage" className="form-label">CNIC Front Image</label>
//           <div className="dropzone" {...getFrontRootProps()}>
//             <input {...getFrontInputProps()} />
//             <p>Drag 'n' drop a CNIC front image here, or click to select image</p>
//             {formData.cnicFrontImage && (
//               <img
//                 className="uploaded-image"
//                 src={URL.createObjectURL(formData.cnicFrontImage)}
//                 alt="CNIC Front"
//               />
//             )}
//           </div>
//           {errors.cnicFrontImage && <div className="invalid-feedback">{errors.cnicFrontImage}</div>}
//         </div>

//         {/* CNIC Back Image Upload */}
//         <div className="mb-3">
//           <label htmlFor="cnicBackImage" className="form-label">CNIC Back Image</label>
//           <div className="dropzone" {...getBackRootProps()}>
//             <input {...getBackInputProps()} />
//             <p>Drag 'n' drop a CNIC back image here, or click to select image</p>
//             {formData.cnicBackImage && (
//               <img
//                 className="uploaded-image"
//                 src={URL.createObjectURL(formData.cnicBackImage)}
//                 alt="CNIC Back"
//               />
//             )}
//           </div>
//           {errors.cnicBackImage && <div className="invalid-feedback">{errors.cnicBackImage}</div>}
//         </div>

//         <button type="submit" className="btn btn-primary">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default AcceptanceForm;



import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useDropzone } from 'react-dropzone';

const AcceptanceForm = () => {
  const [formData, setFormData] = useState({
    acceptorName: '',
    contactNumber: '',
    address: '',
    cnicFrontImage: null,
    cnicBackImage: null,
    prescriptionImage: null,
  });

  const [errors, setErrors] = useState({});
  const { getRootProps: getFrontRootProps, getInputProps: getFrontInputProps } = useDropzone({
    accept: '.png, .jpg, .jpeg', // Allow only png, jpg, and jpeg images
    multiple: false,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          cnicFrontImage: 'Invalid file format. Please upload a valid image (png, jpg, jpeg).',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          cnicFrontImage: '',
        }));
        setFormData((prevData) => ({
          ...prevData,
          cnicFrontImage: acceptedFiles[0],
        }));
      }
    },
  });

  const { getRootProps: getBackRootProps, getInputProps: getBackInputProps } = useDropzone({
    accept: '.png, .jpg, .jpeg', // Allow only png, jpg, and jpeg images
    multiple: false,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          cnicBackImage: 'Invalid file format. Please upload a valid image (png, jpg, jpeg).',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          cnicBackImage: '',
        }));
        setFormData((prevData) => ({
          ...prevData,
          cnicBackImage: acceptedFiles[0],
        }));
      }
    },
  });

  const { getRootProps: getPrescriptionRootProps, getInputProps: getPrescriptionInputProps } = useDropzone({
    accept: '.png, .jpg, .jpeg, .doc, .pdf', // Allow png, jpg, jpeg, doc, and pdf files
    multiple: false,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          prescriptionImage: 'Invalid file format. Please upload a valid image (png, jpg, jpeg), document (doc), or PDF (pdf).',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          prescriptionImage: '',
        }));
        setFormData((prevData) => ({
          ...prevData,
          prescriptionImage: acceptedFiles[0],
        }));
      }
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Submit the form (You can handle form submission logic here)
      console.log('Form submitted:', formData);

      // BACKEND CODE (Save the formData to MongoDB)

      // Reset the form after submission
      setFormData({
        acceptorName: '',
        contactNumber: '',
        address: '',
        cnicFrontImage: null,
        cnicBackImage: null,
        prescriptionImage: null,
      });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    // Form validation logic
    const validationErrors = {};

    if (!formData.acceptorName.trim()) {
      validationErrors.acceptorName = 'Acceptor name is required.';
    }

    if (!formData.contactNumber.trim()) {
      validationErrors.contactNumber = 'Contact number is required.';
    }

    if (!formData.address.trim()) {
      validationErrors.address = 'Address is required.';
    }

    if (!formData.cnicFrontImage) {
      validationErrors.cnicFrontImage = 'CNIC front image is required.';
    }

    if (!formData.cnicBackImage) {
      validationErrors.cnicBackImage = 'CNIC back image is required.';
    }

    // Add validation for Prescription/Proof of Ownership image
    if (!formData.prescriptionImage) {
      validationErrors.prescriptionImage = 'Prescription/Proof of Ownership image is required.';
    }

    return validationErrors;
  };
  return (
    <div className="form-container container">
      <h2 className="text-center">Acceptance Form for Unused Medicines</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="acceptorName" className="form-label">Acceptor Name</label>
          <input
            type="text"
            className={`form-control ${errors.acceptorName ? 'is-invalid' : ''}`}
            id="acceptorName"
            name="acceptorName"
            value={formData.acceptorName}
            onChange={handleChange}
          />
          {errors.acceptorName && <div className="invalid-feedback">{errors.acceptorName}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="contactNumber" className="form-label">Contact Number</label>
          <input
            type="tel"
            className={`form-control ${errors.contactNumber ? 'is-invalid' : ''}`}
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
          />
          {errors.contactNumber && <div className="invalid-feedback">{errors.contactNumber}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <textarea
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <div className="invalid-feedback">{errors.address}</div>}
        </div>

        {/* CNIC Front Image Upload */}
        <div className="mb-3">
          <label htmlFor="cnicFrontImage" className="form-label">CNIC Front Image</label>
          <div className="dropzone" {...getFrontRootProps()}>
            <input {...getFrontInputProps()} />
            <p>Drag 'n' drop a CNIC front image here, or click to select image</p>
            {formData.cnicFrontImage && (
              <img
                className="uploaded-image"
                src={URL.createObjectURL(formData.cnicFrontImage)}
                alt="CNIC Front"
              />
            )}
          </div>
          {errors.cnicFrontImage && <div className="invalid-feedback">{errors.cnicFrontImage}</div>}
        </div>

        {/* CNIC Back Image Upload */}
        <div className="mb-3">
          <label htmlFor="cnicBackImage" className="form-label">CNIC Back Image</label>
          <div className="dropzone" {...getBackRootProps()}>
            <input {...getBackInputProps()} />
            <p>Drag 'n' drop a CNIC back image here, or click to select image</p>
            {formData.cnicBackImage && (
              <img
                className="uploaded-image"
                src={URL.createObjectURL(formData.cnicBackImage)}
                alt="CNIC Back"
              />
            )}
          </div>
          {errors.cnicBackImage && <div className="invalid-feedback">{errors.cnicBackImage}</div>}
        </div>

        {/* Prescription/Proof of Ownership Image Upload */}
        <div className="mb-3">
          <label htmlFor="prescriptionImage" className="form-label">Prescription/Proof of Ownership Image</label>
          <div className="dropzone" {...getPrescriptionRootProps()}>
            <input {...getPrescriptionInputProps()} />
            <p>Drag 'n' drop a prescription image here, or click to select image</p>
            {formData.prescriptionImage && (
              <img
                className="uploaded-image"
                src={URL.createObjectURL(formData.prescriptionImage)}
                alt="Prescription/Proof of Ownership"
              />
            )}
          </div>
          {errors.prescriptionImage && <div className="invalid-feedback">{errors.prescriptionImage}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AcceptanceForm;
