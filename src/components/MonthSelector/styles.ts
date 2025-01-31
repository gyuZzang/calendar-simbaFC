import styled from 'styled-components';

export const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Select = styled.select`
  padding: 16px 32px;
  font-size: 24px;
  border-radius: 16px;
  background-color: white;
  border: none;
  color: #002B5B;
  font-family: "Chonburi", serif;
  cursor: pointer;

  text-orientation: mixed;
  appearance: none;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
  }

  option {
    writing-mode: horizontal-tb;
  }
`;

export const SaveButton = styled.button`
  padding: 16px 32px;
  font-size: 24px;
  border-radius: 16px;
  background-color: #002B5B;
  border: none;
  color: white;
  font-family: "Chonburi", serif;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`; 