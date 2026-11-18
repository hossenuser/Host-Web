@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul || (echo Install Node.js LTS first: https://nodejs.org/ & pause & exit /b 1)
if not exist node_modules call npm install || goto :error
if not exist android (call npx cap add android || goto :error)
call npx cap sync android || goto :error
call npx cap open android || goto :error
exit /b 0
:error
echo Android project setup failed. See docs\BUILD-WINDOWS-11.md.
pause
exit /b 1
