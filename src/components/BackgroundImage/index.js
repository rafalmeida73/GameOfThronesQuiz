import styled from 'styled-components';


const BackgroundImage = styled.div`
  background-size: cover;
  width: 100%;
  background-position: center;
  background-image: url(${({ backgroundImage }) => backgroundImage});
  @media screen and (max-width: 500px) {
    background-image: none;
  }
`;

export default BackgroundImage;