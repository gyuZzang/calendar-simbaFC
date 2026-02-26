export interface Schedule {
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
