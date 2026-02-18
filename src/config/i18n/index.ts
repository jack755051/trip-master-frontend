import { zhTW } from "./zh-TW";
import { en } from "./en";

export const dictionaries = {
  "zh-TW": zhTW,
  en: en,
};

export type Locale = keyof typeof dictionaries;
