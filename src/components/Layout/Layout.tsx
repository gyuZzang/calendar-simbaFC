import { Container, CalendarSection, SideSection } from './styles';
import Calendar from '../Calendar';
import MonthSelector from '../MonthSelector/MonthSelector';

interface LayoutProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

const Layout = ({ currentDate, setCurrentDate }: LayoutProps) => {
  return (
    <Container>
      <CalendarSection className="calendar-section">
        <Calendar currentDate={currentDate} />
      </CalendarSection>
      <SideSection>
        <MonthSelector currentDate={currentDate} setCurrentDate={setCurrentDate} />
      </SideSection>
    </Container>
  );
};

export default Layout; 