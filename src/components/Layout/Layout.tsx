import { Container, CalendarSection, SideSection } from "./styles";
import Calendar from "../Calendar";
import MonthSelector from "../MonthSelector/MonthSelector";
import ScheduleEditor from "../ScheduleEditor/ScheduleEditor";

const Layout = () => {
  return (
    <Container>
      <CalendarSection className="calendar-section">
        <Calendar />
      </CalendarSection>
      <SideSection>
        <MonthSelector />
        <ScheduleEditor />
      </SideSection>
    </Container>
  );
};

export default Layout;