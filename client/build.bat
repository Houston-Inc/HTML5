:: This script builds the whole sipoo-web stack (palkki, sipoo, concept, sipoo2)
@echo off
echo.Creating output directory out/
rmdir /S /Q out
mkdir out
mkdir out\app
cmd /C "steal\js app\scripts\build.js"
echo.BUILD SUCCESSFUL!
echo on




