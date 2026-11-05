# Publishing

A DSH plugin does **not** need npm. The recommended public distribution is a GitHub repository plus a GitHub Release containing a versioned `.tgz` and `SHA256SUMS`; npm is optional and only shortens the install command.

This is the same model used by [qiaomu-rss-dsh](https://github.com/joeseesun/qiaomu-rss-dsh), which explicitly does not publish to npm. [modsearch](https://github.com/liustack/modsearch) is the npm-published alternative; both are valid.

## One-time setup

### 1. Create the GitHub repository

Open:

<https://github.com/new?name=signalforge-dsh&visibility=public>

Create an **empty** public repository named `signalforge-dsh` under your account (no README, no `.gitignore`, no license file — the release scripts supply them).

If your account or organization is not `sunstdot`, update `package.json` repository/homepage/bugs and the README install URL before publishing.

### 2. Push the source

From the `dsh-plugin` directory:

```bash
./scripts/publish-github.sh sunstdot/signalforge-dsh
```

The script packs the published files, creates or updates a clean Git repository in a temporary directory, commits them, and pushes `main`. It requires SSH push access (`git@github.com:...`). Set `GITHUB_REMOTE` to use HTTPS instead:

```bash
GITHUB_REMOTE=https://github.com/sunstdot/signalforge-dsh.git \
  ./scripts/publish-github.sh sunstdot/signalforge-dsh
```

### 3. Build the Release assets

```bash
./scripts/pack-release.sh
```

This writes:

```text
dist/dsh-signalforge-0.1.0.tgz
dist/SHA256SUMS
```

Open the repository's **Releases → Draft a new release**, create tag `v0.1.0`, upload both files, and publish. Users can then install the exact tarball and verify its checksum.

### 4. Publish to npm (optional)

Only do this if you want the `dsh plugin add dsh-signalforge` shortcut. Make sure you are logged in to the **public** registry, not a corporate mirror:

```bash
npm whoami --registry=https://registry.npmjs.org
# if this fails:
npm login --registry=https://registry.npmjs.org

npm publish --registry=https://registry.npmjs.org --access public
```

On a machine whose `.npmrc` points at a corporate registry, the explicit `--registry` flag is required; without it the package goes to the corporate registry and external users cannot install it.

If you want tag-based npm publishes from GitHub Actions, add an `NPM_TOKEN` repository secret. The included workflow (`.github/workflows/publish.yml`) runs on `v*` tags. It is not needed for GitHub Release installs.

## Every release

1. Update `version` in `package.json` and add a section to `CHANGELOG.md`.
2. Run the checks:

   ```bash
   npm test
   npm run check
   npm pack --dry-run
   ```

3. Push the source snapshot:

   ```bash
   ./scripts/publish-github.sh sunstdot/signalforge-dsh
   ```

4. Build the release assets:

   ```bash
   ./scripts/pack-release.sh
   ```

5. Create a GitHub Release for the new tag and upload `dist/dsh-signalforge-<version>.tgz` plus `dist/SHA256SUMS`.

6. Optional: publish npm with `npm publish --registry=https://registry.npmjs.org --access public`.

## Verify an install

Release tarball (recommended):

```bash
shasum -a 256 -c SHA256SUMS
dsh plugin --profile desktop add "$PWD/dsh-signalforge-0.1.0.tgz"
```

GitHub source:

```bash
dsh plugin --profile desktop add "github:sunstdot/signalforge-dsh"
```

npm (if published):

```bash
dsh plugin --profile desktop add dsh-signalforge
```

`dsh plugin add` installs the package into the profile and selects its bundle. Refresh the Harness page or restart the app, then open **今日 AI 情报** in the sidebar.

## Compatibility

The package declares:

```json
"engines": { "dsh": "^0.2.1-rc.5" }
```

DSH checks this before activating the bundle. Bump the range when you have verified a newer runtime; users on an incompatible version can grant an exact-version exemption through the plugin manager if they accept the risk.

## Package contents

`npm pack` includes only the runtime files, locale/icon resources, README/license/changelog, install helper, and development scripts. `.github` and `.gitignore` are copied into the GitHub snapshot by `scripts/publish-github.sh`; they are not part of the npm tarball.
