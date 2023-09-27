import WindowHeader from '@/components/winodwHeader';
import { folder2ItemDataType } from '@/interface/folder2ItemData';
import { windowZIndexRecoil } from '@/utils/store/windowZIndex';
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
    if (!windowRef || !windowRef.current) return null;

    let shiftX = event.clientX - windowRef.current.getBoundingClientRect().left;
    let shiftY = event.clientY - windowRef.current.getBoundingClientRect().top;

    const onMouseMove = ({ pageX, pageY }: any) => {
      let x = pageX - shiftX;
      let y = pageY - shiftY;

      if (x < 0) x = 0;
      if (y < 10) y = 10;

      if (windowRef.current) {
        const width = window.innerWidth - windowRef.current.clientWidth;
        const height = window.innerHeight - windowRef.current.clientHeight;

        if (x > width) x = width;
        if (y > height) y = height;
      }

      setPoint({ x, y });
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
      onClick={changeZIndex}
    >
      <WindowHeader
        mouseDown={mouseDown}
        title={`New Folder 2 - ${itemData.name}`}
        closeDetailView={closeDetailView}
      />
      <VideoView>
        <Embed src={`${youtubeURL + itemData.embedId}`} allow="fullscreen" />
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

const VideoDetailViewContainer = styled.section`
  width: 640px;
  box-shadow: rgba(0, 0, 0, 0.5) 2px 2px 10px 0px;
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
