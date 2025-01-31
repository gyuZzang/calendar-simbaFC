export interface Schedule {
  time: string;
  title: string;
  description?: string;
  type: 'training' | 'match';
}

export interface DayCellProps {
  isCurrentMonth: boolean;
  hasSchedule: boolean;
  date: Date;
  schedules?: Schedule[];
} 