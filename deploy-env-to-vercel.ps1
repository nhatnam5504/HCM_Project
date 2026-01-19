# Script tu dong day Environment Variables tu .env.local len Vercel
# Chay: .\deploy-env-to-vercel.ps1

Write-Host "[START] Bat dau day Environment Variables len Vercel..." -ForegroundColor Cyan

# Kiem tra file .env.local co ton tai khong
if (-not (Test-Path ".env.local")) {
    Write-Host "[ERROR] Khong tim thay file .env.local!" -ForegroundColor Red
    exit 1
}

# Kiem tra Vercel CLI da cai chua
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelInstalled) {
    Write-Host "[WARNING] Vercel CLI chua duoc cai dat. Dang cai dat..." -ForegroundColor Yellow
    npm install -g vercel
}

# Doc file .env.local
$envVars = Get-Content ".env.local" | Where-Object { 
    $_ -match "^\s*[^#]" -and $_ -match "=" 
}

Write-Host ""
Write-Host "[INFO] Tim thay $($envVars.Count) bien moi truong:" -ForegroundColor Green

# Hien thi danh sach bien (an gia tri)
foreach ($line in $envVars) {
    $parts = $line -split "=", 2
    $key = $parts[0].Trim()
    Write-Host "   [OK] $key" -ForegroundColor Gray
}

Write-Host ""
Write-Host "[NOTE] Script nay se them bien vao moi truong PRODUCTION" -ForegroundColor Yellow
Write-Host "Ban co the chon them Preview va Development sau." -ForegroundColor Yellow
Write-Host ""

$confirm = Read-Host "Tiep tuc? (y/n)"
if ($confirm -ne "y") {
    Write-Host "[CANCEL] Da huy!" -ForegroundColor Red
    exit 0
}

# Dam bao da login va link project
Write-Host ""
Write-Host "[AUTH] Kiem tra Vercel authentication..." -ForegroundColor Cyan
vercel whoami 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Dang dang nhap Vercel..." -ForegroundColor Yellow
    vercel login
}

Write-Host ""
Write-Host "[LINK] Link project voi Vercel..." -ForegroundColor Cyan
vercel link

# Them tung bien moi truong
Write-Host ""
Write-Host "[UPLOAD] Dang day environment variables..." -ForegroundColor Cyan

$successCount = 0
$failCount = 0

foreach ($line in $envVars) {
    $parts = $line -split "=", 2
    if ($parts.Count -eq 2) {
        $key = $parts[0].Trim()
        $value = $parts[1].Trim()
        
        # Bo qua comment va dong trong
        if ($key -match "^#" -or [string]::IsNullOrWhiteSpace($key)) {
            continue
        }
        
        Write-Host "   Adding: $key" -ForegroundColor Gray
        
        # Them vao Vercel (production environment)
        $value | vercel env add $key production 2>$null
        
        if ($LASTEXITCODE -eq 0) {
            $successCount++
            Write-Host "   [SUCCESS] $key" -ForegroundColor Green
        } else {
            $failCount++
            Write-Host "   [SKIP] $key - Da ton tai hoac loi" -ForegroundColor Yellow
        }
    }
}

Write-Host ""
Write-Host "[DONE] Hoan tat!" -ForegroundColor Green
Write-Host "   - Thanh cong: $successCount bien" -ForegroundColor Green
Write-Host "   - That bai/Da ton tai: $failCount bien" -ForegroundColor Yellow

Write-Host ""
Write-Host "[NEXT] Buoc tiep theo:" -ForegroundColor Cyan
Write-Host "   1. Kiem tra tai: https://vercel.com/dashboard (Settings > Environment Variables)"
Write-Host "   2. Neu muon them cho Preview/Development, chay lai voi moi truong khac"
Write-Host "   3. Deploy: vercel --prod"
Write-Host ""
