import { useCallback } from 'react';
import { setMonth, format } from 'date-fns';
import html2canvas from 'html2canvas';
import { SelectorContainer, Select, SaveButton } from './styles';

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

interface MonthSelectorProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

const MonthSelector = ({ currentDate, setCurrentDate }: MonthSelectorProps) => {
  const handleMonthChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(event.target.value);
    setCurrentDate(setMonth(currentDate, newMonth));
  }, [currentDate, setCurrentDate]);

  const handleSave = useCallback(async () => {
    const calendarSection = document.querySelector('.calendar-section');
    if (!calendarSection) return;

    try {
      const canvas = await html2canvas(calendarSection as HTMLElement, {
        scale: 2, // 더 높은 해상도
        backgroundColor: '#002B5B',
      });
      
      const link = document.createElement('a');
      link.download = `calendar-${format(currentDate, 'yyyy-MM')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to save calendar:', error);
    }
  }, [currentDate]);

  return (
    <SelectorContainer>
      <Select 
        value={currentDate.getMonth()} 
        onChange={handleMonthChange}
      >
        {months.map((month, index) => (
          <option key={month} value={index}>
            {month}
          </option>
        ))}
      </Select>
      <SaveButton onClick={handleSave}>
        Save as PNG
      </SaveButton>
    </SelectorContainer>
  );
};

export default MonthSelector; 