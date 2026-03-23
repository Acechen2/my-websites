# 读取配置
$config = Get-Content 'C:\Users\DELL\Documents\public-ip-mailer\config.json' | ConvertFrom-Json

# 读取并解密密码
$securePassword = Get-Content 'C:\Users\DELL\Documents\public-ip-mailer\smtp-password.txt' | ConvertTo-SecureString
$credential = New-Object System.Management.Automation.PSCredential($config.smtp.username, $securePassword)

# 创建SMTP客户端
$smtp = New-Object System.Net.Mail.SmtpClient($config.smtp.host, $config.smtp.port)
$smtp.EnableSsl = $config.smtp.enableSsl
$smtp.Credentials = $credential

# 创建邮件
$message = New-Object System.Net.Mail.MailMessage
$message.From = $config.mail.from
$message.To.Add('785979812@qq.com')
$message.Subject = 'AI大模型课件'
$message.Body = 'Please find the AI Large Model courseware attached.'
$message.IsBodyHtml = $false

# 添加附件
$attachment = New-Object System.Net.Mail.Attachment('C:\Users\DELL\WorkBuddy\Claw\ai-large-model-course.html')
$message.Attachments.Add($attachment)

# 发送邮件
$smtp.Send($message)

# 清理
$attachment.Dispose()
$message.Dispose()

Write-Host '邮件发送成功！' -ForegroundColor Green
