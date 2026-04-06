export interface Schedule {
  id?: string;
  time: string;
  title: string;
  description?: string;
  type: ScheduleType;
  month: string;
  date: string;
}

export type ScheduleType = "training" | "match" | "birthday" | "other";

export interface DayCellProps {
  isCurrentMonth: boolean;
  hasSchedule: boolean;
  date: Date;
  schedules?: Schedule[];
  onDateClick?: (date: Date) => void;
}
