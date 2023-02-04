import styled from '@emotion/styled';
import { NextPage } from 'next';

interface props {
  mouseDown: (event: any) => void;
  title: string;
  closeDetailView: () => void;
}

const WindowHeader: NextPage<props> = ({
  mouseDown,
  title,
  closeDetailView,
}: props) => {
  return (
    <WindowTitleWrap onMouseDown={mouseDown}>
      <WindowTitle>{title}</WindowTitle>
      <CLoseButton onClick={closeDetailView} />
    </WindowTitleWrap>
  );
};

const WindowTitle = styled.p`
  font-size: 16px;
  cursor: default;
`;

const WindowTitleWrap = styled.div`
  width: 100%;
  height: 28px;
  background-image: url('/image/window/window-header-bg.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  &::before {
    content: '';
    width: 100%;
    height: 20px;
    position: absolute;
    left: 0;
    top: -10px;

    background-image: url('/image/window/window-header-deco.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    border-radius: 20px 20px 0;
  }
`;

const CLoseButton = styled.button`
  width: 16px;
  height: 16px;

  background-image: url('/image/icon/closeBtn.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  position: absolute;
  right: 10px;
`;

export default WindowHeader;
