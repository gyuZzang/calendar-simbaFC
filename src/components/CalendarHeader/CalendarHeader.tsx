import { format } from 'date-fns';
import { Header, Title, SubTitle, Logo } from './styles';

interface CalendarHeaderProps {
  currentDate: Date;
}

const CalendarHeader = ({ currentDate }: CalendarHeaderProps) => {
  return (
    <Header>
      <Title>
        <SubTitle>SCHEDULE</SubTitle>
        {format(currentDate, 'yyyy MMM.').toUpperCase()}
      </Title>
      <Logo src="/logo.png" alt="Simba FC Logo" />
    </Header>
  );
};

export default CalendarHeader; 