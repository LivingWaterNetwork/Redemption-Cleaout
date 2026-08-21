#!/bin/bash
# Clean rebuild + restart helper (local review only).
set -u
cd "$(dirname "$0")"

# Free port 3000. `ss -p` needs privileges we don't have in this sandbox, so
# match the server process list instead — anchored on "next-server" and the
# npm/sh wrappers, never on a bare "next" that would match this script.
PIDS=$(ps -eo pid,args | grep -E 'next-server|next start -p 3000' | grep -v grep | awk '{print $1}')
for p in $PIDS; do kill -9 "$p" 2>/dev/null; done
sleep 3

rm -rf .next
npm run build > /tmp/build-out.log 2>&1
echo "build exit=$?"
tail -4 /tmp/build-out.log

setsid npx --no-install next start -p 3000 > /tmp/server.log 2>&1 < /dev/null &
for i in $(seq 1 40); do
  if curl -sf -o /dev/null http://127.0.0.1:3000; then echo "server up"; break; fi
  sleep 1
done

CSS=$(curl -s http://127.0.0.1:3000 | grep -o '/_next/static/chunks/[^"]*\.css' | head -1)
echo "css ref: $CSS"
echo "css bytes: $(curl -s "http://127.0.0.1:3000$CSS" | wc -c)"
