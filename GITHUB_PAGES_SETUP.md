# GitHub Pages 設定

## リポジトリ名の推奨
- `d2c-advertising-training`
- `advertising-training-course`
- `meta-ads-training`

## 公開URL例
- `https://[ユーザー名].github.io/d2c-advertising-training/`
- `https://[ユーザー名].github.io/advertising-training-course/`

## 設定手順

### 1. リポジトリの作成
```bash
# ローカルでリポジトリを初期化
git init
git add .
git commit -m "Initial commit: D2C広告研修講座"

# GitHubにプッシュ
git remote add origin https://github.com/[ユーザー名]/[リポジトリ名].git
git branch -M main
git push -u origin main
```

### 2. GitHub Pages の有効化
1. GitHubリポジトリの「Settings」タブを開く
2. 左サイドバーの「Pages」をクリック
3. 「Source」で「Deploy from a branch」を選択
4. 「Branch」で「main」を選択
5. 「Save」をクリック

### 3. 公開の確認
- 数分後に `https://[ユーザー名].github.io/[リポジトリ名]/` でアクセス可能
- 事前テストは `https://[ユーザー名].github.io/[リポジトリ名]/test.html` でアクセス

## カスタムドメインの設定（オプション）
1. リポジトリの「Settings」→「Pages」
2. 「Custom domain」にドメインを入力
3. DNS設定でCNAMEレコードを追加

## 更新方法
```bash
# 変更をコミット
git add .
git commit -m "Update: 講座内容の更新"

# GitHubにプッシュ
git push origin main
```

## トラブルシューティング

### ページが表示されない場合
1. リポジトリが「Public」になっているか確認
2. GitHub Pagesの設定が正しいか確認
3. ファイル名が正しいか確認（大文字小文字に注意）

### テストが動作しない場合
1. ブラウザのJavaScriptが有効になっているか確認
2. ローカルストレージが有効になっているか確認
3. コンソールでエラーを確認

## セキュリティ考慮事項
- テスト結果はローカルストレージに保存されるため、他のユーザーからは見えません
- 個人情報は名前のみで、他の個人情報は収集しません
- 外部サービスへのデータ送信は行いません
