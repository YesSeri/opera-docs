$compress = @{
  Path = "./out/*"
  CompressionLevel = "NoCompression"
  DestinationPath = "./out.zip"
}
Compress-Archive @compress
  