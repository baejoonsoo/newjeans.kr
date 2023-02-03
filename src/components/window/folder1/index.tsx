import { folder1ImgData } from '@/docs/folder1Img';
import { folder1ImgDataType } from '@/interface/folder1ImgData';
import styled from '@emotion/styled';
import { NextPage } from 'next';
import { useState } from 'react';
import ImgDetailView from './imgDetailView';

interface props {
  closeWindow: () => void;
}

const Folder1Window: NextPage<props> = ({ closeWindow }: props) => {
  const [isShowDetailView, setIsShowDetailView] = useState<boolean>(false);
  const [itemData, setItemData] = useState<folder1ImgDataType>({
    key: 0,
    name: '',
    url: '',
  });

  const changeItemData = (item: folder1ImgDataType) => {
    setItemData(item);
    setIsShowDetailView(true);

    console.log(item);
  };

  const closeDetailView = () => {
    setIsShowDetailView(false);
  };

  return (
    <>
      <WindowSection>
        <WindowTitleWrap>
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
  top: 50px;
  left: 50px;
`;

export default Folder1Window;
