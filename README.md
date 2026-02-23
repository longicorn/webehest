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

### スマホ側
`http://127.0.x.y:<port>/?url=<url>` にアクセスすれば表示されるはず

default port: 8080

### bookmarklet
```
javascript:(function(){
  var pc_ip = "192.168.x.y:<port>";
  var current_url = window.location.href;
  window.location.href = "http://" + pc_ip + "/?url=" + encodeURIComponent(current_url);
  void(0);
})(); 
```

```
javascript:(function(){
  var pc_ip = "192.168.x.y:<port>";
  var current_url = window.location.href;
  var target = "http://" + pc_ip + "/?url=" + encodeURIComponent(current_url);
  var newWin = window.open(target, '_blank');
  if(!newWin || newWin.closed || typeof newWin.closed=='undefined') {
      alert('ポップアップがブロックされました。ブラウザの設定で許可してください。');
  }
})();
```
