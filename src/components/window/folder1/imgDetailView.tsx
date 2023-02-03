import { folder1ImgData } from '@/docs/folder1Img';
import { folder1ImgDataType } from '@/interface/folder1ImgData';
import styled from '@emotion/styled';
import { NextPage } from 'next';
import { useState } from 'react';

interface props {
  itemData: folder1ImgDataType;
  closeDetailView: () => void;
}

const ImgDetailView: NextPage<props> = ({
  itemData,
  closeDetailView,
}: props) => {
  const [item, setItem] = useState<folder1ImgDataType>(itemData);

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

  return (
    <ImgDetailViewContainer>
      <WindowTitleWrap>
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
`;

const WindowTitle = styled.p`
  font-size: 16px;
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
