import styled from '@emotion/styled';
import { NextPage } from 'next';
import Link from 'next/link';

const SocialMedia: NextPage = () => {
  return (
    <SocialMediasWrap>
      <Link href={'https://www.youtube.com/c/NewJeans_official'}>
        <Icon src="/image/icon/youtube.png" />
      </Link>
      <Link href={'https://twitter.com/NewJeans_ADOR'}>
        <Icon src="/image/icon/twitter.png" />
      </Link>
      <Link href={'https://www.instagram.com/newjeans_official'}>
        <Icon src="/image/icon/instagram.png" />
      </Link>
    </SocialMediasWrap>
  );
};

const Icon = styled.img`
  width: 25px;
`;

const SocialMediasWrap = styled.nav`
  display: flex;
  gap: 20px;
  align-items: center;
  height: 100%;
`;

export default SocialMedia;
