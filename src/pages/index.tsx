import CameraWidget from '@/components/camera';
import Folder1 from '@/components/folder/folder1';
import Folder2 from '@/components/folder/folder2';
import Header from '@/components/header';
import SnowmanWidget from '@/components/snowman';
import { selectedType } from '@/interface/selected';
import styled from '@emotion/styled';
import { useState } from 'react';

export default function Home() {
  const [selected, setSelected] = useState<selectedType>(null);

  const updateSelected = (newTarget: selectedType) => {
    setSelected(newTarget);
  };

  return (
    <HomePage>
      <Header />
      <Folder1 selected={selected} updateSelected={updateSelected} />
      <Folder2 selected={selected} updateSelected={updateSelected} />
      <CameraWidget selected={selected} updateSelected={updateSelected} />
      <SnowmanWidget selected={selected} updateSelected={updateSelected} />
    </HomePage>
  );
}

const HomePage = styled.main`
  background-image: url('/image/background.mp4');
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  position: relative;
`;
