import { widgetSeletedRecoil } from '@/utiles/store/widgetSeleted';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { NextPage } from 'next';
import { useRecoilState } from 'recoil';

const CameraWidget: NextPage = () => {
  const [selected, setSelected] = useRecoilState(widgetSeletedRecoil);

  return (
    <WidgetContainerWrap>
      <SelectedWidgetContainer
        selected={selected === 'camera'}
        onClick={() => setSelected(null)}
      />
      <UnSelectedWidgetContainer
        selected={selected === 'camera'}
        onClick={() => setSelected('camera')}
      />
    </WidgetContainerWrap>
  );
};

const WidgetContainer = styled.div`
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  position: absolute;
  top: 0;
  left: 0;
`;

const UnSelectedWidgetContainer = styled(WidgetContainer)`
  background-image: url('/image/camera/camera.png');

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
  background-image: url('/image/camera/cameraSelected.png');

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
  width: 320px;
  height: 193px;

  position: absolute;
  left: 100px;
  bottom: 240px;
`;

export default CameraWidget;
