import { BADGE_STYLES } from "@/src/constants/tag";

export function getBadgeColor(text: string): string {
  if (!text) return BADGE_STYLES[0]; // 防呆

  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % BADGE_STYLES.length;
  return BADGE_STYLES[index];
}
