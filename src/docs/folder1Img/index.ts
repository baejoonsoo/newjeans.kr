import { folder1ImgDataType } from '@/interface/folder1ImgData';

export const folder1ImgData: folder1ImgDataType[] = [
  ...Array(47)
    .fill(0)
    .map(
      (_, i): folder1ImgDataType => ({
        key: i,
        name: `NJ_Ditto_${i + 1}`,
        url: `https://newjeans.kr/imgs/window/new-folder-1/nj_ditto_${
          i + 1
        }.jpg`,
      }),
    ),
  ...Array(23)
    .fill(0)
    .map(
      (_, i): folder1ImgDataType => ({
        key: i + 47,
        name: `NJ_OMG_${i + 1}`,
        url: `https://newjeans.kr/imgs/window/new-folder-1/nj_omg_${i + 1}.jpg`,
      }),
    ),
];
