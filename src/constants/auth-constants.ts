export const relaxedBouncy = {
  type: "spring",
  bounce: 0.2, // 降低回彈幅度，讓慢速動作更穩重
  duration: 0.8, // 增加持續時間，放慢整體節奏
} as const; // 關鍵：使用 as const 解決 TS2322 報錯
