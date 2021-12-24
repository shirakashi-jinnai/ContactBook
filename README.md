# 連絡帳アプリ

このアプリでは相手の住所、電話番号、名前、生年月日を登録することができる連絡帳アプリである。

## Dependency
  - Firebase
  - Next.js
  - Material-UI
## Installation
  ```
  npx create-next-app
  yarn add firebase 
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
- [URL](https://contactbook-alpha.vercel.app/)

## 環境構築
1. ```cp .env-sample ```コマンドで``` .env ```ファイルを作成
1. ``` .env ```ファイルに Firebase config キーを記載

## References
- [Next.js Pages](https://nextjs.org/docs)
- [Firebase Pages](https://firebase.google.com/docs)
- [Qiita](https://qiita.com/KamataRyo/items/466255fc33da12274c72)
