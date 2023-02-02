import { selectedType } from '@/interface/selected';
import styled from '@emotion/styled';
import { NextPage } from 'next';

interface props {
  selected: selectedType;
  updateSelected: (newTarget: selectedType) => void;
}

const Folder2: NextPage<props> = ({ selected, updateSelected }: props) => {
  const onClick = () => {
    updateSelected(selected === 'folder2' ? null : 'folder2');
  };

  return <WidgetContainer selected={selected} onClick={onClick} />;
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
