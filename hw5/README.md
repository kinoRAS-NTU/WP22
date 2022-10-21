# HW5: Backend Practice - Number Guessing Game

同學你好！以下是此份作業的完成情況及簡介，請參考。

## 01 安裝並運行

評閱本作業前：

1. 請先確認已安裝 yarn
2. 分別至 `./frontend` 及 `./backend` 運行 `yarn install` 以安裝所需模組
3. 返回 `./`，在兩個 terminal 中分別運行 `yarn start` 及 `yarn server`
4. 開啟 [http://localhost:3000](http://localhost:3000) 以在瀏覧器中預覽運行結果。

註：若本裝置的 3000 連接埠已經佔用，請以 terminal 所示的連接埠連接。
註：若本裝置的 4000 連接埠已經佔用，請在 `./frontend/src/App.js` 中把 baseURL 的連接埠改成實際使用的連接埠。

## 02 已完成的基本要求

本份作業已完成所有基本要求：

### Frontend
- 按下「Start Game」後，以 POST 呼叫 /start API
  - 伺服器回應正常後，狀態改為「遊戲中」並切換畫面
- 按下「Guess!」後，以 GET 呼叫 /guess API
  - 若回應為不正常 (406)，即輸入格式有誤，則顯示錯誤訊息
  - 若回應為正常 (200)，但數字猜錯，則按回傳的 state 顯示提示訊息
  - 若回應為正常 (200)，且數字猜對，則切換至「勝出頁面」
- 按下「Restart Game」後，以 POST 呼叫 /restart API
  - 伺服器回應正常後，狀態改為「遊戲中」並切換畫面

### Backend
- `core/getNumber.js` 的 `getNumber()` 產生 1~100 之間的隨機整數，並於在全域變數 `number` 中
- `core/getNumber.js` 的 `genNumber()` 讀取並回傳全域變數 `number`
- `/start` 及 `/restart` API 產生一個新的猜謎數字
- `/guess` API 判斷輸入值的格式，並與正確答案作比較，再依結果以合適的 HTTP Code 回傳相應的 `status`

## 03 已完成的進階要求

本份作業未完成任何進階要求。

## 04 已完成的其他功能

本份作業對使用者介面作少量美化。

感謝你的留意！

最後更新：2022-10-21 20:04
