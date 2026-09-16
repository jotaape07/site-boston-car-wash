@echo off
title Boston Car Wash - Iniciar Site
cd /d "%~dp0"

where python >nul 2>nul
if errorlevel 1 (
    echo.
    echo Python nao foi encontrado.
    echo Instale o Python 3.11 ou superior e marque a opcao "Add Python to PATH".
    echo Depois execute este arquivo novamente.
    echo.
    pause
    exit /b
)

if not exist ".venv\Scripts\python.exe" (
    echo Criando ambiente virtual...
    python -m venv .venv
)

echo Instalando dependencias...
call .venv\Scripts\activate.bat
python -m pip install --upgrade pip
pip install -r requirements.txt

echo.
echo Iniciando Boston Car Wash...
echo O site abrira em http://127.0.0.1:5000
echo Nao feche esta janela enquanto estiver usando o site.
echo.

start "" "http://127.0.0.1:5000"
python app.py
pause
