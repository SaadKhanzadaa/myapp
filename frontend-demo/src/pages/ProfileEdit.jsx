import '../FormStyle.css'; 
import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, Popover, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import '../FormStyle.css'; 

const ProfileEdit = () => {
  const initialData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    address: '1234 Elm Street',
    city: 'Springfield',
    state: 'IL',
    zip: '12345',
    // Add more fields...
  };

  const [formData, setFormData] = useState(initialData);
  const [editMode, setEditMode] = useState({});

  const toggleEditMode = (field) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [field]: !prevEditMode[field],
    }));
  };

  const handleChange = (e, field) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSave = (field) => {
    toggleEditMode(field);
    message.success(`Updated ${field} successfully!`);
  };

  const renderEditInfo = (field) => (
    <div>
      {editMode[field] ? (
        <span>Press Enter to save changes</span>
      ) : (
        <span>Click the edit icon to start editing</span>
      )}
    </div>
  );

  return (
    <Row justify="center">
      <Col span={12}>
        <div className="profile-box">
          <h2>Edit Profile</h2>
          <Form layout="vertical">
            {Object.keys(initialData).map((field) => (
              <Form.Item label={field} key={field}>
                <div className="profile-field">
                  <Popover content={renderEditInfo(field)}>
                    <Input
                      name={field}
                      value={formData[field]}
                      readOnly={!editMode[field]}
                      onChange={(e) => handleChange(e, field)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          toggleEditMode(field);
                        }
                      }}
                      addonAfter={
                        <Popover content="Edit">
                          <EditOutlined
                            onClick={() => toggleEditMode(field)}
                          />
                        </Popover>
                      }
                    />
                  </Popover>
                  {editMode[field] && (
                    <Button
                      type="link"
                      onClick={() => handleSave(field)}
                      className="edit-save-button"
                    >
                      Save
                    </Button>
                  )}
                </div>
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="primary"
                block  
                onClick={() => console.log('Updated Profile:', formData)}
              >
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default ProfileEdit;
