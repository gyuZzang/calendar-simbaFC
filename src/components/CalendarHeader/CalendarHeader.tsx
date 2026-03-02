import { format } from "date-fns";
import { Header, Title, SubTitle, Logo } from "./styles";
import { useCurrentDate } from "../../contexts/CurrentDateContext";
import logo from "/logo.png";

const CalendarHeader = () => {
  const { currentDate } = useCurrentDate();
  return (
    <Header>
      <Title>
        <SubTitle>SCHEDULE</SubTitle>
        {format(currentDate, "yyyy MMM.").toUpperCase()}
      </Title>
      <Logo src={logo} alt="Simba FC Logo" />
    </Header>
  );
};

export default CalendarHeader;
