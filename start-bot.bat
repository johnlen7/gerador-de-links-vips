@echo off
echo ========================================
echo  Gerador de Links VIP - Bot Telegram
echo ========================================
echo.
echo [1/3] Parando instancias anteriores do bot...
taskkill /F /IM node.exe 2>nul
if %errorlevel% equ 0 (
    echo ✓ Processos Node.js anteriores finalizados
) else (
    echo ! Nenhum processo Node.js encontrado
)

echo.
echo [2/3] Aguardando 3 segundos...
timeout /t 3 /nobreak > nul

echo.
echo [3/3] Iniciando o bot...
cd /d "%~dp0"
npm run dev
