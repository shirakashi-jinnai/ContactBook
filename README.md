# 連絡帳アプリ

このアプリでは相手の住所、電話番号、名前、生年月日を登録することができる連絡帳アプリである。

## 使用画面
サインイン＆サインアップページ
![image](https://user-images.githubusercontent.com/86089786/149646193-cf292bf9-a3c4-4d91-9b31-5bc43d5e705d.png)

ホーム画面
![image](https://user-images.githubusercontent.com/86089786/149646340-6bbebb85-c7b8-43be-bb52-f2ca44c9568a.png)

ドロワーメニュー
![image](https://user-images.githubusercontent.com/86089786/149646352-9c8a006b-d491-4021-a223-334024233c97.png)

登録画面
![image](https://user-images.githubusercontent.com/86089786/149646401-1dc7b7d0-747c-4059-a5c8-ec207f755893.png)

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
- [URL](https://contactbook-alpha.vercel.app/)

## 環境構築
1. ```cp .env-sample ```コマンドで``` .env ```ファイルを作成
1. ``` .env ```ファイルに Firebase config キーを記載

## References
- [Next.js Pages](https://nextjs.org/docs)
- [Firebase Pages](https://firebase.google.com/docs)
- [Qiita](https://qiita.com/KamataRyo/items/466255fc33da12274c72)
