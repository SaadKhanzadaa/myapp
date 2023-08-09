import React, { useEffect, useState } from "react";

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    // Fetch medicine data from the server when the component mounts
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await fetch("http://localhost:1999/api/medicines");
      const data = await response.json();
      setMedicines(data);
    } catch (error) {
      console.error("Error fetching medicine data:", error);
    }
  };

  return (
    <div>
      <h2>Medicine List</h2>
      <div className="medicine-grid">
        {medicines.map((medicine, index) => (
          <div key={index}>
            <h3>{medicine.medicineName}</h3>
            <p>Expiry Date: {medicine.expiryDate}</p>
            <p>Quantity: {medicine.quantity}</p>
            <p>Donor Name: {medicine.donorName}</p>
            <p>Contact Number: {medicine.contactNumber}</p>
            <p>Address: {medicine.address}</p>
            {medicine.cnicFrontImage && (
              <img
                src={`data:image/png;base64,${medicine.cnicFrontImage.data.toString(
                  "base64"
                )}`}
                alt={`CNIC Front ${index + 1}`}
              />
            )}
            {medicine.cnicBackImage && (
              <img
                src={`data:image/png;base64,${medicine.cnicBackImage.data.toString(
                  "base64"
                )}`}
                alt={`CNIC Back ${index + 1}`}
              />
            )}
          </div>
        ))}
      </div>

      <div class="spinner-border" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
  );
};

export default MedicineList;
