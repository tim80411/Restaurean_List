# Restaurant List 美食網
這是使用**Express**、**node.js**製作的餐廳美食網

## 功能 (Features)
1. 使用者可以輸入名稱搜尋特定餐廳
2. 使用者可以點擊餐廳卡片查看更多資訊
3. 使用者可以新增餐廳的資料並在網站中看到
4. 使用者可以修改餐廳資料餐廳
5. 使用者可以刪除餐廳資料
6. 使用者可以註冊屬於自己的帳戶並使用email及密碼
7. 使用者可以使用facebook登入
8. 使用者登入後可以建立並管理屬於他的餐廳清單

## 環境與套件 (prerequisites)
* 環境：[Node.js](https://nodejs.org/en/)
* 框架：[Express](https://expressjs.com/)
* 樣板：[handlebars](https://www.npmjs.com/package/express-handlebars)
* 套件：[Bootstrap](https://getbootstrap.com/docs/4.6/getting-started/introduction/)
* 套件：[Popper.js](https://popper.js.org/)
* 套件：[Jquery.js(3.6.0.min)](https://jquery.com/)
* 套件：[mongoose](https://mongoosejs.com/)
* 套件：[bcrypt](https://www.npmjs.com/package/bcryptjs)
* 套件：[connect-flash](https://www.npmjs.com/package/connect-flash)
* 套件：[dotenv](https://www.npmjs.com/package/dotenv)
* 套件：[passport](https://www.npmjs.com/package/passport)
* 套件：[passport-local](https://www.npmjs.com/package/passport-local)
* 套件：[passport](https://www.npmjs.com/package/passport-facebook)
* 套件：[method-override](https://www.npmjs.com/package/method-override)
* 資料庫：[mongodb](https://www.mongodb.com/)

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
7. 在資料夾下建立.env檔案並參考.env.example檔案
8. 前往[Facebook](https://developers.facebook.com/)註冊應用程式並獲取passport-facebook需要的 FACEBOOK_APP_ID&FACEBOOK_APP_SECRET

9. 看到以下字樣代表成功啟動並監聽server以及成功連上資料庫


        Listen to the http://localhost:3000
        mongodb connected!

在任一瀏覽器輸入localhost:3000即可進入網站


