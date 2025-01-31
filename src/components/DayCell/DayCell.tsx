import { format } from 'date-fns';
import { Cell, ScheduleItem, Time, ScheduleTitle, ScheduleDescription } from './styles';
import { DayCellProps } from './types';

const DayCell = ({ date, isCurrentMonth, hasSchedule, schedules, onDateClick }: DayCellProps) => {
  return (
    <Cell 
      isCurrentMonth={isCurrentMonth} 
      hasSchedule={hasSchedule}
      onClick={() => onDateClick?.(date)}
    >
      <span className="chonburi">{format(date, 'd')}</span>
      {schedules?.map((schedule, index) => (
        <ScheduleItem key={index}>
          <Time>{schedule.time}</Time>
          <ScheduleTitle>{schedule.title}</ScheduleTitle>
          {schedule.description && (
            <ScheduleDescription>{schedule.description}</ScheduleDescription>
          )}
        </ScheduleItem>
      ))}
    </Cell>
  );
};

export default DayCell; 