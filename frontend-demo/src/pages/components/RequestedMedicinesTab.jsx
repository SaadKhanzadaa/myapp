// import React from 'react';
// import { Table, Tag, Button, Modal } from 'antd';
// import { InfoCircleOutlined } from '@ant-design/icons';

// const RequestedMedicinesTab = ({
//   requestedMedicines,
//   handleStatusChange,
//   handleViewDetails,
// }) => {
//   const columns = [
//     {
//       title: 'Medicine Name',
//       dataIndex: 'medicineName',
//       key: 'medicineName',
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => (
//         <Tag color={status === 'Pending' ? 'warning' : status === 'Accepted' ? 'success' : 'error'}>
//           {status}
//         </Tag>
//       ),
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (text, record) => (
//         <span>
//           <Button type="link" onClick={() => handleViewDetails(record.id)}>
//             <InfoCircleOutlined /> View Details
//           </Button>
//           <Button
//             type="primary"
//             onClick={() => handleStatusChange(record.id, 'Accepted')}
//             disabled={record.status === 'Accepted'}
//           >
//             Accept
//           </Button>
//           <Button
//             type="danger"
//             onClick={() => handleStatusChange(record.id, 'Rejected')}
//             disabled={record.status === 'Rejected'}
//           >
//             Reject
//           </Button>
//         </span>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <h2>Requested Medicines</h2>
//       <Table
//         dataSource={requestedMedicines}
//         columns={columns}
//         pagination={false}
//         rowKey="id"
//       />
//     </div>
//   );
// };

// export default RequestedMedicinesTab;
// import React, { useState } from 'react';
// import { Table, Tag, Button, Modal, Select, message } from 'antd';
// import { InfoCircleOutlined } from '@ant-design/icons';

// const { Option } = Select;

// const RequestedMedicinesTab = ({
//   requestedMedicines,
//   handleStatusChange,
//   handleViewDetails,
// }) => {
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [statusToUpdate, setStatusToUpdate] = useState('');
//   const [updatedStatus, setUpdatedStatus] = useState({});

//   const columns = [
//     {
//       title: 'Medicine Name',
//       dataIndex: 'medicineName',
//       key: 'medicineName',
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status, record) => (
//         <span>
//           {record.id === selectedRow ? (
//             <Select
//               value={statusToUpdate}
//               style={{ width: 120 }}
//               onChange={(value) => setStatusToUpdate(value)}
//             >
//               <Option value="">Select Status</Option>
//               <Option value="Pending">Pending</Option>
//               <Option value="Accepted">Accepted</Option>
//               <Option value="Rejected">Rejected</Option>
//             </Select>
//           ) : (
//             <Tag color={updatedStatus[record.id] || status === 'Pending' ? 'warning' : status === 'Accepted' ? 'success' : 'error'}>
//               {updatedStatus[record.id] || status}
//             </Tag>
//           )}
//         </span>
//       ),
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (text, record) => (
//         <span>
//           <Button type="link" onClick={() => handleViewDetails(record.id)}>
//             <InfoCircleOutlined /> View Details
//           </Button>
//           {record.id === selectedRow ? (
//             <Button type="primary" onClick={() => handleStatusUpdate(record.id)}>
//               Update
//             </Button>
//           ) : (
//             <Button type="primary" onClick={() => setSelectedRow(record.id)}>
//               Update Status
//             </Button>
//           )}
//         </span>
//       ),
//     },
//   ];

//   const handleStatusUpdate = (id) => {
//     if (!statusToUpdate) {
//       message.error('Please select a new status.');
//       return;
//     }

//     handleStatusChange(id, statusToUpdate);

//     const updatedMedicines = requestedMedicines.map((medicine) =>
//       medicine.id === id ? { ...medicine, status: statusToUpdate } : medicine
//     );

//     setSelectedRow(null);
//     setStatusToUpdate('');
//     setUpdatedStatus((prevStatus) => ({
//       ...prevStatus,
//       [id]: statusToUpdate,
//     }));

//     message.success('Status updated successfully.');
//   };

//   return (
//     <div>
//       <h2>Requested Medicines</h2>
//       <Table
//         dataSource={requestedMedicines}
//         columns={columns}
//         pagination={false}
//         rowKey="id"
//       />
//     </div>
//   );
// };

// export default RequestedMedicinesTab;
import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Modal, Select, message } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const RequestedMedicinesTab = ({
  requestedMedicines,
  handleStatusChange,
  handleViewDetails,
}) => {
  const [statusToUpdate, setStatusToUpdate] = useState({});
  const [updatedStatus, setUpdatedStatus] = useState({});
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);

  useEffect(() => {
    initializeStatus();
  }, []);

  const initializeStatus = () => {
    const initialStatus = {};
    const updatedStatusMap = {};
    requestedMedicines.forEach((medicine) => {
      initialStatus[medicine.id] = 'Rejected';
      updatedStatusMap[medicine.id] = 'Rejected';
    });
    setStatusToUpdate(initialStatus);
    setUpdatedStatus(updatedStatusMap);
  };

  const columns = [
    {
      title: 'Medicine Name',
      dataIndex: 'medicineName',
      key: 'medicineName',
    },
    {
      title: 'Status',
      dataIndex: 'id',
      key: 'status',
      render: (id) => (
        <Tag color={getColorByStatus(updatedStatus[id])}>
          {updatedStatus[id]}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleViewDetailsPopup(record.id)}>
            <InfoCircleOutlined /> View Details
          </Button>
          <Select
            value={statusToUpdate[record.id] || ''}
            onChange={(value) => handleStatusChangeUpdate(record.id, value)}
            style={{ width: 120 }}
            placeholder="Select option"
          >
            <Option value="Pending">Pending</Option>
            <Option value="Accepted">Accept</Option>
            <Option value="Rejected">Reject</Option>
          </Select>
          <Button
            type="primary"
            onClick={() => handleStatusUpdate(record.id)}
            disabled={statusToUpdate[record.id] === updatedStatus[record.id]}
          >
            Update
          </Button>
        </span>
      ),
    },
  ];

  const getColorByStatus = (status) => {
    if (status === 'Pending') return 'warning';
    if (status === 'Accepted') return 'success';
    if (status === 'Rejected') return 'error';
    return '';
  };

  const handleStatusChangeUpdate = (id, value) => {
    const updatedStatusMap = { ...statusToUpdate };
    updatedStatusMap[id] = value;
    setStatusToUpdate(updatedStatusMap);
  };

  const handleStatusUpdate = (id) => {
    handleStatusChange(id, statusToUpdate[id]);
    const newUpdatedStatus = { ...updatedStatus };
    newUpdatedStatus[id] = statusToUpdate[id];
    setUpdatedStatus(newUpdatedStatus);
    message.success(`Status updated to ${statusToUpdate[id]}`);
  };

  const handleViewDetailsPopup = (id) => {
    setSelectedMedicine(requestedMedicines.find((medicine) => medicine.id === id));
    setDetailsModalVisible(true);
  };

  const closeDetailsPopup = () => {
    setDetailsModalVisible(false);
  };

  const userColumns = [
    {
      title: 'User Information',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: 'Details',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  const userDataSource = selectedMedicine
    ? [
        { key: '1', label: 'User Name', value: selectedMedicine.userName },
        { key: '2', label: 'User Email', value: selectedMedicine.userEmail },
        { key: '3', label: 'Age', value: selectedMedicine.userAge },
        { key: '4', label: 'Gender', value: selectedMedicine.userGender },
        // Add more user details...
      ]
    : [];

  const medicineColumns = [
    {
      title: 'Medicine Information',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: 'Details',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  const medicineDataSource = selectedMedicine
    ? [
        { key: '1', label: 'Medicine Name', value: selectedMedicine.medicineName },
        { key: '2', label: 'Medicine Status', value: updatedStatus[selectedMedicine.id] },
        { key: '3', label: 'Medicine Quantity', value: selectedMedicine.medicineQuantity },
        // Add more medicine details...
      ]
    : [];

  return (
    <div>
      <h2>Requested Medicines</h2>
      <Table
        dataSource={requestedMedicines}
        columns={columns}
        pagination={false}
        rowKey="id"
      />
      <Modal
        visible={detailsModalVisible}
        onCancel={closeDetailsPopup}
        footer={null}
        destroyOnClose
        width="80%"
      >
        {selectedMedicine && (
          <div>
            <h2>Medicine Details</h2>
            <Table
              dataSource={userDataSource}
              columns={userColumns}
              pagination={false}
            />
            <Table
              dataSource={medicineDataSource}
              columns={medicineColumns}
              pagination={false}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RequestedMedicinesTab;
