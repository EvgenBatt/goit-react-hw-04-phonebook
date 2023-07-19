import styled from '@emotion/styled';

export const Form = styled.form`
  border: 1px solid #000;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  line-height: 1.5;
`;

export const Input = styled.input`
  width: 300px;
`;

export const Button = styled.button`
  width: 150px;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 5px;
  border: none;
  margin-top: 15px;
  color: #fff;
  background-color: #000599c6;
`;
