#!/bin/bash
# 启动本地 HTTP 服务器测试落地页

PORT=${1:-8080}

echo "🌐 启动 HTTP 服务器在端口 $PORT..."
echo "请在浏览器中访问: http://localhost:$PORT"
echo "按 Ctrl+C 停止服务器"

# 检查是否有 Python
if command -v python3 &> /dev/null; then
    python3 -m http.server $PORT
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer $PORT
else
    echo "⚠️ 未找到 Python，请手动安装或使用其他 Web 服务器"
    exit 1
fi
