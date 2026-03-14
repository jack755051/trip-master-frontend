# ClassName Rules

## BEM-Tailwind 混合模式

目標：在重要結構上保留可讀、可維護的語意化 `className`，同時保留 Tailwind 的開發效率。

## 命名核心

- `Container`：元件最外層，負責定位、背景、間距基底。
- `Content`：內層內容區，負責寬度限制與對齊（例如 `mx-auto`、`max-w-*`）。
- `Element`：元件中的子單位，使用 BEM 形式命名（例如 `hero__title`、`header__logo`）。

## 規則

1. 每個重要元件都要有一個語意化 Block 名稱，例如 `hero`、`header`、`trip-card`。
2. 最外層必須包含 `<block> <block>--container`。
3. 內容層必須包含 `<block>__content`，並放置寬度與水平置中相關 Tailwind class。
4. 子元素使用 `<block>__<element>`，狀態使用 `<block>--<modifier>` 或 `<block>__<element>--<modifier>`。
5. Tailwind class 只描述樣式，BEM class 描述角色；兩者可以同時存在於同一個 `className`。
6. 純裝飾且不重要的節點可只用 Tailwind，不強制加 BEM 名稱。

## 推薦結構

```tsx
<section className="hero hero--container relative overflow-hidden bg-slate-950 py-16 text-white">
  <div className="hero__content mx-auto max-w-6xl px-6">
    <div className="hero__badge inline-flex items-center rounded-full border border-white/20 px-3 py-1 text-xs">
      Featured Trip
    </div>

    <h1 className="hero__title mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
      Plan Better Trips
    </h1>

    <p className="hero__description mt-4 max-w-2xl text-white/75">
      Build itineraries with reusable templates.
    </p>

    <div className="hero__actions mt-8 flex gap-3">
      <button className="hero__cta hero__cta--primary rounded-lg bg-cyan-400 px-5 py-3 text-slate-900">
        Get Started
      </button>
      <button className="hero__cta hero__cta--ghost rounded-lg border border-white/20 px-5 py-3">
        View Demo
      </button>
    </div>
  </div>
</section>
```

## 快速檢查清單

- 有沒有 Block 名稱？
- 有沒有 `--container` 外層？
- 有沒有 `__content` 內層？
- 重要子元素是否用 `__element` 命名？
- 狀態是否用 `--modifier`？

