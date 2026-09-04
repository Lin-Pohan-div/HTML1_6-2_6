# HTML1_6-2_6 — 前端練習與小專題

> iSpan EEIT14｜跨域 Java 軟體工程師就業養成班
> HTML / CSS / Bootstrap 課堂練習與期中小專題（科技新聞入口網站）

本儲存庫收錄課程中的 HTML、CSS、Bootstrap 練習，以及一份整合上述技術的
**響應式科技新聞入口網站**小專題（`小專/`）。全部為純靜態網頁，不需建置流程。

---

## 目錄結構

| 路徑 | 內容 |
| --- | --- |
| `小專/` | **期中小專題**：科技新聞入口網站（首頁、即時新聞列表頁、新聞內文頁） |
| `小專 copy/` | 小專題的封存備份（較舊版本，CSS 收於 `ProjectCSS/`） |
| `HTML/` | HTML5 基礎練習：語意標籤、多媒體、表格、表單 |
| `CSS/` | CSS 練習：選擇器、邊框背景、盒模型、display、position、RWD |
| `CSS練習題/` | CSS 練習題與參考答案 |
| `Bootstrap/` | Bootstrap 5 練習：Layout、Content、Utilities、Components |
| `BS網頁練習/` `BS_網頁練習_參考/` | Bootstrap 切版練習與參考解答 |
| `上課前/` | 課前暖身練習 |
| `styles.css` | 早期共用樣式草稿 |

---

## 小專題：科技新聞入口網站

以純 HTML + CSS + 原生 JavaScript 打造的科技新聞媒體網站，示範響應式版面、
互動元件與無障礙（ARIA）實作。Bootstrap 僅用於格線與工具類別。

### 頁面

| 檔案 | 說明 |
| --- | --- |
| `小專/homepage.html` | 首頁：輪播頭條、即時新聞側欄、圖文穿插磚牆（翻牌卡）、多組新聞分類區塊、訂閱區 |
| `小專/webpage.html` | 即時新聞列表頁（含側邊目錄 `sideBar.js`） |
| `小專/subpage.html` | 次分類頁 |
| `小專/webPageV2 copy.html` | 新聞內文頁模板 |
| `小專/webPageV2_news1.html` ~ `news5.html` | 五篇新聞內文頁 |

### 樣式（`小專/*.css`）

| 檔案 | 用途 |
| --- | --- |
| `base.css` | 共用基底：導覽列、下拉選單、全螢幕搜尋、頁尾、浮動按鈕 |
| `homepage.css` | 首頁專屬：輪播、磚牆格線、翻牌動畫、分類區塊 |
| `webpage.css` | 內文頁專屬：文章排版、側邊目錄、圖文穿插 |
| `bootstrap.css` | Bootstrap 5（本地版） |

### JavaScript（`小專/ProjectJs/`）

| 檔案 | 功能 |
| --- | --- |
| `homepage_heroSide.js` | 首頁頭條輪播（上一張／下一張／圓點切換、淡入） |
| `nav-menu.js` / `homepage_navMenu.js` | 桌機下拉選單開合與 `aria-expanded` 切換 |
| `full screen search.js` | 全螢幕搜尋覆蓋層開關與焦點管理 |
| `overlay-search-title.js` | 動態建立搜尋表單與輸入框 |
| `homepage_subscribe.js` / `subscribe.js` | 訂閱表單驗證與回饋 |
| `floating-toc.js` | 浮動「回到頂端」按鈕，用 IntersectionObserver 切換顯示狀態 |
| `sideBar.js` | 內文頁側邊目錄定位（隨 header 高度動態調整） |
| `post-meta.js` | 自動填入文章發布日期 |
| `homepage_navMenu.js` 等 | 手機版導覽 / 搜尋覆蓋層 |

### 圖片

`小專/img/` 存放本地圖片（輪播、圖示等）；部分內容圖片直接引用 Unsplash / Pexels 線上網址。

---

## 使用方式

本專案為靜態網頁，直接於瀏覽器開啟即可。因頁面間以相對路徑互相連結，建議用本機伺服器執行以避免路徑問題：

```bash
# VS Code：安裝 Live Server 擴充套件，對 小專/homepage.html 按右鍵 → Open with Live Server

# 或使用 Python
cd 小專
python -m http.server 5501
# 瀏覽 http://127.0.0.1:5501/homepage.html
```

> 註：部分頁面的 Logo 連結指向開發時的固定網址（`webpage_1215.html`），屬歷史遺留，不影響其他功能。

---

## 技術重點

- **響應式設計**：以 `min-width` 斷點區分桌機 / 平板 / 手機版面；手機版提供獨立的漢堡選單與搜尋覆蓋層。
- **無障礙**：導覽、對話框、搜尋結果皆標註 `role`、`aria-*`、`aria-live`，並處理鍵盤焦點。
- **原生 JavaScript**：無框架，事件委派、`IntersectionObserver`、`MutationObserver` 等瀏覽器 API。
- **CSS 動畫**：頭條輪播淡入、磚牆翻牌 3D 效果。

---

## 專案資訊

- 課程進度基準：`2025_11_14`（`10_add_CSS`）
- 遠端：<https://github.com/Lin-Pohan-div/HTML1_6-2_6>
- 作者：Lin
