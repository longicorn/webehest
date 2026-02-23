# webhest

LAN PC側でChormeでアクセスしサイトを表示、スマホでその結果を表示するためのスクリプト

- Deno
- Chrome

## 使い方
### set Chrome
```
$ mkdir $HOME/.config/chrome-proxy
```

chromeを起動してextensionをインストールする
```
$ google-chrome --remote-debugging-port=9222 --user-data-dir="$HOME/.config/chrome-proxy"
```

あとは、 `sh run.sh` で起動すれば良い
