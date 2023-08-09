// import React, { useEffect, useState } from "react";

// function MedicineCard(props){
//     return (
//         <div className="row justify-content-center mt-3">
//           {getCurrentItems().map((medicine) => (
//             <div key={medicine.id} className="col-md-4 mb-3">
//               <div className="card">
//                 <div className="card-body">
//                   <h5 className="card-title">{medicine.medicineName}</h5>
//                   <p className="card-text">Expiry Date: {medicine.expiryDate}</p>
//                   <p className="card-text">Donor Name: {medicine.donorName}</p>
//                   <div className="d-flex justify-content-between">
//                     <button
//                       className="btn btn-primary btn-sm med-btn"
//                       onClick={() => handleAcceptMedicine(medicine)}
//                     >
//                       Donate
//                     </button>
//                     <button
//                       className="btn btn-primary btn-sm med-btn"
//                       onClick={() => handleAcceptance(medicine)}
//                     >
//                       Accept
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
// );
// }