import Folder1Window from '@/components/window/folder1';
import { selectedType } from '@/interface/selected';
import styled from '@emotion/styled';
import { NextPage } from 'next';
import { useState } from 'react';

interface props {
  selected: selectedType;
  updateSelected: (newTarget: selectedType) => void;
}

const Folder1: NextPage<props> = ({ selected, updateSelected }: props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClick = () => {
    updateSelected(selected === 'folder1' ? null : 'folder1');
  };

  const openWindow = () => {
    setIsOpen(true);
  };

  const closeWindow = () => {
    setIsOpen(false);
  };

  return (
    <>
      <WidgetContainer
        selected={selected}
        onClick={onClick}
        onDoubleClick={openWindow}
      />
      {isOpen ? <Folder1Window closeWindow={closeWindow} /> : <></>}
    </>
  );
};

const chiceImg = ({ selected }: { selected: selectedType }) =>
  selected === 'folder1'
    ? '/image/folder/folder1/folder1Selected.png'
    : '/image/folder/folder1/folder1.png';

const WidgetContainer = styled.div`
  width: 106px;
  height: 108px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(${chiceImg});
  cursor: pointer;

  position: absolute;
  right: 50px;
  top: 88px;
`;

export default Folder1;
