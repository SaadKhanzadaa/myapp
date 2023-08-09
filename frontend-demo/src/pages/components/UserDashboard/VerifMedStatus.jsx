// import React, { useState } from "react";
// import { Table, Modal, Button, Tag, Pagination } from "antd";
// // import "antd/dist/antd.css";

// function VerifMedStatus() {
//   const [donatedMedicines, setDonatedMedicines] = useState([
//     {
//       key: "1",
//       medicineName: "Medicine 1",
//       expiryDate: "2023-12-31",
//       quantity: 10,
//       status: "accept",
//       donarName: "John Donar",
//       contactEmail: "john@example.com",
//       contactPhone: "123-456-7890",
//       userId: "user123",
//     },
//     {
//       key: "2",
//       medicineName: "Medicine 2",
//       expiryDate: "2023-10-15",
//       quantity: 5,
//       status: "pending",
//       donarName: "Jane Donar",
//       userId: "user456",
//     },
//     {
//         key: "3",
//         medicineName: "Medicine 2",
//         expiryDate: "2023-10-15",
//         quantity: 5,
//         status: "pending",
//         donarName: "Jane Donar",
//         userId: "user456",
//       },
//       {
//         key: "4",
//         medicineName: "Medicine 2",
//         expiryDate: "2023-10-15",
//         quantity: 5,
//         status: "pending",
//         donarName: "Jane Donar",
//         userId: "user456",
//       },
//       {
//         key: "5",
//         medicineName: "Medicine 2",
//         expiryDate: "2023-10-15",
//         quantity: 5,
//         status: "pending",
//         donarName: "Jane Donar",
//         userId: "user456",
//       },
//     // ... Add more donated medicines data
//   ]);

//   const [requestedMedicines, setRequestedMedicines] = useState([
//     {
//       key: "1",
//       medicineName: "Medicine 3",
//       expiryDate: "2023-12-31",
//       quantity: 8,
//       donarName: "John Donar",
//       status: "accept",
//       contactEmail: "john@example.com",
//       contactPhone: "123-456-7890",
//       userId: "user123",
//     },
//     {
//       key: "2",
//       medicineName: "Medicine 4",
//       expiryDate: "2023-11-20",
//       quantity: 3,
//       donarName: "Jane Donar",
//       status: "pending",
//       userId: "user456",
//     },
//     {
//         key: "3",
//         medicineName: "Medicine 4",
//         expiryDate: "2023-11-20",
//         quantity: 3,
//         donarName: "Jane Donar",
//         status: "pending",
//         userId: "user456",
//       },
//       {
//         key: "4",
//         medicineName: "Medicine 4",
//         expiryDate: "2023-11-20",
//         quantity: 3,
//         donarName: "Jane Donar",
//         status: "pending",
//         userId: "user456",
//       },
//       {
//         key: "5",
//         medicineName: "Medicine 4",
//         expiryDate: "2023-11-20",
//         quantity: 3,
//         donarName: "Jane Donar",
//         status: "pending",
//         userId: "user456",
//       },
//     // ... Add more requested medicines data
//   ]);

//   const pageSize = 4;
//   const [donatedCurrentPage, setDonatedCurrentPage] = useState(1);
//   const [requestedCurrentPage, setRequestedCurrentPage] = useState(1);

//   const columnsDonated = [
//     {
//       title: "Medicine Name",
//       dataIndex: "medicineName",
//       key: "medicineName",
//     },
//     {
//       title: "Expiry Date",
//       dataIndex: "expiryDate",
//       key: "expiryDate",
//     },
//     {
//       title: "Quantity",
//       dataIndex: "quantity",
//       key: "quantity",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (text) => {
//         let color = "";
//         if (text === "pending") {
//           color = "volcano";
//         } else if (text === "accept") {
//           color = "green";
//         }
//         return <Tag color={color}>{text.toUpperCase()}</Tag>;
//       },
//     },
//   ];

//   const columnsRequested = [
//     {
//       title: "Medicine Name",
//       dataIndex: "medicineName",
//       key: "medicineName",
//     },
//     {
//       title: "Expiry Date",
//       dataIndex: "expiryDate",
//       key: "expiryDate",
//     },
//     {
//       title: "Quantity",
//       dataIndex: "quantity",
//       key: "quantity",
//     },
//     {
//       title: "Donar Name",
//       dataIndex: "donarName",
//       key: "donarName",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (text) => (
//         <Tag color={text === "accept" ? "green" : "volcano"}>
//           {text.toUpperCase()}
//         </Tag>
//       ),
//     },
//     {
//       title: "Donar Information",
//       key: "donarInfo",
//       render: (text, record) =>
//         record.status === "accept" ? (
//           <Button type="link" onClick={() => showModal(record)}>
//             Contact Donar
//           </Button>
//         ) : null,
//     },
//   ];

