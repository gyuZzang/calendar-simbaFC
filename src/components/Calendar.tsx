import styled from 'styled-components';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
} from 'date-fns';
import DayCell from './DayCell/DayCell';
import CalendarHeader from './CalendarHeader/CalendarHeader';
import { schedules } from '../data/schedules';

const CalendarContainer = styled.div`
  width: 1080px;
  height: 1350px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const CalendarGrid = styled.div`
  background-color: #ffffff;
  border-radius: 32px;
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const WeekdayHeader = styled.div`
  font-family: "Chonburi", serif;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 10px;
  height: 60px;
`;

const WeekdayCell = styled.div`
  text-align: center;
  padding: 10px;
  font-size: 24px;
  color: #002B5B;
  font-weight: bold;
`;

const DayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 2px;
  flex: 1;
`;


interface CalendarProps {
  currentDate: Date;
}

const Calendar = ({ currentDate }: CalendarProps) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  }).slice(0, 35);

  return (
    <CalendarContainer>
      <CalendarHeader currentDate={currentDate} />
      <CalendarGrid>
        <WeekdayHeader>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <WeekdayCell key={day}>{day}</WeekdayCell>
          ))}
        </WeekdayHeader>
        <DayGrid>
          {calendarDays.map((day) => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const daySchedules = schedules[dateStr];
            
            return (
              <DayCell
                key={day.toString()}
                date={day}
                isCurrentMonth={isSameMonth(day, currentDate)}
                hasSchedule={!!daySchedules}
                schedules={daySchedules}
              />
            );
          })}
        </DayGrid>
      </CalendarGrid>
    </CalendarContainer>
  );
};

export default Calendar; 