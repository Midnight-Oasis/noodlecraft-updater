Set-Alias -Name mynode -Value ".\bin\node-v20.11.1-win-x64\node.exe" -Scope Global
Set-Alias -Name mynpm -Value ".\bin\node-v20.11.1-win-x64\npm.cmd" -Scope Global

mynpm i
mynode .\dist\index.js