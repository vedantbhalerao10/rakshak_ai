@echo off
echo ========================================================
echo       Starting Rakshak AI (HackNowa 2026 Prototype)
echo ========================================================
echo.

:: Start Backend
echo Starting FastAPI Backend on http://localhost:8001 ...
start "Rakshak AI - Backend" cmd /k "cd backend && python -m uvicorn main:app --reload --host 0.0.0.0 --port 8001"

:: Wait 3 seconds
timeout /t 3 /nobreak >nul

:: Start Frontend
echo Starting Vite Frontend on http://localhost:5173 ...
start "Rakshak AI - Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================================
echo Both servers are starting!
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:8001
echo API Docs: http://localhost:8001/docs
echo ========================================================
echo Press any key to open the app in your default browser...
pause >nul
start http://localhost:5173
