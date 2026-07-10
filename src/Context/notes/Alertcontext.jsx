import React, { createContext, useContext } from "react";
import Swal from "sweetalert2";

// 1. Create Context
const Alertcontext = createContext();

// 2. Provider
export const AlertProvider = ({ children }) => {


// showDeleteAlert
  const showDeleteAlert = async () => {
    return await Swal.fire({
      title: "Delete Note?",
      text: "This note will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
  };

  return (
    <Alertcontext.Provider value={{  showDeleteAlert }}>
      {children}
    </Alertcontext.Provider>
  );
};

// 3. Custom Hook
export const useAlert = () => {
  return useContext(Alertcontext);
};

// 4. Default export (optional)`
export default Alertcontext;