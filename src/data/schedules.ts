import { Schedule } from '../components/DayCell/types';

interface DaySchedules {
  [key: string]: Schedule[];
}

export const schedules: DaySchedules = {
  '2025-02-01': [
    {
      time: '14:00',
      title: '정기훈련',
      type: 'training'
    },
    {
      time: '18:00',
      title: '친선 매치',
      description: 'w/SC 우먼',
      type: 'match'
    }
  ],
  '2025-02-08': [
    {
      time: '14:00',
      title: '정기훈련',
      type: 'training'
    }
  ],
  '2025-02-15': [
    {
      time: '14:00',
      title: '정기훈련',
      type: 'training'
    }
  ],
  '2025-02-22': [
    {
      time: '14:00',
      title: '정기훈련',
      type: 'training'
    }
  ],
  '2025-02-23': [
    {
      time: '12:00',
      title: '친선 매치',
      description: 'w/종로 여축',
      type: 'match'
    }
  ]
}; 