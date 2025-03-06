import { LOFI_GIFS } from "@/constants";

export const getRandomBackground = () => {
  const length = LOFI_GIFS.length;
  return LOFI_GIFS[getRandomInt(0, length - 1)]!;
};

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
