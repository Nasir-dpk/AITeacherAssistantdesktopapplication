# Captures the primary screen to a PNG (used for documentation evidence).
# Usage:  .\scripts\screenshot.ps1 -Path .\docs\evidence\app-window.png
param(
    [string]$Path = ".\docs\evidence\screenshot.png"
)

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$parent = Split-Path -Parent $Path
if ($parent) { New-Item -ItemType Directory -Force -Path $parent | Out-Null }

$bounds = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
$bitmap = New-Object System.Drawing.Bitmap $bounds.Width, $bounds.Height
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.CopyFromScreen($bounds.Location, [System.Drawing.Point]::Empty, $bounds.Size)
$bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
$graphics.Dispose()
$bitmap.Dispose()

Write-Output "Screenshot saved: $Path"
