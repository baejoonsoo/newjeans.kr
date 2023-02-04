import { folder2ItemDataType } from '@/interface/folder2ItemData';
import { windowZIndexRecoil } from '@/utiles/store/windowZIndex';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { NextPage } from 'next';
import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

interface props {
  itemData: folder2ItemDataType;
  closeDetailView: () => void;
}

const youtubeURL = 'https://www.youtube.com/embed/';

const VideoDetailView: NextPage<props> = ({
  itemData,
  closeDetailView,
}: props) => {
  const [point, setPoint] = useState<{ x: number; y: number }>({
    x: 125,
    y: 80,
  });
  const [zIndexRecoil, setZindexRecoil] = useRecoilState(windowZIndexRecoil);
  const [zIndex, setZindex] = useState<number>(zIndexRecoil);
  const windowRef = useRef<HTMLDivElement>(null);

  const changeZIndex = () => {
    if (zIndex === zIndexRecoil - 1) return null;

    setZindex(zIndexRecoil);
    setZindexRecoil((pre) => pre + 1);
  };

  const mouseDown = (event: any) => {
    changeZIndex();

    if (!windowRef || !windowRef.current) return null;

    let shiftX = event.clientX - windowRef.current.getBoundingClientRect().left;
    let shiftY = event.clientY - windowRef.current.getBoundingClientRect().top;

    const onMouseMove = ({ pageX, pageY }: any) => {
      setPoint({
        x: pageX - shiftX,
        y: pageY - shiftY,
      });
    };

    windowRef.current.addEventListener('mousemove', onMouseMove);

    windowRef.current.addEventListener('mouseleave', () => {
      if (!windowRef || !windowRef.current) return null;

      windowRef.current.removeEventListener('mousemove', onMouseMove);
      if (windowRef.current) {
        windowRef.current.onmouseleave = null;
      }
    });

    windowRef.current.addEventListener('mouseup', () => {
      if (!windowRef || !windowRef.current) return null;

      windowRef.current.removeEventListener('mousemove', onMouseMove);
      if (windowRef.current) {
        windowRef.current.onmouseup = null;
      }
    });
  };

  return (
    <VideoDetailViewContainer
      ref={windowRef}
      x={point.x}
      y={point.y}
      zIndex={zIndex}
    >
      <WindowTitleWrap onMouseDown={mouseDown}>
        <WindowTitle>New Folder 1 - {itemData.name}</WindowTitle>
        <CLoseButton onClick={closeDetailView} />
      </WindowTitleWrap>
      <VideoView>
        <Embed src={`${youtubeURL + itemData.embedId}`} />
      </VideoView>
    </VideoDetailViewContainer>
  );
};

const Embed = styled.iframe`
  width: 100%;
  aspect-ratio: 16/9;
  border: none;
`;

const VideoView = styled.div`
  width: 100%;
  height: 360px;
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

const VideoDetailViewContainer = styled.section`
  width: 640px;

  background-color: white;

  position: absolute;
  top: 60px;
  left: 275px;

  ${({ x, y, zIndex }: { x: number; y: number; zIndex: number }) => css`
    top: ${y}px;
    left: ${x}px;
    z-index: ${zIndex};
  `}
`;

export default VideoDetailView;
