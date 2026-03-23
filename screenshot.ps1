Add-Type -AssemblyName System.Windows.Forms
$screen = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
$bmp = New-Object System.Drawing.Bitmap($screen.Width, $screen.Height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.CopyFromScreen($screen.Location, (New-Object System.Drawing.Point(0,0)), $screen.Size)
$bmp.Save("c:\Users\DELL\WorkBuddy\Claw\desktop.png")
$bmp.Dispose()
