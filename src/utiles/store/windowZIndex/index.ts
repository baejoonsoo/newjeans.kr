import { atom, RecoilState } from 'recoil';

export const windowZIndexRecoil: RecoilState<number> = atom({
  key: 'challengeListRecoil',
  default: 1,
});
