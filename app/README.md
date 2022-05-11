# River photo gauge

This is a simple web frontend for river photo gauge.

## Configuring

The app uses following environment variables (default values can be found in `.env` file):

- **VITE_GAUGE_LINK** - Link to gauge in description section of the page
- **VITE_SECTION_TITLE** - Name of river section in description section of the page
- **VITE_API_URL** - river photo gauge JSON API URL
- **VITE_IMAGE_URL_BASE** - base path for photo gauge photos, ends with trailing slash
- **VITE_DEFAULT_LANGUAGE** - default UI language

## Translations

The app supports multiple languages. The simplest way to change app language is to add `?lng=<language_code>` to query string. The value will be saved and used during next visits. Other means of detecting language are listed [here](https://github.com/i18next/i18next-browser-languageDetector).

To add a translation, add new json translation file to [src/i18n/resources](src/i18n/resources) directory and then modify [src/i18n/resources/index.ts](src/i18n/resources/index.ts) file.

Supported languages:

- English
- German (via google translate)

## Development

First, make sure that `pnpm` package manager is [installed](https://pnpm.io/installation) globally.

Then install all the dependencies by running `pnpm install` in app directory.

Run `pnpm start` to launch app in development mode, or run `pnpm preview` to run app in production preview mode

## Deploying

- If necessary, create `.env.local` file in app directory and override configuration variables
- If you are going to deploy this page under some path and not under the domain root, you should set `BASE_PATH` variable in `.env.local` file. Read more [here](https://vitejs.dev/guide/build.html#public-base-path)
- Run `pnpm build` and deploy contents of resulting `/dist` directory to your desired destination

## License

[MIT](/LICENSE)
