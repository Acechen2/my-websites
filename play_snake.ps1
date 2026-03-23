Add-Type -TypeDefinition @'
using System;
using System.Runtime.InteropServices;
public class KeyBoard {
    [DllImport("user32.dll")]
    public static extern void keybd_event(byte bVk, byte bScan, uint dwFlags, UIntPtr dwExtraInfo);
    [DllImport("user32.dll")]
    public static extern IntPtr FindWindow(string lpClassName, string lpWindowName);
    [DllImport("user32.dll")]
    public static extern bool SetForegroundWindow(IntPtr hWnd);
    public const byte VK_RIGHT = 0x27;
    public const byte VK_DOWN = 0x28;
    public const byte VK_LEFT = 0x25;
    public const byte VK_UP = 0x26;
}
'@

# Find and activate browser window
$hwnd = [KeyBoard]::FindWindow("Chrome_Widget_Window_1", $null)
if ($hwnd -eq [IntPtr]::Zero) {
    $hwnd = [KeyBoard]::FindWindow("MozillaWindowClass", $null)
}
if ($hwnd -eq [IntPtr]::Zero) {
    $hwnd = [KeyBoard]::FindWindow("IEFrame", $null)
}
if ($hwnd -ne [IntPtr]::Zero) {
    [KeyBoard]::SetForegroundWindow($hwnd) | Out-Null
    Start-Sleep -Milliseconds 300
}

# Move right
for ($i = 0; $i -lt 5; $i++) {
    [KeyBoard]::keybd_event([KeyBoard]::VK_RIGHT, 0, 0, [UIntPtr]::Zero)
    Start-Sleep -Milliseconds 150
}

# Move down
[KeyBoard]::keybd_event([KeyBoard]::VK_DOWN, 0, 0, [UIntPtr]::Zero)
Start-Sleep -Milliseconds 150

Write-Host "Keys sent"