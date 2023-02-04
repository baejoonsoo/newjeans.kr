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
      {/* <Video src="/image/background.mp4" autoPlay loop muted /> */}
      <Header />
      <CameraWidget selected={selected} updateSelected={updateSelected} />
      <SnowmanWidget selected={selected} updateSelected={updateSelected} />
      <Folder1 selected={selected} updateSelected={updateSelected} />
      <Folder2 selected={selected} updateSelected={updateSelected} />
    </HomePage>
  );
}

// const Video = styled.video`
//   width: 100%;
//   height: 100%;
//   z-index: -1;
//   object-fit: cover;

//   position: absolute;
//   top: 0;
//   left: 0;
// `;

const HomePage = styled.main`
  height: 100vh;
  position: relative;

  overflow: hidden;

  background-image: url('image/background.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
