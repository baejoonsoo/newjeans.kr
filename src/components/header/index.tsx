import styled from '@emotion/styled';
import { NextPage } from 'next';
import SocialMedia from './socialMedia';
import Time from './time';

const Header: NextPage = () => {
  return (
    <HeaderContainer>
      <UrlText>NEWJEANS.KR</UrlText>
      <UtilWrap>
        <SocialMedia />
        <Time />
      </UtilWrap>
    </HeaderContainer>
  );
};

const UtilWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const UrlText = styled.p`
  font-size: 20px;
  color: white;
`;

const HeaderContainer = styled.header`
  width: 100%;
  padding: 20px;

  display: flex;
  justify-content: space-between;
`;

export default Header;
