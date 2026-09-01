# Pocket Server downloads and GitHub Pages

This public repository intentionally contains no Android source code, Cloudflare credentials, or signing secrets. It contains the static download website, the signed universal APK, release metadata, and SHA-256 checksums.

Version 1.1 adds persistent multi-site serving, Tailscale address discovery, and an embedded Cloudflare Tunnel connector. All Cloudflare account data is entered and encrypted locally in the installed app; none belongs in this repository.

## Publish

1. Create a **public** GitHub repository and push this directory to its `main` branch.
2. In **Settings → Pages**, set the source to **GitHub Actions**.
3. The included workflow publishes the site on every push to `main`.

The APK is served directly by GitHub Pages at `downloads/pocket-server-latest.apk`. A versioned copy is retained so old release links remain stable.

## Update an APK

Run this from the separate private source repository:

```powershell
./scripts/Build-Release.ps1 -PublicRepositoryPath ../public-downloads
```

Review the changed APK, checksum, and `release.json`, then commit and push this public repository. Never copy `.jks`, `keystore.properties`, or Android source files here.
