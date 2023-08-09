import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import ReactPaginate from "react-paginate";

function AcceptedMedicineList({ loggedInUser }) {
  const [acceptedMedicines, setAcceptedMedicines] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  // Fetch accepted medicines data from MongoDB here
  useEffect(() => {
    const fetchAcceptedMedicines = async () => {
      try {
        const response = await fetch("YOUR_API_ENDPOINT");
        const data = await response.json();
        setAcceptedMedicines(data);
        setIsFetchingData(false);
      } catch (error) {
        console.error("Error fetching accepted medicines:", error);
        setIsFetchingData(false);
      }
    };

    fetchAcceptedMedicines();
  }, []);

  const totalPages = Math.ceil(acceptedMedicines.length / itemsPerPage);

  const handlePaginate = ({ selected }) => {
    setCurrentPage(selected);
  };

  const getCurrentItems = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return acceptedMedicines.slice(startIndex, endIndex);
  };

  return (
    <div>
      {isFetchingData ? (
        <div className="spinner-container">
          <Spin size="large" />
        </div>
      ) : acceptedMedicines.length === 0 ? (
        <div>No accepted medicines.</div>
      ) : (
        <>
          <div className="row justify-content-center mt-3">
            {getCurrentItems().map((medicine) => (
              <div key={medicine.id} className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{medicine.medicineName}</h5>
                    <p className="card-text">Expiry Date: {medicine.expiryDate}</p>
                    <p className="card-text">Donor Name: {medicine.donorName}</p>
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

export default AcceptedMedicineList;
