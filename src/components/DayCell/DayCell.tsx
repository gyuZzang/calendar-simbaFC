import { format } from 'date-fns';
import { DayCellProps } from './types';
import { Cell, ScheduleItem, Time, ScheduleTitle, ScheduleDescription } from './styles';

const DayCell = ({ date, isCurrentMonth, hasSchedule, schedules }: DayCellProps) => {
  return (
    <Cell isCurrentMonth={isCurrentMonth} hasSchedule={hasSchedule}>
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