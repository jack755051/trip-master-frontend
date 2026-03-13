# Trip Master API Contract

> Last updated: 2026-03-13
>
> 本文件刻意分成兩類：
>
> - 已存在於程式碼中的 contract
> - 由現有 UI / schema 可推導出的 contract
>
> 這樣可以避免文件寫得比實作更前面。

## 1. 已存在於程式碼中的 HTTP Contract

### `GET /destinations`

目前唯一已經出現在 service 層中的遠端呼叫，是 `src/services/destination-service.ts`：

```ts
fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations`, {
  headers: {
    "Accept-Language": locale,
  },
  next: { revalidate: 3600 },
});
```

#### Request

- Method: `GET`
- URL: `${NEXT_PUBLIC_API_URL}/destinations`
- Required header: `Accept-Language`
- Allowed locale values from current app: `zh-TW` | `en`
- Cache policy: Next.js `revalidate: 3600`

#### Current frontend behavior

- 直接 `return res.json()`
- 沒有 TypeScript response type
- 沒有 runtime schema validation
- 沒有 `res.ok` 檢查
- 沒有 loading / empty / retry / error adapter

#### Environment variable

```env
NEXT_PUBLIC_API_URL=<backend-base-url>
```

如果這個變數未提供，`destination-service.ts` 組出的 URL 會不完整，後續正式接線前需要先定稿。

## 2. 語系 Contract

目前前端的語系 contract 已經比一般展示頁更明確，因為它同時影響 SSR 與 API header：

- Cookie key: `tm_locale`
- Default locale: `zh-TW`
- Supported locales: `zh-TW`, `en`
- Invalid locale handling: fallback to `zh-TW`

### 流程規範

1. Root layout 在 server 端讀取 `tm_locale`。
2. `resolveLocale()` 驗證 locale 是否存在於字典中。
3. Client 端透過 `setLanguage()` 同步更新 cookie 與 React state。
4. 若某支 API 需要多語內容，應沿用相同 locale，並透過 `Accept-Language` 傳遞。

## 3. 由現有 UI 推導出的表單 Payload Contract

以下內容不是已實作的 HTTP endpoint，而是依 `src/components/sections/auth/auth-schemas.ts` 的前端驗證規則整理出的 payload 契約。這些欄位一旦後端命名不同，前端 adapter 需要一起調整。

### Login payload

#### Request body

```json
{
  "account": "demo-user",
  "password": "password123"
}
```

#### Validation rules

- `account`: 必填，字串，會先 `trim()`
- `password`: 必填，至少 8 個字元

#### Current UI error model

- 表單目前保留 `errors.root.server.message`
- 代表最小可用後端錯誤格式，可以只回傳一段表單級訊息

範例：

```json
{
  "message": "帳號或密碼錯誤"
}
```

### Register payload

#### Request body

```json
{
  "username": "jack",
  "email": "jack@example.com",
  "password": "password123",
  "terms": true
}
```

#### Validation rules

- `username`: 必填，字串，會先 `trim()`
- `email`: 必填，需為合法 email，會先 `trim()`
- `password`: 必填，至少 8 個字元
- `terms`: 必須為 `true`

#### Notes

- `terms` 目前是前端 schema 的一部分，但實際是否要送往後端，可依後端法務或稽核需求決定。
- 若後端不需要 `terms` 欄位，前端 submit adapter 可以在送出前移除。

### Forgot password payload

#### Request body

```json
{
  "email": "jack@example.com"
}
```

#### Validation rules

- `email`: 必填，需為合法 email，會先 `trim()`

## 4. 由目前 UI 可反推的 Destination Response 需求

這一段屬於推導規格，不是現有 backend contract。它的依據是首頁 `TripCard` 與 `TrendingSection` 目前需要的欄位。

如果未來 `GET /destinations` 或其他 explore/trips API 要直接驅動現有卡片 UI，至少需要能映射出以下資料：

```json
{
  "id": "trip-01",
  "title": "東京五天四夜極簡行",
  "days": "5 天 4 夜",
  "author": "Charlie",
  "likes": 128,
  "tags": ["東京", "自由行"],
  "badge": "HOT",
  "gradient": "from-orange-100 to-rose-100"
}
```

### Required fields for current card UI

- `id`
- `title`
- `days`
- `author`
- `likes`
- `tags`

### Optional fields for current card UI

- `badge`: `HOT` | `NEW` | `EDITOR_CHOICE`
- `gradient`: 目前 UI 直接吃 Tailwind class string，但這比較像 mock 階段的暫用欄位

### 建議

- 真實 API 最好改提供 `thumbnailUrl` 或 image metadata，而不是直接傳 CSS class。
- `days` 長期建議拆成結構化欄位，例如 `days` / `nights` 或 itinerary summary，而不是直接傳展示字串。

## 5. 尚未定義的 API 區域

以下功能目前已有 UI 或導航需求，但專案內尚未形成正式 API contract：

- login / register / forgot password backend endpoints
- dashboard 首頁資料
- trip CRUD
- user profile / settings
- explore list / trip detail

在這些 contract 定稿前，前端文件應維持「描述現況與推導需求」的寫法，不應假設後端設計已經完成。
