# Utility commands

## Zip file Powershell

```powershell
Compress-Archive -Path .\out\ -DestinationPath ./files.zip
```

## Transfer Zip File

```powershell
scp -i SSH_FILE FROM_FILE TO_LOCATION user:pass@ip:port:/home/location
```

## Unzip

```bash
unzip FILE
```