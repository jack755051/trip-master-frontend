export const getDestinations = async (locale: string) => {
  // 方案一：透過 Header 告訴後端語系
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations`, {
    headers: {
      "Accept-Language": locale, // 後端看到 zh-TW 就回傳中文資料
    },
    next: { revalidate: 3600 }, // Next.js 快取設定
  });

  return res.json();
};
