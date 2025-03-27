@echo off

:: Путь к текущему скрипту
set SCRIPT_PATH=%~f0

:: Папка автозагрузки
set AUTOSTART_FOLDER=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup

:: Копирование скрипта в папку автозагрузки
copy "%SCRIPT_PATH%" "%AUTOSTART_FOLDER%\MyScript.bat"

:: Получение IP-адреса
for /f "tokens=14" %%i in ('ipconfig ^| findstr /i "IPv4"') do set IP_ADDRESS=%%i

:: Вывод IP-адреса
echo Ваш локальный IP-адрес: %IP_ADDRESS%

start https://www.youtube.com/watch?v=GBIIQ0kP15E