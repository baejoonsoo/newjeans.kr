import { folder1ImgData } from '@/docs/folder1Img';
import { folder1ImgDataType } from '@/interface/folder1ImgData';
import { windowZIndexRecoil } from '@/utiles/store/windowZIndex';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

interface props {
  itemData: folder1ImgDataType;
  closeDetailView: () => void;
}

const ImgDetailView: NextPage<props> = ({
  itemData,
  closeDetailView,
}: props) => {
  const [item, setItem] = useState<folder1ImgDataType>(itemData);
  const [point, setPoint] = useState<{ x: number; y: number }>({
    x: 275,
    y: 60,
  });

  const [zIndexRecoil, setZindexRecoil] = useRecoilState(windowZIndexRecoil);
  const [zIndex, setZindex] = useState<number>(zIndexRecoil);

  useEffect(() => {
    setItem(itemData);
  }, [itemData]);

  useEffect(() => {
    setZindexRecoil((pre) => pre + 1);
  }, []);

  const windowRef = useRef<HTMLDivElement>(null);

  const prevImg = () => {
    if (item.key !== 0) {
      setItem(folder1ImgData[item.key - 1]);
    }
  };

  const NextImg = () => {
    if (item.key !== folder1ImgData.length - 1) {
      setItem(folder1ImgData[item.key + 1]);
    }
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
    <ImgDetailViewContainer
      ref={windowRef}
      x={point.x}
      y={point.y}
      zIndex={zIndex}
    >
      <WindowTitleWrap onMouseDown={mouseDown}>
        <WindowTitle>New Folder 1 - {item.name}</WindowTitle>
        <CLoseButton onClick={closeDetailView} />
      </WindowTitleWrap>
      <ImgView img={item.url}>
        {item.key !== 0 ? <PrevButton onClick={prevImg} /> : <></>}
        {item.key !== folder1ImgData.length - 1 ? (
          <NextButton onClick={NextImg} />
        ) : (
          <></>
        )}
      </ImgView>
    </ImgDetailViewContainer>
  );
};

const NextButton = styled.button`
  height: 44px;
  aspect-ratio: 1;

  background-image: url('/image/icon/nextArrow.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
`;

const PrevButton = styled(NextButton)`
  transform: rotate(180deg) translateY(50%);
  left: 10px;
`;

const ImgView = styled.div`
  width: 100%;
  height: 672px;
  padding: 10px;
  background-image: url(${({ img }: { img: string }) => img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
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

const ImgDetailViewContainer = styled.section`
  width: 500px;
  height: 700px;

  background-color: black;
  box-shadow: rgba(0, 0, 0, 0.5) 2px 2px 10px 0px;

  position: absolute;
  top: 60px;
  left: 275px;

  ${({ x, y, zIndex }: { x: number; y: number; zIndex: number }) => css`
    top: ${y}px;
    left: ${x}px;
    z-index: ${zIndex};
  `}
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

export default ImgDetailView;
