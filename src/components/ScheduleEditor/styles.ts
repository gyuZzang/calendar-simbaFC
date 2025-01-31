import styled from 'styled-components';

export const EditorContainer = styled.div`
  margin-top: 40px;
  width: 100%;
  max-width: 400px;
`;

export const DateTitle = styled.h3`
  font-size: 24px;
  color: #002B5B;
  margin-bottom: 20px;
`;

export const ScheduleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ScheduleItem = styled.div`
  background: white;
  color: black;
  padding: 16px;
  border-radius: 12px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`;

export const Time = styled.span`
  font-weight: 500;
`;

export const Title = styled.span`
  margin-left: 12px;
  font-weight: 500;
`;

export const Description = styled.p`
  margin-top: 8px;
  font-size: 14px;
`;

export const NoSchedule = styled.p`
  color: #666;
  font-style: italic;
`;

export const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #002B5B;
  border-radius: 4px;
  font-size: 14px;
`;

export const Select = styled.select`
  padding: 8px;
  border: 1px solid #002B5B;
  border-radius: 4px;
  font-size: 14px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  height: 24px;
  margin-left: auto;
`;

export const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
`;

export const SaveButton = styled(Button)`
  background-color: #002B5B;
  color: white;
`;

export const CancelButton = styled(Button)`
  background-color: #f5f5f5;
  color: #002B5B;
`;

export const EditButton = styled(Button)`
  background-color: #f5f5f5;
  color: #002B5B;
  margin-left: auto;
`;

export const ScheduleContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const AddButtonContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
`;

export const IconButton = styled.button<{ danger?: boolean; success?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background-color: ${props => 
    props.danger ? '#fee2e2' : 
    props.success ? '#dcfce7' : 
    '#f3f4f6'};
  color: ${props => 
    props.danger ? '#dc2626' : 
    props.success ? '#16a34a' : 
    '#4b5563'};
  transition: all 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background-color: #002B5B;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const DeleteButton = styled(Button)`
  background-color: #dc3545;
  color: white;
`; 