import { folder1ImgDataType } from '@/interface/folder1ImgData';
import styled from '@emotion/styled';
import { NextPage } from 'next';

interface props {
  itemData: folder1ImgDataType;
  closeDetailView: () => void;
}

const ImgDetailView: NextPage<props> = ({
  itemData,
  closeDetailView,
}: props) => {
  return (
    <ImgDetailViewContainer>
      <WindowTitleWrap>
        <WindowTitle>New Folder 1 - {itemData.name}</WindowTitle>
        <CLoseButton onClick={closeDetailView} />
      </WindowTitleWrap>
      <ImgView img={itemData.url} />
    </ImgDetailViewContainer>
  );
};

const ImgView = styled.div`
  width: 100%;
  height: 772px;
  background-image: url(${({ img }: { img: string }) => img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
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
