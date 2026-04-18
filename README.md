# Web Extensions

[![CI](https://github.com/ponko2/web-extensions/actions/workflows/ci.yml/badge.svg)](https://github.com/ponko2/web-extensions/actions/workflows/ci.yml)
[![CodeQL](https://github.com/ponko2/web-extensions/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/ponko2/web-extensions/actions/workflows/github-code-scanning/codeql)

This repository contains multiple browser extensions for Chrome and Firefox built using the WebExtensions API.

## Available Extensions

### [&amp;emi=AN1VRQENFRJN5](packages/and-emi-an1vrqenfrjn5)

Automatically adds `&emi=AN1VRQENFRJN5` to Amazon search URLs.

### [&amp;udm=14](packages/and-udm-14)

Automatically adds `&udm=14` to Google search URLs.

### [Click All for GitHub](packages/click-all-for-github)

Click all matching elements at once with Alt+Click.

### [Prevent Accidental Submit](packages/prevent-accidental-submit)

Prevent accidental form submissions by disabling Enter-to-submit behavior and using Ctrl/Cmd + Enter for submission.

## Usage

This repository is not published on browser extension stores, so extensions must be built locally before use.

### Setup

#### Install [Vite+](https://viteplus.dev/)

Install Vite+ globally (or as configured in your environment).

```sh
curl -fsSL https://vite.plus | bash
```

#### Install dependencies

```sh
vp install
```

### Build

#### Build all extensions

```sh
vp run -r build
```

#### Build a specific extension

Replace `<package-name>` with a directory name in `packages`.

```sh
vp run <package-name>#build
```

### Load into Chrome / Firefox

After building, each extension will be output to:

```
./packages/<package-name>/.output/chrome-mv3
```

#### Chrome

1. Open `chrome://extensions/`
1. Enable Developer mode
1. Click Load unpacked
1. Select the `.output/chrome-mv3` directory

#### Firefox

1. Open `about:debugging#/runtime/this-firefox`
1. Click Load Temporary Add-on
1. Select the `manifest.json` file inside `.output/chrome-mv3`

### Update

After making changes:

1. Rebuild the extension
1. Reload it in the browser (or remove and re-add if needed)
