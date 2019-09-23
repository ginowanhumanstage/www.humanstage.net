## www.humanstage.net-front

[![Netlify Status](https://api.netlify.com/api/v1/badges/73b01c74-994a-435e-9970-56aaae5898e6/deploy-status)](https://app.netlify.com/sites/elated-mcnulty-716ec2/deploys)

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
