import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { DaySchedules } from "../data/schedules";
import { Schedule } from "../components/DayCell/types";

interface SchedulesContextValue {
  schedules: DaySchedules;
  addSchedule: (date: string, schedule: Schedule) => void;
  updateSchedule: (date: string, index: number, schedule: Schedule) => void;
  deleteSchedule: (date: string, index: number) => void;
}

const SchedulesContext = createContext<SchedulesContextValue | undefined>(
  undefined
);

interface SchedulesProviderProps {
  children: ReactNode;
}

export const SchedulesProvider = ({ children }: SchedulesProviderProps) => {
  const [schedules, setSchedules] = useState<DaySchedules>(() => {
    const saved = localStorage.getItem("schedules");
    return saved ? (JSON.parse(saved) as DaySchedules) : {};
  });

  useEffect(() => {
    localStorage.setItem("schedules", JSON.stringify(schedules));
  }, [schedules]);

  const addSchedule = (date: string, schedule: Schedule) => {
    setSchedules((prev) => ({
      ...prev,
      [date]: [...(prev[date] || []), schedule],
    }));
  };

  const updateSchedule = (date: string, index: number, schedule: Schedule) => {
    setSchedules((prev) => ({
      ...prev,
      [date]: prev[date].map((item, i) => (i === index ? schedule : item)),
    }));
  };

  const deleteSchedule = (date: string, index: number) => {
    setSchedules((prev) => ({
      ...prev,
      [date]: prev[date].filter((_, i) => i !== index),
    }));
  };

  return (
    <SchedulesContext.Provider
      value={{ schedules, addSchedule, updateSchedule, deleteSchedule }}
    >
      {children}
    </SchedulesContext.Provider>
  );
};

export const useSchedules = (): SchedulesContextValue => {
  const context = useContext(SchedulesContext);
  if (!context) {
    throw new Error("useSchedules must be used within a SchedulesProvider");
  }
  return context;
};
