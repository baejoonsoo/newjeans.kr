import WindowHeader from '@/components/winodwHeader';
import { folder2ItemData } from '@/docs/folder2Item';
import { folder2ItemDataType } from '@/interface/folder2ItemData';
import { windowZIndexRecoil } from '@/utiles/store/windowZIndex';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import VideoDetailView from './videoDetailView';

interface props {
  closeWindow: () => void;
}

const Folder2Window: NextPage<props> = ({ closeWindow }: props) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const [point, setPoint] = useState<{ x: number; y: number }>({
    x: 100,
    y: 70,
  });
  const [isShowDetailView, setIsShowDetailView] = useState<boolean>(false);
  const [itemData, setItemData] = useState<folder2ItemDataType>({
    key: 0,
    name: '',
    embedId: '',
  });
  const [zIndexRecoil, setZindexRecoil] = useRecoilState(windowZIndexRecoil);
  const [zIndex, setZindex] = useState<number>(zIndexRecoil);

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

  const changeItemData = (item: folder2ItemDataType) => {
    setItemData(item);
    setIsShowDetailView(true);
  };

  const closeDetailView = () => {
    setIsShowDetailView(false);
  };

  useEffect(() => {
    setZindexRecoil((pre) => pre + 1);
  }, []);

  return (
    <>
      <WindowSection
        ref={windowRef}
        x={point.x}
        y={point.y}
        zIndex={zIndex}
        onClick={changeZIndex}
      >
        <WindowHeader
          mouseDown={mouseDown}
          title={`New Folder 2`}
          closeDetailView={closeDetailView}
        />
        <ItemsContainer>
          {folder2ItemData.map((videoItem) => (
            <Item
              key={videoItem.key}
              onDoubleClick={() => changeItemData(videoItem)}
            >
              <ItemImg />
              <ImgName>{videoItem.name}</ImgName>
            </Item>
          ))}
        </ItemsContainer>
      </WindowSection>
      {isShowDetailView ? (
        <VideoDetailView
          itemData={itemData}
          closeDetailView={closeDetailView}
        />
      ) : (
        <></>
      )}
    </>
  );
};

const ImgName = styled.p`
  font-size: 12px;
`;

const ItemImg = styled.div`
  width: 72px;
  aspect-ratio: 1;

  background-image: url('/image/icon/videoIcon.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 54px 40px;
`;

const Item = styled.div`
  width: 95px;
  height: 105px;

  padding-top: 5px;
  padding-bottom: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
`;

const ItemsContainer = styled.div`
  width: 100%;
  height: 500px;
  padding: 5px;

  display: flex;
  align-content: flex-start;
`;

const WindowSection = styled.section`
  width: 500px;
  height: 528px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.5) 2px 2px 10px 0px;
  position: absolute;

  ${({ x, y, zIndex }: { x: number; y: number; zIndex: number }) => css`
    top: ${y}px;
    left: ${x}px;
    z-index: ${zIndex};
  `}
`;

export default Folder2Window;
