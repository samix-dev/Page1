@echo off
setlocal

REM Navigate to the source directory
cd ".\MyLove\"

REM Execute ng build and check for errors
call npm install  --legacy-peer-deps
@REM  call npm install  --registry="https://package-mirror.liara.ir/repository/npm/"
call ng build --configuration production --output-path ./../docs
if %errorlevel% neq 0 (
    echo Build failed!
    exit /b %errorlevel%
)

REM Copy files using xcopy with the /y switch to overwrite existing files
xcopy ".\..\docs\browser\" ".\..\docs\" /s /e /h /i /y
if %errorlevel% neq 0 (
    echo Copy failed!
    exit /b %errorlevel%
)

echo Build and copy successful!
pause
endlocal