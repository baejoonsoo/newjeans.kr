import Folder1Window from '@/components/window/folder1';
import { selectedType } from '@/interface/selected';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { NextPage } from 'next';
import { useState } from 'react';

interface props {
  selected: selectedType;
  updateSelected: (newTarget: selectedType) => void;
}

const Folder1: NextPage<props> = ({ selected, updateSelected }: props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openWindow = () => {
    setIsOpen(true);
  };

  const closeWindow = () => {
    setIsOpen(false);
  };

  return (
    <>
      <WidgetContainerWrap onDoubleClick={openWindow}>
        <SelectedWidgetContainer
          selected={selected === 'folder1'}
          onClick={() => updateSelected(null)}
        />
        <UnSelectedWidgetContainer
          onClick={() => updateSelected('folder1')}
          selected={selected === 'folder1'}
        />
      </WidgetContainerWrap>
      {isOpen ? <Folder1Window closeWindow={closeWindow} /> : <></>}
    </>
  );
};

const WidgetContainer = styled.div`
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;

  position: absolute;
  right: 0px;
  top: 0px;
`;

const UnSelectedWidgetContainer = styled(WidgetContainer)`
  background-image: url('/image/folder/folder1/folder1.png');

  ${({ selected }: { selected: boolean }) =>
    selected
      ? css`
          z-index: -1;
          opacity: 0;
        `
      : css`
          z-index: 0;
          opacity: 1;
        `};
`;

const SelectedWidgetContainer = styled(WidgetContainer)`
  background-image: url('/image/folder/folder1/folder1Selected.png');

  ${({ selected }: { selected: boolean }) =>
    selected
      ? css`
          z-index: 0;
          opacity: 1;
        `
      : css`
          z-index: -1;
          opacity: 0;
        `};
`;

const WidgetContainerWrap = styled.div`
  width: 106px;
  height: 108px;
  position: absolute;
  right: 50px;
  top: 88px;
`;

export default Folder1;
