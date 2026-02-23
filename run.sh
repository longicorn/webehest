#!/bin/bash

function on_signal_interrupt(){
  echo interrupted. shutdown ;
  akill 'remote-debugging-port=9222'
}
trap on_signal_interrupt 2

google-chrome --remote-debugging-port=9222 --user-data-dir="$HOME/.config/chrome-proxy" ----no-first-run --new-window --headless &
sleep 2

deno run -A webhest.js 1>/dev/null 2>&1
