import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const showSuccessMessage = (msg) => {
    toast.dismiss();
    toast.success(msg, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000, //3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    
    });

}


  export const showErrorMessage = (msg) => {
    toast.dismiss();
    toast.error(msg, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000, //3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    
    });

}


  export const showInfoMessage = (msg) => {
    toast.dismiss();
    toast.info(msg, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000, //3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    
    });

}
// export default{showSuccessMessage,showErrorMessage,showInfoMessage}