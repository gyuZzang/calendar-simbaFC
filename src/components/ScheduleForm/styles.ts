import styled from 'styled-components';

export const FormContainer = styled.div`
  margin-top: 40px;
  padding: 24px;
  background: white;
  border-radius: 16px;
`;

export const FormTitle = styled.h3`
  font-size: 24px;
  color: #002B5B;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 16px;
  color: #002B5B;
`;

export const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #002B5B;
  font-size: 16px;
`;

export const Select = styled.select`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #002B5B;
  font-size: 16px;
`;

export const SubmitButton = styled.button`
  padding: 12px;
  background: #002B5B;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`; 