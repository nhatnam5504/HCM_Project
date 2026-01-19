#!/bin/bash
# Script tự động đẩy Environment Variables từ .env.local lên Vercel
# Chạy: bash deploy-env-to-vercel.sh

echo "🚀 Bắt đầu đẩy Environment Variables lên Vercel..."

# Kiểm tra file .env.local
if [ ! -f ".env.local" ]; then
    echo "❌ Không tìm thấy file .env.local!"
    exit 1
fi

# Kiểm tra Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "⚠️  Vercel CLI chưa được cài đặt. Đang cài đặt..."
    npm install -g vercel
fi

# Đọc và đếm biến môi trường
env_count=$(grep -v "^#" .env.local | grep "=" | wc -l)
echo ""
echo "📋 Tìm thấy $env_count biến môi trường"
echo ""

# Hiển thị danh sách (ẩn giá trị)
echo "Danh sách biến:"
grep -v "^#" .env.local | grep "=" | cut -d '=' -f 1 | while read key; do
    echo "   ✓ $key"
done

echo ""
echo "⚠️  LƯU Ý: Script này sẽ thêm biến vào môi trường PRODUCTION"
echo ""
read -p "Tiếp tục? (y/n): " confirm

if [ "$confirm" != "y" ]; then
    echo "❌ Đã hủy!"
    exit 0
fi

# Login và link project
echo ""
echo "🔐 Kiểm tra Vercel authentication..."
vercel whoami || vercel login

echo ""
echo "🔗 Link project với Vercel..."
vercel link

# Thêm từng biến môi trường
echo ""
echo "📤 Đang đẩy environment variables..."

success=0
fail=0

while IFS='=' read -r key value; do
    # Bỏ qua comment và dòng trống
    if [[ $key =~ ^# ]] || [ -z "$key" ]; then
        continue
    fi
    
    # Trim whitespace
    key=$(echo "$key" | xargs)
    value=$(echo "$value" | xargs)
    
    echo "   Adding: $key"
    
    # Thêm vào Vercel (production)
    echo "$value" | vercel env add "$key" production 2>/dev/null
    
    if [ $? -eq 0 ]; then
        ((success++))
        echo "   ✓ $key - Thành công"
    else
        ((fail++))
        echo "   ✗ $key - Thất bại (có thể đã tồn tại)"
    fi
    
done < <(grep -v "^#" .env.local | grep "=")

echo ""
echo "✅ Hoàn tất!"
echo "   - Thành công: $success biến"
echo "   - Thất bại/Đã tồn tại: $fail biến"

echo ""
echo "📌 Bước tiếp theo:"
echo "   1. Kiểm tra tại: https://vercel.com/dashboard (Settings > Environment Variables)"
echo "   2. Nếu muốn thêm cho Preview/Development, sửa 'production' thành 'preview' hoặc 'development'"
echo "   3. Deploy: vercel --prod"
echo ""
