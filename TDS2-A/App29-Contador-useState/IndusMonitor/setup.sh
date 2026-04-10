#!/bin/bash

# Script de inicialização do IndusMonitor 4.0
# Unix/Linux/Mac shell script

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║          IndusMonitor 4.0 - Initialization Script             ║"
echo "║                    SENAI 2026                                 ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Verificar se Node.js está instalado
echo "[1/3] Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado!"
    echo "📥 Baixe em https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node --version)
echo "✅ Node.js encontrado: $NODE_VERSION"

echo ""
echo "[2/3] Verificando npm..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm não está funcionando!"
    exit 1
fi

NPM_VERSION=$(npm --version)
echo "✅ npm encontrado: $NPM_VERSION"

echo ""
echo "[3/3] Instalando dependências..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências!"
    exit 1
fi

echo "✅ Dependências instaladas com sucesso!"

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║            Configuração Completa!                             ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "🚀 Para iniciar a aplicação, execute:"
echo ""
echo "    npm start"
echo ""
echo "📱 Ou para plataforma específica:"
echo ""
echo "    npm run android    (Android)"
echo "    npm run ios        (iOS)"
echo "    npm run web        (Web)"
echo ""
echo "📖 Consulte QUICK_START.md para mais informações."
echo ""