//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedDonar, setSelectedDonar] = useState(null);

//   const showModal = (record) => {
//     setSelectedDonar(record);
//     setModalVisible(true);
//   };

//   const hideModal = () => {
//     setSelectedDonar(null);
//     setModalVisible(false);
//   };

//   const handleDonatedPageChange = (page) => {
//     setDonatedCurrentPage(page);
//   };

//   const handleRequestedPageChange = (page) => {
//     setRequestedCurrentPage(page);
//   };

//   return (
//     <div>
//       <h2>Donated Medicines</h2>
//       <Table
//         dataSource={donatedMedicines.slice(
//           (donatedCurrentPage - 1) * pageSize,
//           donatedCurrentPage * pageSize
//         )}
//         columns={columnsDonated}
//         pagination={false}
//       />
//       <Pagination
//         current={donatedCurrentPage}
//         total={donatedMedicines.length}
//         pageSize={pageSize}
//         onChange={handleDonatedPageChange}
//         style={{ marginTop: 16, textAlign: "center" }}
//       />

//       <h2>Requested Accept Medicines</h2>
//       <Table
//         dataSource={requestedMedicines.slice(
//           (requestedCurrentPage - 1) * pageSize,
//           requestedCurrentPage * pageSize
//         )}
//         columns={columnsRequested}
//         pagination={false}
//       />
//       <Pagination
//         current={requestedCurrentPage}
//         total={requestedMedicines.length}
//         pageSize={pageSize}
//         onChange={handleRequestedPageChange}
//         style={{ marginTop: 16, textAlign: "center" }}
//       />

//       {/* Donar Information Modal */}
//       <Modal
//         title="Donar Information"
//         visible={modalVisible}
//         onCancel={hideModal}
//         footer={null}
//       >
//         {selectedDonar && (
//           <div>
//             <p>
//               <strong>Donar Name:</strong> {selectedDonar.donarName}
//             </p>
//             {selectedDonar.status === "accept" && (
//               <div>
//                 <p>
//                   <strong>Contact Email:</strong>{" "}
//                   {selectedDonar.contactEmail}
//                 </p>
//                 <p>
//                   <strong>Contact Phone:</strong>{" "}
//                   {selectedDonar.contactPhone}
//                 </p>
//               </div>
//             )}
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// }

// export default VerifMedStatus;



import React, { useState } from "react";
import { Table, Modal, Button, Tag, Pagination } from "antd";
// import "antd/dist/antd.css";

