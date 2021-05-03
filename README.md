# Restaurant List 美食網
這是使用**Express**、**node.js**製作的餐廳美食網

## 功能 (Features)
1. 使用者可以輸入名稱搜尋特定餐廳
2. 使用者可以點擊餐廳卡片查看更多資訊
3. 使用者可以新增餐廳的資料並在網站中看到
4. 使用者可以修改餐廳資料餐廳
5. 使用者可以刪除餐廳資料

## 環境與套件 (prerequisites)
* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Bootstrap](https://getbootstrap.com/docs/4.6/getting-started/introduction/)
* [Popper.js](https://popper.js.org/)
* [Jquery.js(3.6.0.min)](https://jquery.com/)
* [mongoose](https://mongoosejs.com/)
* [mongodb](https://www.mongodb.com/)

## 安裝與執行步驟(installation and execution)
1. 使用終端機，clone此專案到local位置


        git clone https://github.com/tim80411/Restaurean_List

2. 使用終端機，進入此專案所在的資料夾


        cd restaurant_List

3. 安裝套件


        npm install
4. 安裝mongodb並在mongodb內建立資料庫restaurant-list
5. 新增種子資料


        npm run seed

6. 啟動伺服器


        npm run dev
7. 看到以下字樣代表成功啟動並監聽server以及成功連上資料庫


        Listen to the http://localhost:3000
        mongodb connected!

在任一瀏覽器輸入localhost:3000即可進入網站


