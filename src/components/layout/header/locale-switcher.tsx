"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Globe } from "lucide-react"; // 增加親切感的圖示
import { useTranslations } from "@/src/hooks/useTranslations";
import { cn } from "@/lib/utils";

export default function LocaleSwitcher() {
  const { locale, setLanguage } = useTranslations();

  const languages = [
    { label: "繁體中文", value: "zh-TW" },
    { label: "English", value: "en" },
  ];

  return (
    <Menubar className="border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer rounded-full hover:bg-brand/10 transition-colors px-3 py-2">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-brand" />
            <span className="text-sm font-medium uppercase">{locale}</span>
          </div>
        </MenubarTrigger>
        <MenubarContent align="end" className="min-w-[120px]">
          {languages.map((lang) => (
            <MenubarItem
              key={lang.value}
              onClick={() => setLanguage(lang.value)}
              className={cn(
                "cursor-pointer text-sm",
                locale === lang.value && "text-brand font-bold bg-brand/5",
              )}
            >
              {lang.label}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
