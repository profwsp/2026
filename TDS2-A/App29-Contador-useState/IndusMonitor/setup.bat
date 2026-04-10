@echo off
REM Script de inicialização do IndusMonitor 4.0
REM Windows batch file

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║          IndusMonitor 4.0 - Initialization Script             ║
echo ║                    SENAI 2026                                 ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Verificar se Node.js está instalado
echo [1/3] Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js não está instalado!
    echo 📥 Baixe em https://nodejs.org
    pause
    exit /b 1
) else (
    echo ✅ Node.js encontrado: %NODE_VERSION%
)

echo.
echo [2/3] Verificando npm...
call npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm não está funcionando!
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo ✅ npm encontrado: %NPM_VERSION%
)

echo.
echo [3/3] Instalando dependências...
call npm install
if errorlevel 1 (
    echo ❌ Erro ao instalar dependências!
    pause
    exit /b 1
) else (
    echo ✅ Dependências instaladas com sucesso!
)

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║            Configuração Completa!                             ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo 🚀 Para iniciar a aplicação, execute:
echo.
echo    npm start
echo.
echo 📱 Ou para plataforma específica:
echo.
echo    npm run android    (Android)
echo    npm run ios        (iOS)
echo    npm run web        (Web)
echo.
echo 📖 Consulte QUICK_START.md para mais informações.
echo.
pause
