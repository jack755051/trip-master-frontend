export type FooterBaseData = {
  // 產生年度
  startFrom?: string;
  // 公司名稱
  name?: string;
  // 標語
  slogan?: string;
};

export type FooterCopyrightData = FooterBaseData & {
  // 版權格式化時一定需要名稱
  name: string;
};

export type FooterNavItem = {
  // 已經翻譯過的文字
  label: string;
  // 已經翻譯過的文字
  subLabel?: string;
  // 導向連結
  href: string;
};
