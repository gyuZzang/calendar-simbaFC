import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { DaySchedules } from "../data/schedules";
import { Schedule } from "../components/DayCell/types";
import {
  useAddSchedule,
  useSchedules as useDefaultSchedules,
  useDeleteSchedule,
  useUpdateSchedule,
} from "../hooks/useSchedules";

interface SchedulesContextValue {
  schedules: DaySchedules;
  addSchedule: (date: string, schedule: Schedule) => void;
  updateSchedule: (date: string, id: string, schedule: Schedule) => void;
  deleteSchedule: (date: string, id: string) => void;
}

const SchedulesContext = createContext<SchedulesContextValue | undefined>(
  undefined
);

interface SchedulesProviderProps {
  children: ReactNode;
}

const parseSchedules = (schedules: Schedule[]): DaySchedules => {
  return schedules.reduce((acc: DaySchedules, schedule) => {
    acc[schedule.date] = [...(acc[schedule.date] || []), schedule];
    return acc;
  }, {});
};

export const SchedulesProvider = ({ children }: SchedulesProviderProps) => {
  const { schedules: defaultSchedules } = useDefaultSchedules();

  const [schedules, setSchedules] = useState<DaySchedules>({});
  const { addSchedule: addScheduleDB } = useAddSchedule();
  const { updateSchedule: updateScheduleDB } = useUpdateSchedule();
  const { deleteSchedule: deleteScheduleDB } = useDeleteSchedule();

  useEffect(() => {
    if (defaultSchedules?.length > 0) {
      setSchedules(parseSchedules(defaultSchedules));
    }
  }, [defaultSchedules]);

  const addSchedule = (date: string, schedule: Schedule) => {
    setSchedules((prev) => ({
      ...prev,
      [date]: [...(prev[date] || []), schedule],
    }));
    addScheduleDB(schedule);
  };

  const updateSchedule = (date: string, id: string, schedule: Schedule) => {
    setSchedules((prev) => ({
      ...prev,
      [date]: prev[date].map((item) => (item.id === id ? schedule : item)),
    }));
    updateScheduleDB(id, schedule);
  };

  const deleteSchedule = (date: string, id: string) => {
    setSchedules((prev) => ({
      ...prev,
      [date]: prev[date].filter((item) => item.id !== id),
    }));
    deleteScheduleDB(id);
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
