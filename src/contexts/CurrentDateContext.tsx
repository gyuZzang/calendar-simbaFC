import { createContext, useContext, useState, ReactNode } from "react";

interface CurrentDateContextValue {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

const CurrentDateContext = createContext<CurrentDateContextValue | undefined>(
  undefined
);

interface CurrentDateProviderProps {
  children: ReactNode;
}

export const CurrentDateProvider = ({ children }: CurrentDateProviderProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <CurrentDateContext.Provider value={{ currentDate, setCurrentDate }}>
      {children}
    </CurrentDateContext.Provider>
  );
};

export const useCurrentDate = (): CurrentDateContextValue => {
  const context = useContext(CurrentDateContext);
  if (!context) {
    throw new Error("useCurrentDate must be used within a CurrentDateProvider");
  }
  return context;
};

