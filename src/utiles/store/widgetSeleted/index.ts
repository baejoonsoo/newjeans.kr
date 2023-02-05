import { selectedType } from '@/interface/selected';
import { atom, RecoilState } from 'recoil';

export const widgetSeletedRecoil: RecoilState<selectedType> = atom({
  key: 'widgetSeletedRecoil',
  default: null as selectedType,
});
