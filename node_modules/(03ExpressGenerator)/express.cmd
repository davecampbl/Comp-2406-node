@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\node_modules\express-generator\bin\express" %*
) ELSE (
  node  "%~dp0\node_modules\express-generator\bin\express" %*
)