import { useState } from 'react';
import { format } from 'date-fns';
import {
  FormContainer,
  FormTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Select,
  SubmitButton
} from './styles';

interface ScheduleFormProps {
  currentDate: Date;
  onAddSchedule: (date: string, schedule: {
    time: string;
    title: string;
    description?: string;
    type: 'training' | 'match';
  }) => void;
}

const ScheduleForm = ({ currentDate, onAddSchedule }: ScheduleFormProps) => {
  const [selectedDay, setSelectedDay] = useState('1');
  const [time, setTime] = useState('14:00');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'training' | 'match'>('training');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const dateStr = format(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(selectedDay)),
      'yyyy-MM-dd'
    );

    onAddSchedule(dateStr, {
      time,
      title,
      description: description || undefined,
      type
    });

    // Reset form
    setTitle('');
    setDescription('');
  };

  // 현재 월의 날짜 옵션 생성
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  return (
    <FormContainer>
      <FormTitle>Add New Schedule</FormTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Day</Label>
          <Select 
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Time</Label>
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Type</Label>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value as 'training' | 'match')}
          >
            <option value="training">Training</option>
            <option value="match">Match</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Schedule title"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Description (Optional)</Label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Additional details"
          />
        </FormGroup>
        <SubmitButton type="submit">Add Schedule</SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default ScheduleForm; 