import styled from 'styled-components';

export const Form = styled.form`
input{
  width: 100%;
  background: none;
  padding: 10px;
  border-radius: 5px;
  border-color: #DADADA;
  margin: 20px 0;
  color: #fff !important;
  font-size: 14px;
}

input:focus{
  border-color: #DADADA;
}
button{
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  color: #fff;
  font-size: 14px;
  text-transform: uppercase;
}

button:hover, button:focus{
  background-color: ${({ theme }) => theme.colors.secondary};
}
`;
