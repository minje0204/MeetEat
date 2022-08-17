import { createContext, useContext, useState } from "react";

const ConferenceContext = createContext({
  userName: String,
  roomTitle: String,
});

export const useConferenceContext = () => {
  const context = useContext(ConferenceContext);
  return context;
};

export const ConferenceContextProvider = ({ name, title, children }) => {
  const [userName, _] = useState(name);
  const [roomTitle, __] = useState(title);
  return (
    <ConferenceContext.Provider
      value={{
        userName,
        roomTitle,
      }}
    >
      {children}
    </ConferenceContext.Provider>
  );
};
