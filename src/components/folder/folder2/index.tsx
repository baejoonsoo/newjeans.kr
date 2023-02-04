import Folder2Window from '@/components/window/folder2';
import { selectedType } from '@/interface/selected';
import styled from '@emotion/styled';
import { NextPage } from 'next';
import { useState } from 'react';

interface props {
  selected: selectedType;
  updateSelected: (newTarget: selectedType) => void;
}

const Folder2: NextPage<props> = ({ selected, updateSelected }: props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClick = () => {
    updateSelected(selected === 'folder2' ? null : 'folder2');
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
      {isOpen ? <Folder2Window closeWindow={closeWindow} /> : <></>}
    </>
  );
};

const chiceImg = ({ selected }: { selected: selectedType }) =>
  selected === 'folder2'
    ? '/image/folder/folder2/folder2Selected.png'
    : '/image/folder/folder2/folder2.png';

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
  top: 240px;
`;

export default Folder2;
