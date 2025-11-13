@echo off
setlocal enabledelayedexpansion

REM Caminho até a pasta 'main'
cd /d "C:\Users\nicol\nicolegrazzioli\projeto-angular"

set "PASTA=."
set "ARQUIVO_SAIDA=codigos.txt"

REM Apagar arquivo anterior, se existir
if exist "%ARQUIVO_SAIDA%" del "%ARQUIVO_SAIDA%"

REM Percorrer todos os arquivos na pasta e subpastas
for /R "%PASTA%" %%F in (*.xml *.iml *.ts *.html *.json *.css) do (
    echo - Endereço: %%F:>>"%ARQUIVO_SAIDA%"
    type "%%F" >>"%ARQUIVO_SAIDA%"
    echo.>>"%ARQUIVO_SAIDA%"
    echo.>>"%ARQUIVO_SAIDA%"
)

echo Finalizado. Arquivo gerado: %CD%\%ARQUIVO_SAIDA%
pause
