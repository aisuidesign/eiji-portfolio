# 伊藤英次ポートフォリオ

転職活動で企業へ共有するためのWebポートフォリオです。

## サイト表示に必要なもの

- `index.html`：サイト本体
- `参照/styles.css`：デザイン、レイアウト、レスポンシブ表示
- `参照/main.js`：スクロール演出、TOPへ戻る、画像保存操作の抑制
- `素材/`：プロフィール画像、作品画像、背景画像

## パスワード付き公開に必要なもの

- `functions/_middleware.js`：Cloudflare Pages用のBasic認証
- `.nojekyll`：静的ファイルをそのまま公開するための設定
- `.gitignore`：公開不要な確認用データを除外する設定
- `公開手順.md`：Cloudflare Pagesで公開するための手順

## GitHubへアップロードするもの

- `index.html`
- `素材/`
- `参照/`
- `functions/`
- `.nojekyll`
- `.gitignore`
- `README.md`
- `公開手順.md`

`preview/` は制作確認用のため、公開には不要です。

## 更新方法

作品やPDFを追加・変更した場合は、このMac内のデータを更新したあと、GitHubへ変更ファイルを再アップロードします。
Cloudflare Pages側で再デプロイされると、企業へ共有したURLの中身も更新されます。
