import styled from 'styled-components';

export const Cell = styled.div<{ isCurrentMonth: boolean; hasSchedule: boolean }>`
  padding: 12px;
  border-radius: 24px;
  background-color: ${props => props.hasSchedule ? '#002B5B' : 'transparent'};
  color: ${props => {
    if (!props.isCurrentMonth) return '#ccc';
    return props.hasSchedule ? '#fff' : '#002B5B';
  }};
  font-size: 24px;
  font-weight: bold;
  height: 100%;

  .chonburi {
    font-family: "Chonburi", serif;
  }
`;

export const ScheduleItem = styled.div`
  margin-top: 4px;
  font-size: 16px;
  line-height: 1.2;
`;

export const Time = styled.span`
  color: #FFD700;
  font-weight: 500;
`;

export const ScheduleTitle = styled.span`
  font-weight: 600;
  color: white;
  margin-left: 4px;
`;

export const ScheduleDescription = styled.div`
  font-size: 14px;
  color: #8899aa;
  margin-top: 2px;
  margin-left: 32px;
`; 