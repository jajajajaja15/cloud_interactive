## Getting Started  
---
### Requirements

* [npm](https://www.npmjs.com/) package + [Node.js](https://nodejs.org/) v8.12.0 or
  newer
---
### Quick Start

#### 1. Run `docker-compose up --build` 

> Build the DB 

#### 2. Run `npm install`

> Install all need modules

#### 3. Run `npm run start-dev`

> http://localhost:1337/ — Node.js server start

---
### API Directory
#### 001. 用戶帳號註冊
 - Method: POST
 - Path: http://localhost:1337/api/user/register
 - Description: 註冊一個新用戶
 - Request body:
   - username: 要註冊的用戶名稱
 - Response body:
    - user: 用戶資訊
      - id: 用戶流水號
      - username: 用戶名稱
      - hasSubscription: 用戶是否訂閱
      - token: 用戶持有代幣數量
---
#### 002. 用戶資訊
 - Method: POST
 - Path: http://localhost:1337/api/user/info
 - Description: 查詢指定用戶資訊
 - Request body: 至少要有其中一個查詢用戶資訊
   - userId: 要查詢的用戶Id
   - username: 要查詢的用戶名稱
 - Response body:
    - userInfo: 用戶資訊
      - id: 用戶編號
      - username: 用戶名稱
      - hasSubscription: 用戶是否訂閱
      - token: 用戶持有代幣數量
---    
#### 003. 查詢剩餘代幣
 - Method: POST
 - Path: http://localhost:1337/api/token/balance
 - Description: 依照查詢類型顯示剩餘代幣
 - Request body:
   - type: 要查詢的類型
     - user: 指定單一用戶
     - all: 平台所有用戶
   - userId: 要查詢的用戶ID, 當type=user時候才會使用
   - username: 要查詢的用戶名稱, 當type=user時候才會使用
 - Response body:
    - token: 剩餘代幣數量
---    
#### 004. 用戶交易代幣給其他用戶
 - Method: POST
 - Path: http://localhost:1337/api/token/transfer
 - Description: 用戶將代幣轉給另一位指定用戶
 - Request body:
   - userId: 要轉出的用戶ID
   - targetId: 要接收的用戶ID
   - token: 要轉出的代幣數量
 - Response body:
    - toeknBefore: 轉出前的代幣數量
    - toeknAfter: 轉出後的代幣數量
---
#### 005. 網路商店商品清單
 - Method: GET
 - Path: http://localhost:1337/api/shop/productList
 - Description: 將網路商店的所有商品列出
 - Response body:
    - productList: 商品清單，Array
      - productId: 商品編號
      - productName: 商品名稱
      - productType: 商品類型 (token, sub)
      - price: 購買商品所需花費金額
      - token: 商品編號
      - sub: 商品編號
---
#### 006. 網路商店購買商品
 - Method: POST
 - Path: http://localhost:1337/api/shop/buyProduct
 - Description: 購買網路商店指定商品
 - Request body:
   - userId: 要購買商品的用戶ID
   - productType: 商品類型(token, sub)
   - procuctId: 商品ID
 - Response body:
    - userInfo: 購買後用戶資訊
      - id: 用戶編號
      - username: 用戶名稱
      - hasSubscription: 是否訂閱
      - token: 持有代幣數量
    - productInfo: 購買商品資訊
      - productId: 商品編號
      - productName: 商品名稱
      - productType: 商品類型 (token, sub)
      - price: 購買商品所需花費金額
      - token: 商品編號
      - sub: 商品編號
---