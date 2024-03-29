import WindowHeader from '@/components/winodwHeader';
import { folder1ImgData } from '@/docs/folder1Img';
import { folder1ImgDataType } from '@/interface/folder1ImgData';
import { windowZIndexRecoil } from '@/utils/store/windowZIndex';
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

    window.addEventListener('mousemove', onMouseMove);

    window.addEventListener('mouseleave', () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.onmouseleave = null;
    });

    window.addEventListener('mouseup', () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.onmouseup = null;
    });
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
          title={`New Folder 1`}
          closeDetailView={closeWindow}
        />
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

export default Folder1Window;
