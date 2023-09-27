import { atom, RecoilState } from 'recoil';

export const windowZIndexRecoil: RecoilState<number> = atom({
  key: 'challengeListRecoilKey',
  default: 1,
});
