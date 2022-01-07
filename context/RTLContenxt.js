import { createContext } from "react";

const RTLContenxt = createContext();

const RTLProvider = ({ children, isRTL }) => {
  return (
    <RTLContenxt.Provider value={{ isRTL: isRTL }}>
      {children}
    </RTLContenxt.Provider>
  );
};

export { RTLProvider, RTLContenxt };
