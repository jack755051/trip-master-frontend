export function triggerBrowserDownload(blob: Blob, filename: string) {
  // 防呆：確保這段程式碼只在瀏覽器端執行 (避開 SSR 報錯)
  if (typeof window === "undefined") return;

  // 1. 在記憶體中為這個 Blob 建立一個暫時的 URL
  const url = window.URL.createObjectURL(blob);

  // 2. 建立一個隱藏的 <a> 標籤
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = url;

  // 3. 請執行「另存新檔」
  link.setAttribute("download", filename);

  // 4. 把 <a> 標籤塞進畫面、模擬點擊、然後立刻拔掉
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // 5. 釋放記憶體中的 URL (極度重要，否則會 Memory Leak！)
  window.URL.revokeObjectURL(url);
}

export function base64ToBlob(base64Data: string, contentType: string = ""): Blob {
  // 1. 如果有前綴，把它切掉
  const base64 = base64Data.includes("base64,") ? base64Data.split("base64,")[1] : base64Data;

  // 2. 解碼 Base64 字串為二進位字串
  const byteCharacters = atob(base64);
  const byteArrays = [];

  // 3. 轉換為位元組陣列 (效能優化寫法)
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  // 4. 包裝成最終的 Blob
  return new Blob(byteArrays, { type: contentType });
}
