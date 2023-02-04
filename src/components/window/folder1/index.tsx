import { folder1ImgData } from '@/docs/folder1Img';
import { folder1ImgDataType } from '@/interface/folder1ImgData';
import { windowZIndexRecoil } from '@/utiles/store/windowZIndex';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import ImgDetailView from './imgDetailView';

interface props {
  closeWindow: () => void;
}

const Folder1Window: NextPage<props> = ({ closeWindow }: props) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isShowDetailView, setIsShowDetailView] = useState<boolean>(false);
  const [itemData, setItemData] = useState<folder1ImgDataType>({
    key: 0,
    name: '',
    url: '',
  });
  const [point, setPoint] = useState<{ x: number; y: number }>({
    x: 50,
    y: 50,
  });
  const [zIndexRecoil, setZindexRecoil] = useRecoilState(windowZIndexRecoil);
  const [zIndex, setZindex] = useState<number>(zIndexRecoil);

  useEffect(() => {
    console.log('ddd');
    setZindexRecoil((pre) => pre + 1);
  }, []);

  const changeItemData = (item: folder1ImgDataType) => {
    setItemData(item);
    setIsShowDetailView(true);
  };

  const closeDetailView = () => {
    setIsShowDetailView(false);
  };

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
    <>
      <WindowSection ref={windowRef} x={point.x} y={point.y} zIndex={zIndex}>
        <WindowTitleWrap onMouseDown={mouseDown}>
          <WindowTitle>New Folder 1</WindowTitle>
          <CLoseButton onClick={closeWindow} />
        </WindowTitleWrap>
        <ItemsContainer>
          {folder1ImgData.map((imgData) => (
            <Item
              key={imgData.key}
              onDoubleClick={() => changeItemData(imgData)}
            >
              <ItemImg />
              <ImgName>{imgData.name}</ImgName>
            </Item>
          ))}
        </ItemsContainer>
      </WindowSection>
      {isShowDetailView ? (
        <ImgDetailView itemData={itemData} closeDetailView={closeDetailView} />
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

  background-image: url('/image/icon/imgIcon.png');
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
  overflow-y: scroll;
  padding: 5px;

  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
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

const WindowSection = styled.section`
  width: 500px;
  height: 528px;
  background-color: white;

  position: absolute;

  ${({ x, y, zIndex }: { x: number; y: number; zIndex: number }) => css`
    top: ${y}px;
    left: ${x}px;
    z-index: ${zIndex};
  `}
`;

export default Folder1Window;
