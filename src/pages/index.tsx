import Header from '@/components/header';
import styled from '@emotion/styled';

export default function Home() {
  return (
    <HomePage>
      <Header />
    </HomePage>
  );
}

const HomePage = styled.main`
  background-image: url('/image/background.mp4');
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
