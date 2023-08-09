import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import ReactPaginate from "react-paginate";

function DonatedMedicineList({ loggedInUser }) {
  const [donatedMedicines, setDonatedMedicines] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  // Fetch donated medicines data from MongoDB here
  useEffect(() => {
    const fetchDonatedMedicines = async () => {
      try {
        const response = await fetch("YOUR_API_ENDPOINT");
        const data = await response.json();
        setDonatedMedicines(data);
        setIsFetchingData(false);
      } catch (error) {
        console.error("Error fetching donated medicines:", error);
        setIsFetchingData(false);
      }
    };

    fetchDonatedMedicines();
  }, []);

  const totalPages = Math.ceil(donatedMedicines.length / itemsPerPage);

  const handlePaginate = ({ selected }) => {
    setCurrentPage(selected);
  };

  const getCurrentItems = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return donatedMedicines.slice(startIndex, endIndex);
  };

  return (
    <div>
      {isFetchingData ? (
        <div className="spinner-container">
          <Spin size="large" />
        </div>
      ) : donatedMedicines.length === 0 ? (
        <div>No donated medicines.</div>
      ) : (
        <>
          <div className="row justify-content-center mt-3">
            {getCurrentItems().map((medicine) => (
              <div key={medicine.id} className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{medicine.medicineName}</h5>
                    <p className="card-text">Expiry Date: {medicine.expiryDate}</p>
                    <p className="card-text">Recipient Name: {medicine.recipientName}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-3">
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                breakClassName={"page-item break"}
                breakLinkClassName={"page-link"}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePaginate}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                activeClassName={"active"}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DonatedMedicineList;
