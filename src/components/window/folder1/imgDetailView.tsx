import { folder1ImgData } from '@/docs/folder1Img';
import { folder1ImgDataType } from '@/interface/folder1ImgData';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';

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

  useEffect(() => {
    setItem(itemData);
  }, [itemData]);

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

  const mouseDown = (event: any) => {
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
    <ImgDetailViewContainer ref={windowRef} x={point.x} y={point.y}>
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
  height: 772px;
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
  height: 800px;

  background-color: white;

  position: absolute;
  top: 60px;
  left: 275px;
  z-index: 1;

  ${({ x, y }: { x: number; y: number }) => css`
    top: ${y}px;
    left: ${x}px;
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
