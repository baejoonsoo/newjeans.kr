import { folder2ItemData } from '@/docs/folder2Item';
import { folder2ItemDataType } from '@/interface/folder2ItemData';
import { windowZIndexRecoil } from '@/utiles/store/windowZIndex';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

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

  const changeItemData = (item: folder2ItemDataType) => {
    setItemData(item);
    setIsShowDetailView(true);
  };

  useEffect(() => {
    setZindexRecoil((pre) => pre + 1);
  }, []);

  return (
    <WindowSection ref={windowRef} x={point.x} y={point.y} zIndex={zIndex}>
      <WindowTitleWrap onMouseDown={mouseDown}>
        <WindowTitle>New Folder 2</WindowTitle>
        <CLoseButton onClick={closeWindow} />
      </WindowTitleWrap>
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

export default Folder2Window;