function VerifMedStatus() {
  const [donatedMedicines, setDonatedMedicines] = useState([
    {
        key: "1",
        medicineName: "Medicine 1",
        expiryDate: "2023-12-31",
        quantity: 10,
        status: "accept",
        donarName: "John Donar",
        contactEmail: "john@example.com",
        contactPhone: "123-456-7890",
        userId: "user123",
      },
      {
        key: "2",
        medicineName: "Medicine 2",
        expiryDate: "2023-10-15",
        quantity: 5,
        status: "pending",
        donarName: "Jane Donar",
        userId: "user456",
      },
      {
          key: "3",
          medicineName: "Medicine 2",
          expiryDate: "2023-10-15",
          quantity: 5,
          status: "pending",
          donarName: "Jane Donar",
          userId: "user456",
        },
        {
          key: "4",
          medicineName: "Medicine 2",
          expiryDate: "2023-10-15",
          quantity: 5,
          status: "pending",
          donarName: "Jane Donar",
          userId: "user456",
        },
        {
          key: "5",
          medicineName: "Medicine 2",
          expiryDate: "2023-10-15",
          quantity: 5,
          status: "pending",
          donarName: "Jane Donar",
          userId: "user456",
        },
  ]);

  const [requestedMedicines, setRequestedMedicines] = useState([
    {
        key: "1",
        medicineName: "Medicine 3",
        expiryDate: "2023-12-31",
        quantity: 8,
        donarName: "John Donar",
        status: "accept",
        contactEmail: "john@example.com",
        contactPhone: "123-456-7890",
        userId: "user123",
      },
      {
        key: "2",
        medicineName: "Medicine 4",
        expiryDate: "2023-11-20",
        quantity: 3,
        donarName: "Jane Donar",
        status: "pending",
        userId: "user456",
      },
      {
          key: "3",
          medicineName: "Medicine 4",
          expiryDate: "2023-11-20",
          quantity: 3,
          donarName: "Jane Donar",
          status: "pending",
          userId: "user456",
        },
        {
          key: "4",
          medicineName: "Medicine 4",
          expiryDate: "2023-11-20",
          quantity: 3,
          donarName: "Jane Donar",
          status: "pending",
          userId: "user456",
        },
        {
          key: "5",
          medicineName: "Medicine 4",
          expiryDate: "2023-11-20",
          quantity: 3,
          donarName: "Jane Donar",
          status: "pending",
          userId: "user456",
        },
  ]);

  const pageSize = 2;
  const [donatedCurrentPage, setDonatedCurrentPage] = useState(1);
  const [requestedCurrentPage, setRequestedCurrentPage] = useState(1);

  const columnsDonated = [
    // ... Donated columns
    {
        title: "Medicine Name",
        dataIndex: "medicineName",
        key: "medicineName",
      },
      {
        title: "Expiry Date",
        dataIndex: "expiryDate",
        key: "expiryDate",
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (text) => {
          let color = "";
          if (text === "pending") {
            color = "volcano";
          } else if (text === "accept") {
            color = "green";
          }
          return <Tag color={color}>{text.toUpperCase()}</Tag>;
        },
      },
  ];

  const columnsRequested = [
    {
        title: "Medicine Name",
        dataIndex: "medicineName",
        key: "medicineName",
      },
      {
        title: "Expiry Date",
        dataIndex: "expiryDate",
        key: "expiryDate",
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
      },
      {
        title: "Donar Name",
        dataIndex: "donarName",
        key: "donarName",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (text) => (
          <Tag color={text === "accept" ? "green" : "volcano"}>
            {text.toUpperCase()}
          </Tag>
        ),
      },
    {
      title: "Donar Information",
      key: "donarInfo",
      render: (text, record) =>
        record.status === "accept" ? (
          <Button type="link" onClick={() => showModal(record)}>
            Contact Donar
          </Button>
        ) : null,
    },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDonar, setSelectedDonar] = useState(null);

  const showModal = (record) => {
    setSelectedDonar(record);
    setModalVisible(true);
  };

  const hideModal = () => {
    setSelectedDonar(null);
    setModalVisible(false);
  };

  const handleDonatedPageChange = (page) => {
    setDonatedCurrentPage(page);
  };

  const handleRequestedPageChange = (page) => {
    setRequestedCurrentPage(page);
  };

  return (
    <div>
      <h2>Donated Medicines</h2>
      <Table
        dataSource={donatedMedicines.slice(
          (donatedCurrentPage - 1) * pageSize,
          donatedCurrentPage * pageSize
        )}
        columns={columnsDonated}
        pagination={false}
      />
      <Pagination
        current={donatedCurrentPage}
        total={donatedMedicines.length}
        pageSize={pageSize}
        onChange={handleDonatedPageChange}
        style={{ marginTop: 16, textAlign: "center" }}
      />
  <hr />
      <h2>Requested Accept Medicines</h2>
      <Table
        dataSource={requestedMedicines.slice(
          (requestedCurrentPage - 1) * pageSize,
          requestedCurrentPage * pageSize
        )}
        columns={columnsRequested}
        pagination={false}
      />
      <Pagination
        current={requestedCurrentPage}
        total={requestedMedicines.length}
        pageSize={pageSize}
        onChange={handleRequestedPageChange}
        style={{ marginTop: 16, textAlign: "center" }}
      />

      {/* Donar Information Modal */}
      <Modal
        title="Donar Information"
        visible={modalVisible}
        onCancel={hideModal}
        footer={null}
      >
        {selectedDonar && (
          <div>
            <p>
              <strong>Donar Name:</strong> {selectedDonar.donarName}
            </p>
            {selectedDonar.status === "accept" && (
              <div>
                <p>
                  <strong>Contact Email:</strong>{" "}
                  {selectedDonar.contactEmail}
                </p>
                <p>
                  <strong>Contact Phone:</strong>{" "}
                  {selectedDonar.contactPhone}
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default VerifMedStatus;
