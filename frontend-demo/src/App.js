import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './pages/LoginForm'; // Replace './LoginForm' with the correct path to your LoginForm component
import RegistrationForm from './pages/RegisterForm';
import Dashbaord from './pages/Dashbaord';
import Main from './pages/main'
import UnusedMedicineDonationForm from './pages/DonationForm';
import AcceptanceForm from './pages/AcceptanceForm';
import AdminDashboard from './pages/AdminDashboard';
import ProfileEdit from './pages/ProfileEdit';
import "./FormStyle.css";
<link
  href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
  rel="stylesheet"
/>

// import 'antd/dist/antd.css';


function App() {
  return (
    <>

    <Router>
      <Routes>
      <Route exact path="/" element={<Main />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path='/signup' element={<RegistrationForm />} />
        <Route path='/dashbaord' element={<Dashbaord />} />
        <Route path='/donation' element={<UnusedMedicineDonationForm />} />
        <Route path='/acceptance' element={<AcceptanceForm />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/profile' element={<ProfileEdit />} />
      </Routes>
    </Router>
    </>

  );
}

export default App;