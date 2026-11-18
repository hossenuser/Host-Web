@echo off
setlocal
cd /d "%~dp0"
echo ========================================
echo MH Apps Gallery - Windows Build Kit
echo ========================================
where node >nul 2>nul || (echo ERROR: Install Node.js LTS first: https://nodejs.org/ & pause & exit /b 1)
if not exist node_modules (echo Installing project dependencies... & call npm install || goto :error)
echo Building Windows installer...
call npm run desktop:win || goto :error
echo.
echo SUCCESS. Installer output: release\MH-Apps-Gallery-Setup.exe
pause
exit /b 0
:error
echo.
echo Build failed. Review the error above and the docs\BUILD-WINDOWS-11.md guide.
pause
exit /b 1
