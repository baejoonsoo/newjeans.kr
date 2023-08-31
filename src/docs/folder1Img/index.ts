import { folder1ImgDataType } from '@/interface/folder1ImgData';

export const folder1ImgData: folder1ImgDataType[] = [
  ...Array(37)
    .fill(0)
    .map(
      (_, i): folder1ImgDataType => ({
        key: i,
        name: `NJ_GetUp_${i + 1}`,
        url: `https://newjeans.kr/imgs/getup/photos/NJ_GetUp_${i + 1}.jpg`,
      }),
    ),
];
