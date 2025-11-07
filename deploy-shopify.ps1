# Shopify App Deploy Script
# Run this in PowerShell to deploy the app configuration

Write-Host "Deploying SEOLOGY app configuration to Shopify..." -ForegroundColor Cyan
Write-Host ""

# Change to project directory
Set-Location "C:\Users\manna\Downloads\iimagined.webflow (1)"

# Run Shopify deploy
shopify app deploy

Write-Host ""
Write-Host "Deployment complete!" -ForegroundColor Green
