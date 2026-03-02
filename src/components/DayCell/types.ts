export interface Schedule {
  id?: string;
  time: string;
  title: string;
  description?: string;
  type: "training" | "match";
  month: string;
  date: string;
}

export interface DayCellProps {
  isCurrentMonth: boolean;
  hasSchedule: boolean;
  date: Date;
  schedules?: Schedule[];
  onDateClick?: (date: Date) => void;
}
