import { FILE_SIZE, FILE_TYPE } from "../constants/file-contstants";

export const DEFAULT_MAX_FILE_SIZE = 5 * FILE_SIZE.MB;

export type FileValidationResult =
  | { isValid: true; error?: never }
  | { isValid: false; error: string };

/**
 * 驗證檔案大小
 * @param file
 * @param maxSize
 * @returns
 */
export function validateFileSize(
  file: File,
  maxSize: number = DEFAULT_MAX_FILE_SIZE,
): FileValidationResult {
  if (file.size > maxSize) {
    const sizeInMB = (maxSize / FILE_SIZE.MB).toFixed(1);
    return { isValid: false, error: `檔案大小不能超過 ${sizeInMB} MB` };
  }
  return { isValid: true };
}

/**
 * 純粹驗證檔案格式
 * @param file
 * @param allowedTypes
 * @returns
 */
export function validateFileType(file: File, allowedTypes: string[]): FileValidationResult {
  if (!allowedTypes.includes(file.type)) {
    const formatNames = allowedTypes.map((t) => t.split("/")[1]?.toUpperCase() || t).join(", ");
    return { isValid: false, error: `僅支援 ${formatNames} 格式` };
  }
  return { isValid: true };
}

/**
 * 組合技：專門針對「圖片」的驗證器
 * @param file
 * @param maxSize
 * @returns
 */
export function validateImage(
  file: File,
  maxSize: number = DEFAULT_MAX_FILE_SIZE,
): FileValidationResult {
  // 動態取得允許的格式 (環境變數優先，常數墊底)
  const envTypes = process.env.NEXT_PUBLIC_ALLOWED_FILE_TYPES;
  const allowedTypes: string[] = envTypes
    ? envTypes
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : Object.values(FILE_TYPE);

  // 執行格式驗證
  const typeResult = validateFileType(file, allowedTypes);
  if (!typeResult.isValid) return typeResult;

  // 執行大小驗證
  const sizeResult = validateFileSize(file, maxSize);
  if (!sizeResult.isValid) return sizeResult;

  return { isValid: true };
}

/**
 * 2. 產生本地預覽用的 URL (選完檔案立刻顯示圖片)
 * 注意：這也是產生在記憶體中的虛擬網址，不用時必須釋放！
 */
export function createPreviewUrl(file: File): string {
  if (typeof window === "undefined") return "";
  return window.URL.createObjectURL(file);
}

/**
 * 3. 釋放預覽 URL 佔用的記憶體 (避免 Memory Leak)
 */
export function revokePreviewUrl(url: string) {
  if (typeof window === "undefined" || !url) return;
  window.URL.revokeObjectURL(url);
}

/**
 * 4. (選用) 批次將 Object 轉換為 FormData 的工具
 * 如果你的表單欄位很多，用這個函式可以省去寫一堆 formData.append()
 */
export function objectToFormData(obj: Record<string, any>): FormData {
  const formData = new FormData();
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value instanceof File ? value : String(value));
    }
  });
  return formData;
}
