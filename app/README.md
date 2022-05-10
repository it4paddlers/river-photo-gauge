# River photo gauge

This is a simple web frontend for river photo gauge

## Configuring

The app uses following environment variables (default values can be found in `.env` file):

- **VITE_GAUGE_LINK** - Link to gauge in description section of the page
- **VITE_SECTION_TITLE** - Name of river section in description section of the page
- **VITE_API_URL** - river photo gauge JSON API URL
- **VITE_IMAGE_URL_BASE** - base path for photo gauge photos, ends with trailing slash

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
