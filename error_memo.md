# エラーまとめ

## エラー1
```
./src/index.js
Attempted import error: './App' does not contain a default export (imported as 'App').
```
- webの説明通りにコピペして使うとapp.jsにexport宣言がないためエラーが発生  
- App.jsにexport宣言を書くことにより解決  
    - 説明通りにやってのにエラーが出たので、コードを見比べたりしてコストを割いてしまった。  
    - しっかりと自分でも注意深くコードとエラー文を読んでいきたい。
