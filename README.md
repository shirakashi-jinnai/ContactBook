# 連絡帳アプリ

このアプリでは相手の住所、電話番号、名前、生年月日を登録することができる連絡帳アプリである。

## 使用画面
### サインイン＆サインアップページ
![image](https://user-images.githubusercontent.com/86089786/149646193-cf292bf9-a3c4-4d91-9b31-5bc43d5e705d.png)

### ホーム画面
![image](https://user-images.githubusercontent.com/86089786/149647616-448647a9-db9f-474f-8bed-1e3f50328303.png)

### 各種メニュー一覧
![image](https://user-images.githubusercontent.com/86089786/149646352-9c8a006b-d491-4021-a223-334024233c97.png)

### 登録ページ
![image](https://user-images.githubusercontent.com/86089786/149646401-1dc7b7d0-747c-4059-a5c8-ec207f755893.png)

### お気に入りリスト
![image](https://user-images.githubusercontent.com/86089786/149647605-4776e76a-4544-4e04-872c-bca36bef2237.png)

### ゴミ箱リスト
![image](https://user-images.githubusercontent.com/86089786/149647646-825318c2-4e88-4f81-9973-a6e3cf7656fd.png)

## Dependency
  - Firebase
  - Next.js
  - Material-UI
## Installation
  ```
  yarn install
  ```
## 機能
- エントリの作成
  - 名前
  - 住所
  - 誕生日
  - 電話番号
- エントリの削除
- エントリの更新
- エントリ検索機能
  - 名前
  - 住所
  - 年齢（範囲検索 例20歳~29歳）
- ユーザー認証
  - メールアドレス
## Deploy
vercell
- [https://contactbook-alpha.vercel.app/](https://contactbook-alpha.vercel.app/)

## 環境構築
1. ```cp .env-sample ```コマンドで``` .env ```ファイルを作成
1. ``` .env ```ファイルに Firebase config キーを記載

## References
- [Next.js Pages](https://nextjs.org/docs)
- [Firebase Pages](https://firebase.google.com/docs)
- [Qiita](https://qiita.com/KamataRyo/items/466255fc33da12274c72)
