export const folder1ImgData: [string, string][] = [
  ...Array(47)
    .fill(0)
    .map((_, i): [string, string] => [
      `NJ_Ditto_${i + 1}`,
      `https://newjeans.kr/imgs/window/new-folder-1/nj_ditto_${i + 1}.jpg`,
    ]),
  ...Array(23)
    .fill(0)
    .map((_, i): [string, string] => [
      `NJ_OMG_${i + 1}`,
      `https://newjeans.kr/imgs/window/new-folder-1/nj_omg_${i + 1}.jpg`,
    ]),
];
