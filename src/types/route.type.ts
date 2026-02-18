import React from "react";

export interface NavRoute {
  labelKey: string; // i18n 的 Key Path (例如: 'common.nav-explore')
  subLabelKey?: string; // 如果 subLabel 也需要翻譯
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}
