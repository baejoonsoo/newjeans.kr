import { selectedType } from '@/interface/selected';
import styled from '@emotion/styled';
import { NextPage } from 'next';

interface props {
  selected: selectedType;
  updateSelected: (newTarget: selectedType) => void;
}

const CameraWidget: NextPage<props> = ({ selected, updateSelected }: props) => {
  const onClick = () => {
    updateSelected(selected === 'camera' ? null : 'camera');
  };

  return <WidgetContainer selected={selected} onClick={onClick} />;
};

const chiceImg = ({ selected }: { selected: selectedType }) =>
  selected === 'camera'
    ? '/image/camera/cameraSelected.png'
    : '/image/camera/camera.png';

const WidgetContainer = styled.div`
  width: 320px;
  height: 193px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(${chiceImg});

  position: absolute;
  left: 100px;
  bottom: 240px;
`;

export default CameraWidget;
