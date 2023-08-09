// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { isExpired, decodeToken } from "react-jwt";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Tab, Tabs } from "react-bootstrap"; // Bootstrap Tabs
// import { Menu, Dropdown, Spin } from "antd"; // Ant Design Menu and Dropdown
// import { UserOutlined } from "@ant-design/icons";
// import AcceptanceForm from "./AcceptanceForm";
// import UnusedMedicineDonationForm from "./DonationForm";
// import ReactPaginate from "react-paginate";
// import Modal from "react-modal";
// import ProfileEdit from  './ProfileEdit'




// const { TabPane } = Tabs;

// function Dashboard() {
//   const history = useNavigate();
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [MedicineData, setMedicineData] = useState(null);
//   const [profileEditVisible, setProfileEditVisible] = useState(false); // State for controlling the profile edit modal
//   const [isMedicineDataLoading, setIsMedicineDataLoading] = useState(true); // State for controlling the medicine data loading

//   async function populateDashboard() {
//     const req = await fetch(serverAddress+"/api/dashboard", {
//       headers: {
//         "x-access-token": localStorage.getItem("token"),
//       },
//     });

//     const data = await req.json();
//     setLoggedInUser(data.user);
//   }

//   //fetching med records

//   async function populateMedicneData() {
//     try {
//       setIsMedicineDataLoading(true); // Set loading to true before fetching data
//       const req = await fetch(serverAddress+"/api/medicineRecord", {
//         headers: {
//           "x-access-token": localStorage.getItem("token"),
//         },
//       });
  
//       const data = await req.json();
//       console.log(data.DonationData);
//       setMedicineData(data.DonationData);
//     } catch (error) {
//       // Handle error here
//     } finally {
//       setIsMedicineDataLoading(false); // Set loading to false after fetching data (regardless of success or failure)
//     }
//   }




//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       const user = decodeToken(token);
//       console.log("user:", user);
//       if (!user) {
//         console.log("falseee!!!");
//         localStorage.removeItem("token");
//         history("./login");
//       } else {
//         populateDashboard();
//         console.log("data from api/dashbaord",loggedInUser)
        
//         populateMedicneData();
//         console.log("data from api/MedicneData",)

//       }
//     }else{
//       window.location.href = "/login";

//     }
//   }, []);

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     history("/login");
//   };
  
//   const menu = (
//     <Menu>
//       {/* Open profile edit modal */}
//       <Menu.Item key="1" onClick={() => setProfileEditVisible(true)}>
//         Update Profile
//       </Menu.Item>
//       <Menu.Item key="2" onClick={handleLogout}>
//         Logout
//       </Menu.Item>
//     </Menu>
//   );

//   const [listedMedicines, setListedMedicines] = useState([MedicineData]);


//   // Placeholder data for listed medicines

  
//   // Modals state and handlers
//   const [showAcceptMedicineModal, setShowAcceptMedicineModal] = useState(false);
//   const [showAcceptanceModal, setShowAcceptanceModal] = useState(false);
//   const [selectedMedicine, setSelectedMedicine] = useState(null);

//   const handleAcceptMedicine = (medicine) => {
//     setSelectedMedicine(medicine);
//     setShowAcceptMedicineModal(true);
//   };

//   const handleAcceptance = (medicine) => {
//     setSelectedMedicine(medicine);
//     setShowAcceptanceModal(true);
//   };



//   const [currentPage, setCurrentPage] = useState(0);
//   const itemsPerPage = 6;
//   const totalPages = Math.ceil(MedicineData.length / itemsPerPage);

//   const handlePaginate = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   const getCurrentItems = () => {
//     const startIndex = currentPage * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     return MedicineData.slice(startIndex, endIndex);
//   };


//   const modalStyle = {
//     overlay: {
//       zIndex: 9999,
//     },
//     content: {
//       width: "1000px", // Specify the desired width here
//       height: "600px", // Specify the desired height here
//       top: "50%",
//       left: "50%",
//       transform: "translate(-50%, -50%)",
//     },
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-md-3 bg-dark d-flex flex-column vh-100">
//           <Tabs
//             defaultActiveKey="listed-medicines"
//             id="sidebar-tabs"
//             className="d-flex justify-content-center align-items-center flex-grow-1 "
//           >
//             <Tab className="tab-item text-white" eventKey="listed-medicines" title="Listed Medicines" />
//             <Tab className="tab-item text-white" eventKey="accept-medicine" title="Accepted Medicines" />
//             <Tab className="tab-item text-white" eventKey="donated-medicine" title="Donated Medicines" />
//             <Tab className="tab-item text-white" eventKey="status-medicine" title="Verify Status of Acceptance Medicine" />
//           </Tabs>
//         </div>

