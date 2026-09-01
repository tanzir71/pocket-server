const versionTargets = document.querySelectorAll('[data-release-version]');
const shaTargets = document.querySelectorAll('[data-release-sha]');
const sizeTargets = document.querySelectorAll('[data-release-size]');
const copyButton = document.querySelector('[data-copy-checksum]');
let checksum = '';

fetch('release.json')
  .then((response) => {
    if (!response.ok) throw new Error('Release metadata unavailable');
    return response.json();
  })
  .then((release) => {
    versionTargets.forEach((target) => { target.textContent = release.version; });
    checksum = release.sha256;
    shaTargets.forEach((target) => { target.textContent = checksum; });
    if (release.sizeBytes) {
      const size = `${(release.sizeBytes / 1024 / 1024).toFixed(1)} MB download`;
      sizeTargets.forEach((target) => { target.textContent = size; });
    }
  })
  .catch(() => {
    shaTargets.forEach((target) => { target.textContent = 'See checksum file'; });
  });

copyButton?.addEventListener('click', async () => {
  if (!checksum) return;
  try {
    await navigator.clipboard.writeText(checksum);
    const label = copyButton.querySelector('span');
    label.textContent = 'Copied';
    window.setTimeout(() => { label.textContent = 'Copy'; }, 1600);
  } catch {
    window.location.href = 'downloads/pocket-server-latest.apk.sha256';
  }
});
