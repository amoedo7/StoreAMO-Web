#!/usr/bin/env bash
set -euo pipefail

python - <<'PY'
import json
from pathlib import Path

path = Path('.amo')
data = json.loads(path.read_text(encoding='utf-8'))
assert data.get('schema') == 'desarrollamo.amo.v1'
assert data.get('id') == 'storeamo-web'
checks = data.get('health', {}).get('checks', [])
assert isinstance(checks, list) and checks
assert any(c.get('command') == 'bash scripts/autocheck.sh' for c in checks if isinstance(c, dict))
assert data.get('policy', {}).get('self_declared_pass_allowed') is False
PY

node --check app.js
node --check catalog-cache.js

python - <<'PY'
from html.parser import HTMLParser
from pathlib import Path

html = Path('index.html').read_text(encoding='utf-8')
HTMLParser().feed(html)
assert '<script>' not in html
assert '<script ' in html or '<script\n' in html, 'expected external script tags are missing'
print('HTML OK')
PY