//         <div className="col-md-9">
//         <header className="d-flex justify-content-between align-items-center mb-4 m-3">
//           <h1>Dashboard</h1>
//           <div>
//             <Dropdown overlay={menu} trigger={['click']}>
//               <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
//                 <UserOutlined style={{ cursor: "pointer" }} /> {loggedInUser?.name}
//               </a>
//             </Dropdown>
//           </div>
//         </header>

//         {/* Display Spin while loading MedicineData */}
//         {isMedicineDataLoading ? (
//             <div className="spinner-container">
//               <Spin size="large" />
//             </div>
//           ) : (
//             <div className="row justify-content-center mt-3">
//               {getCurrentItems().map((medicine) => (
//                 <div key={medicine.id} className="col-md-4 mb-3">
//                   <div className="card">
//                     <div className="card-body">
//                       <h5 className="card-title">{medicine.medicineName}</h5>
//                       <p className="card-text">Expiry Date: {medicine.expiryDate}</p>
//                       <p className="card-text">Donor Name: {medicine.donorName}</p>
//                       <div className="d-flex justify-content-between">
//                         <button
//                           className="btn btn-primary btn-sm med-btn"
//                           onClick={() => handleAcceptance(medicine)}
//                         >
//                           Accept
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* react-paginate */}
//           <div className="d-flex justify-content-center mt-3">
//             <ReactPaginate
//               previousLabel={"Previous"}
//               nextLabel={"Next"}
//               breakLabel={"..."}
//               breakClassName={"page-item break"}
//               breakLinkClassName={"page-link"}
//               pageCount={totalPages}
//               marginPagesDisplayed={2}
//               pageRangeDisplayed={5}
//               onPageChange={handlePaginate}
//               containerClassName={"pagination"}
//               pageClassName={"page-item"}
//               pageLinkClassName={"page-link"}
//               previousClassName={"page-item"}
//               previousLinkClassName={"page-link"}
//               nextClassName={"page-item"}
//               nextLinkClassName={"page-link"}
//               activeClassName={"active"}
//             />
//           </div>
//         </div>
//       </div>

//       <Modal
//         isOpen={showAcceptMedicineModal}
//         onRequestClose={() => setShowAcceptMedicineModal(false)}
//         style={modalStyle}
//       >
//         <UnusedMedicineDonationForm />
//       </Modal>

//       <Modal
//         isOpen={showAcceptanceModal}
//         onRequestClose={() => setShowAcceptanceModal(false)}
//         style={modalStyle}
//       >
//         <AcceptanceForm />
//       </Modal>

// {/* Profile Edit Modal */}
// <Modal
//         isOpen={profileEditVisible}
//         onRequestClose={() => setProfileEditVisible(false)}
//         style={{
//           overlay: {
//             zIndex: 9999,
//           },
//           content: {
//             width: "1000px",
//             height: "500px",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//           },
//         }}
//       >
//         <ProfileEdit />
//       </Modal>
//     </div>
//   );
// }

// export default Dashboard;







import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import AcceptedMedicineList from "./components/UserDashboard/AcceptedMedicineList";
import DonatedMedicineList from "./components/UserDashboard/DonatedMedicineList";
import VerifMedStatus from "./components/UserDashboard/VerifMedStatus";


import "bootstrap/dist/css/bootstrap.min.css";
import { Layout, Menu, Spin,Dropdown } from "antd"; // Ant Design components
import {
  UserOutlined,
  AppstoreAddOutlined,
  CheckSquareOutlined,
  MedicineBoxOutlined,
  VerifiedOutlined,
} from "@ant-design/icons"; // Ant Design icons
import AcceptanceForm from "./AcceptanceForm";
import UnusedMedicineDonationForm from "./DonationForm";
import ReactPaginate from "react-paginate";
import Modal from "react-modal";
import ProfileEdit from "./ProfileEdit";


const { Header, Content, Sider } = Layout;

