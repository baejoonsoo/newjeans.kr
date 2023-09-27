import { selectedType } from '@/interface/selected';
import { atom, RecoilState } from 'recoil';

export const widgetSeletedRecoil: RecoilState<selectedType> = atom({
  key: 'widgetSeletedRecoilKey',
  default: null as selectedType,
});
