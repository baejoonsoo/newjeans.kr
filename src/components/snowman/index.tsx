import { selectedType } from '@/interface/selected';
import styled from '@emotion/styled';
import { NextPage } from 'next';

interface props {
  selected: selectedType;
  updateSelected: (newTarget: selectedType) => void;
}

const SnowmanWidget: NextPage<props> = ({
  selected,
  updateSelected,
}: props) => {
  const onClick = () => {
    updateSelected(selected === 'snowman' ? null : 'snowman');
  };

  return <WidgetContainer selected={selected} onClick={onClick} />;
};

const chiceImg = ({ selected }: { selected: selectedType }) =>
  selected === 'snowman'
    ? '/image/snowman/snowmanCardSelected.png'
    : '/image/snowman/snowmanCard.gif';

const WidgetContainer = styled.div`
  width: 343px;
  height: 428px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(${chiceImg});

  position: absolute;
  right: 20px;
  bottom: 20px;
`;

export default SnowmanWidget;
