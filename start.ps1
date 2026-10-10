Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "    Starting Rakshak AI (HackNowa 2026 Prototype)       " -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Cyan

# Start Backend
Write-Host "Starting FastAPI Backend on http://localhost:8001 ..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot/backend'; python -m uvicorn main:app --reload --host 0.0.0.0 --port 8001"

Start-Sleep -Seconds 3

# Start Frontend
Write-Host "Starting Vite Frontend on http://localhost:5173 ..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot/frontend'; npm run dev"

Write-Host ""
Write-Host "Rakshak AI services are launching:" -ForegroundColor Cyan
Write-Host "  Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "  Backend:  http://localhost:8001" -ForegroundColor White
Write-Host "  API Docs: http://localhost:8001/docs" -ForegroundColor White
Write-Host "========================================================" -ForegroundColor Cyan

Start-Process "http://localhost:5173"
