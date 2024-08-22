import { mingtainjiHrefMap } from '@utils/index';

export const openLink = (guaName: string) => {
  const href = mingtainjiHrefMap[guaName] ?? "";
  href && window.open(href);
};