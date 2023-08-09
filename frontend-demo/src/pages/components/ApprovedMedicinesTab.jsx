import React from 'react';
import { Table, Tag } from 'antd';

const ApprovedMedicinesTab = ({ approvedMedicines }) => {
  const columns = [
    {
      title: 'Medicine Name',
      dataIndex: 'medicineName',
      key: 'medicineName',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color="success">{status}</Tag>
      ),
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'User Email',
      dataIndex: 'userEmail',
      key: 'userEmail',
    },
    {
      title: 'User Phone Number',
      dataIndex: 'userPhone',
      key: 'userPhone',
    },
    {
      title: 'User Address',
      dataIndex: 'userAddress',
      key: 'userAddress',
    },
    {
      title: 'Medicine Quantity',
      dataIndex: 'medicineQuantity',
      key: 'medicineQuantity',
    },
    // Add more columns as needed...
  ];

  // Dummy data for approved medicines
  const dummyApprovedMedicines = [
    {
      id: 1,
      medicineName: 'Medicine A',
      status: 'Accepted',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      userPhone: '123-456-7890',
      userAddress: '123 Main St, City',
      medicineQuantity: 5,
    },
    {
      id: 2,
      medicineName: 'Medicine B',
      status: 'Accepted',
      userName: 'Jane Smith',
      userEmail: 'jane@example.com',
      userPhone: '987-654-3210',
      userAddress: '456 Elm St, Town',
      medicineQuantity: 10,
    },
    // Add more approved medicines...
  ];

  return (
    <div>
      <h2>Approved Medicines</h2>
      <Table
        dataSource={approvedMedicines || dummyApprovedMedicines}
        columns={columns}
        pagination={false}
        rowKey="id"
      />
    </div>
  );
};

export default ApprovedMedicinesTab;
