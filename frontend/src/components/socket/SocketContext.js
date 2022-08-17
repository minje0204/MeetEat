import { createContext, useContext } from "react";

const SocketContext = createContext({
  sendMessage: msg => {},
});

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  return context;
};

export const SocketContextProvider = ({ sendMessage, children }) => {
  return (
    <SocketContext.Provider
      value={{
        sendMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