function Dashboard() {
  const history = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [MedicineData, setMedicineData] = useState([]);
  const [profileEditVisible, setProfileEditVisible] = useState(false);
  const [isMedicineDataLoading, setIsMedicineDataLoading] = useState(true);
  const [showAcceptMedicineModal, setShowAcceptMedicineModal] = useState(false);
  const [showAcceptanceModal, setShowAcceptanceModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentTab, setCurrentTab] = useState("listed-medicines");
  const itemsPerPage = 6;
  const serverAddress= require('./serverAddress.js').serverAddress;

  async function populateDashboard() {
    const req = await fetch(serverAddress+"/api/dashboard", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const data = await req.json();
    setLoggedInUser(data.user);
  }

  //fetching med records

  async function populateMedicneData() {
    try {
      setIsMedicineDataLoading(true); // Set loading to true before fetching data
      const req = await fetch(serverAddress+"/api/medicineRecord", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
  
      const data = await req.json();
      console.log(data.DonationData);
      setMedicineData(data.DonationData);
    } catch (error) {
      // Handle error here
    } finally {
      setIsMedicineDataLoading(false); // Set loading to false after fetching data (regardless of success or failure)
    }
  }




  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = decodeToken(token);
      console.log("user:", user);
      if (!user) {
        console.log("falseee!!!");
        localStorage.removeItem("token");
        history("./login");
      } else {
        populateDashboard();
        console.log("data from api/dashbaord",loggedInUser)
        
        populateMedicneData();
        console.log("data from api/MedicneData",)

      }
    }else{
      window.location.href = "/login";

    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    history("/login");
  };
  
  const menu = (
    <Menu>
      {/* Open profile edit modal */}
      <Menu.Item key="1" onClick={() => setProfileEditVisible(true)}>
        Update Profile
      </Menu.Item>
      <Menu.Item key="2" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const [listedMedicines, setListedMedicines] = useState([MedicineData]);


  // Placeholder data for listed medicines

  
  const handleAcceptMedicine = (medicine) => {
    setSelectedMedicine(medicine);
    setShowAcceptMedicineModal(true);
  };

  const handleAcceptance = (medicine) => {
    setSelectedMedicine(medicine);
    setShowAcceptanceModal(true);
  };


  const totalPages = Math.ceil(MedicineData.length / itemsPerPage);

  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const sidebarMenu = [
    {
      key: "listed-medicines",
      icon: <MedicineBoxOutlined />,
      text: "Listed Medicines",
    },
    {
      key: "accept-medicine",
      icon: <CheckSquareOutlined />,
      text: "Accepted Medicines",
    },
    {
      key: "donated-medicine",
      icon: <AppstoreAddOutlined />,
      text: "Donated Medicines",
    },
    {
      key: "status-medicine",
      icon: <VerifiedOutlined />,
      text: "Verify Status of Acceptance Medicine",
    },
  ];

  const handlePaginate = ({ selected }) => {
    setCurrentPage(selected);
  };
  const toggleTab = (tabKey) => {
    setCurrentTab(tabKey);
  };

  const getCurrentItems = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return MedicineData.slice(startIndex, endIndex);
  };


  const modalStyle = {
    overlay: {
      zIndex: 9999,
    },
    content: {
      width: "1000px", // Specify the desired width here
      height: "600px", // Specify the desired height here
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  };
  
  const sidebarStyle = {
    height: "100vh",
    // position: "fixed",
    // left: 0,
    overflowX: "auto", // Enable vertical scrolling
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={250}
        theme="dark"
        collapsible
        collapsed={collapsed}
        onCollapse={toggleSidebar}
        style={sidebarStyle} // Apply the sidebar style here
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {sidebarMenu.map((item) => (
            <Menu.Item key={item.key} icon={item.icon} onClick={() => toggleTab(item.key)}>
              {item.text}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-header" style={{ padding: 0 }}>
          <div className="header-right">
            <Dropdown overlay={menu} trigger={['click']}>
              <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                Hey, {loggedInUser?.name}<UserOutlined style={{ cursor: "pointer" }} />
              </a>
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          {isMedicineDataLoading ? (
            <div className="spinner-container">
              <Spin size="large" />
            </div>
          ) : (
            <div>
              {currentTab === "listed-medicines" && (
                <div className="row justify-content-center mt-3">
                  {getCurrentItems().map((medicine) => (
                    <div key={medicine.id} className="col-md-4 mb-3">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">{medicine.medicineName}</h5>
                          <p className="card-text">Expiry Date: {medicine.expiryDate}</p>
                          <p className="card-text">Donor Name: {medicine.donorName}</p>
                          <div className="d-flex justify-content-between">
                            <button
                              className="btn btn-primary btn-sm med-btn"
                              onClick={() => handleAcceptance(medicine)}
                            >
                              Accept
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {currentTab === "accept-medicine" && <AcceptedMedicineList />}

              {currentTab === "donated-medicine" && (
                <div className="row justify-content-center mt-3">
                 < DonatedMedicineList />
                </div>
              )}

              {currentTab === "status-medicine" && (
                <div className="row justify-content-center mt-3">
                  <VerifMedStatus />
                </div>
              )}

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
            </div>
          )}

          <Modal
            isOpen={showAcceptMedicineModal}
            onRequestClose={() => setShowAcceptMedicineModal(false)}
            style={modalStyle}
          >
            <UnusedMedicineDonationForm />
          </Modal>

          <Modal
            isOpen={showAcceptanceModal}
            onRequestClose={() => setShowAcceptanceModal(false)}
            style={modalStyle}
          >
            <AcceptanceForm />
          </Modal>

          <Modal
            isOpen={profileEditVisible}
            onRequestClose={() => setProfileEditVisible(false)}
            style={{
              overlay: { zIndex: 9999 },
              content: {
                width: "1000px",
                height: "500px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              },
            }}
          >
            <ProfileEdit />
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
        }
export default Dashboard;
