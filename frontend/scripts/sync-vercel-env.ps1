param(
  [string]$Environment = "development"
)

$required = @(
  "BETTER_AUTH_SECRET",
  "BETTER_AUTH_URL",
  "TURSO_DATABASE_URL",
  "TURSO_AUTH_TOKEN"
)

foreach ($key in $required) {
  $value = [Environment]::GetEnvironmentVariable($key)

  if ([string]::IsNullOrWhiteSpace($value)) {
    Write-Host "Skipping $key because it is not set in the current shell."
    continue
  }

  if ($key -eq "TURSO_AUTH_TOKEN") {
    $value | vercel env add $key $Environment --sensitive
  } else {
    $value | vercel env add $key $Environment
  }
}
