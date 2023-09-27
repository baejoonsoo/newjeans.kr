import { widgetSeletedRecoil } from '@/utils/store/widgetSeleted';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { NextPage } from 'next';
import { useRecoilState } from 'recoil';

const SnowmanWidget: NextPage = () => {
  const [selected, setSelected] = useRecoilState(widgetSeletedRecoil);

  return (
    <WidgetContainerWrap>
      <SelectedWidgetContainer
        selected={selected === 'snowman'}
        onClick={() => setSelected(null)}
      />
      <UnSelectedWidgetContainer
        selected={selected === 'snowman'}
        onClick={() => setSelected('snowman')}
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
  background-image: url('/image/snowman/snowmanCard.gif');

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
  background-image: url('/image/snowman/snowmanCardSelected.png');

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
  width: 343px;
  height: 428px;

  position: absolute;
  right: 20px;
  bottom: 20px;
`;

export default SnowmanWidget;
