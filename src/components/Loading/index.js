/* eslint-disable linebreak-style */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable linebreak-style */
import Lottie from 'react-lottie';
import animationData from '../../../public/animations/loading.json';

// eslint-disable-next-line import/prefer-default-export
export function Loading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Lottie
      options={defaultOptions}
    />
  );
}
