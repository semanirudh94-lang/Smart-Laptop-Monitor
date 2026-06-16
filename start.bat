@echo off
start agents\monitor.exe
timeout /t 2 > nul
start dashboard\index.html
