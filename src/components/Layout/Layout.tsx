import { Container, CalendarSection, SideSection } from './styles';
import Calendar from '../Calendar';
import MonthSelector from '../MonthSelector/MonthSelector';
import { DaySchedules } from '../../data/schedules';
import { Schedule } from '../DayCell/types';
import ScheduleEditor from '../ScheduleEditor/ScheduleEditor';

interface LayoutProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  schedules: DaySchedules;
  onAddSchedule: (date: string, schedule: Schedule) => void;
  onUpdateSchedule: (date: string, index: number, schedule: Schedule) => void;
  onDeleteSchedule: (date: string, index: number) => void;
}

const Layout = ({ currentDate, setCurrentDate, schedules, onAddSchedule, onUpdateSchedule, onDeleteSchedule }: LayoutProps) => {
  return (
    <Container>
      <CalendarSection className="calendar-section">
        <Calendar 
          currentDate={currentDate} 
          schedules={schedules}
          onDateSelect={setCurrentDate}
        />
      </CalendarSection>
      <SideSection>
        <MonthSelector currentDate={currentDate} setCurrentDate={setCurrentDate} />
        <ScheduleEditor 
          currentDate={currentDate} 
          schedules={schedules} 
          onUpdateSchedule={onUpdateSchedule}
          onAddSchedule={onAddSchedule}
          onDeleteSchedule={onDeleteSchedule}
        />
      </SideSection>
    </Container>
  );
};

export default Layout; 