@echo off
title Inicializando PerguntAI...

echo ============================================
echo   INICIANDO SISTEMA PERGUNTAI
echo ============================================
echo.

set "SCRIPT_DIR=%~dp0"
set "SHORTCUT=%USERPROFILE%\Desktop\PerguntAI.lnk"

REM -----------------------------------------------------------
REM CRIA ATAHO APENAS NA PRIMEIRA EXECUÇÃO
REM -----------------------------------------------------------
if not exist "%SHORTCUT%" (
    echo Criando atalho na área de trabalho...
    powershell -Command "$s = (New-Object -COM WScript.Shell).CreateShortcut('%SHORTCUT%'); $s.TargetPath = '%SCRIPT_DIR%iniciar-perguntai.bat'; $s.WorkingDirectory = '%SCRIPT_DIR%'; $s.IconLocation = '%SCRIPT_DIR%frontend\favicon.ico'; $s.Description = 'PerguntAI - Iniciar Sistema Completo'; $s.Save()"
    echo ✓ Atalho criado!
    echo.
)

REM -----------------------------------------------------------
REM PARAR SERVIÇOS EXISTENTES (SE NECESSÁRIO)
REM -----------------------------------------------------------
echo Parando servicos existentes...
taskkill /F /IM ollama.exe >nul 2>&1
timeout /t 2 >nul

REM Encontrar e matar processos Node.js nas portas específicas
for /f "tokens=5" %%i in ('netstat -ano ^| find ":3000" ^| find "LISTENING"') do taskkill /F /PID %%i >nul 2>&1
for /f "tokens=5" %%i in ('netstat -ano ^| find ":5173" ^| find "LISTENING"') do taskkill /F /PID %%i >nul 2>&1

timeout /t 3 >nul

REM -----------------------------------------------------------
REM INICIAR TODOS OS SERVIÇOS
REM -----------------------------------------------------------
echo Iniciando Ollama...
start "Ollama Server" cmd /k "ollama serve"

timeout /t 3 >nul

echo Iniciando Backend...
start "PerguntAI Backend" cmd /k "cd /D "%SCRIPT_DIR%backend" && npm run dev"

timeout /t 2 >nul

echo Iniciando Frontend...
start "PerguntAI Frontend" cmd /k "cd /D "%SCRIPT_DIR%frontend" && npm run dev"

REM -----------------------------------------------------------
REM AGUARDAR E ABRIR NAVEGADOR
REM -----------------------------------------------------------
echo.
echo Aguardando servicos inicializarem...
timeout /t 10 >nul

echo Abrindo PerguntAI no navegador...
start http://localhost:5173/

echo.
echo ============================================
echo  SISTEMA INICIADO COM SUCESSO!
echo ============================================
echo.
echo Servicos ativos:
echo - Ollama: http://localhost:11434
echo - Backend: http://localhost:3000  
echo - Frontend: http://localhost:5173
echo.
echo Para parar: Feche as janelas dos servicos
echo Para reiniciar: Clique novamente no atalho
echo.
pause