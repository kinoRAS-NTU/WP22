# HW4: React MineSweeper Exercise

同學你好！以下是此份作業的完成情況及簡介，請參考。

另附上助教提供的[示範影片](https://www.youtube.com/watch?v=mDx4bi-rA-Q)以供參考。

## 01 安裝並運行

評閱本作業前，請先使用指令 `npm install` 安裝所需模組。

安裝完成後，使用 `npm start` 進入開發模式 (Development Mode)。 

之後，開啟 [http://localhost:3000](http://localhost:3000) 以在瀏覧器中預覽運行結果。

## 02 已完成的基本要求
本份作業已完成所有基本要求：
- 能顯示開始畫面 (HomePage)
- 有「Start Game」按鈕，按下後能開始遊戲 (切換到遊戲頁面)
- 遊戲頁面會根據 createBoard() 回傳的物件設定基本參數，並顯示 Board
- Board 有透過按右鍵插旗子的功能(含畫面更新)，並按以下規則運作：
  - 若此 Cell 已經被按開，則不能再插上旗子
  - 若此 Cell 沒有被插上旗子，且未被按開，則插上旗子
  - 若此 Cell 已經被插上旗子，則拔掉旗子
- Board 的 revealCell 功能，因已完成進階功能，主程式已從 Board.js 中移除。
  - 若欲檢驗，可至第 54 行，把 revealed() 最後一個參數改為 0 (表示「基本要求模式」) 或 1 (表示「進階要求模式」)

## 03 已完成的進階要求
本份作業已完成所有基本要求：
- HomePage 中有完成難度調整功能，且能判斷難度程度是否合法 
  - 不合法，即地雷數量超過 Cell 總數 (n*n)
  - 若不合法，顯示錯誤訊息，則 controlNum 顏色改變為 #880000，亦無法開始遊戲
- 在 reveal.js 裡實作 reveal 函數，負責處理點開 Cell 的動作，並根據 Cell 內的數值有所不同。規則如下：
  - 已被打開或已插旗子的 Cell 不能(再)被打開
  - 若 Cell 為爆彈，則結束遊戲
  - 若 Cell 是非 0 數字，則只打開該 Cell
  - 若 Cell 為空白，則會同步開啟這個 Cell 四周未被插旗子且不是地雷的 Cell。(也就是說，)