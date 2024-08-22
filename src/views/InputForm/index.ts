import * as Reference from '@utils/index';

export const  hexagramsAnalysis = (top: number, mid: number, bottom: number) => {
  // const t = top % 6 === 0 ? 6 : top % 6;
  // const m = mid % 8 === 0 ? 8 : mid % 8;
  // const b = bottom % 8 === 0 ? 8 : bottom % 8;
  const t = top % 6 || 6;
  const m = mid % 8 || 8;
  const b = bottom % 8 || 8;

  const topChange = t > 3;
  const bianResult = {
    t,
    m: topChange ? Reference.guaChangeMap[`${m}-${t - 3}`] : m,
    b: topChange? b : Reference.guaChangeMap[`${b}-${t}`],
  }

  return {
    bianResult,
    result: { t, m, b }
  };
}