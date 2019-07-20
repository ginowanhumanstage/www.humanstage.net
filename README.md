<h1 align="center">
  www.humanstage.net-front
</h1>

宜野湾 HUMAN STAGE のフロントリポジトリ。  
概要は以下の通り。

- Getsby で生成
- headless cms として Wordpress を使用
- 以下の条件で再ビルドが実行される
  - master ブランチが更新された際
  - Post、Page に更新があった際
    - WordPress の JAMstack Deployments プラグインが Webhook を走らせ実行
  - 毎日午前 3 時～ 4 時の間
    - GoogleAppScript にトリガーを設定し Webhook を走らせ実行
