
## Usage

__Install the dependencies:__

`npm install`

__Test:__

`npm test`

__Development mode with livereload:__

`npm run watch` or just `npm start`

__When you are done, create a production ready version of the JS bundle:__

`npm run build`

__Deploy on Github pages with one command:__

`npm run deploy`

- CSS processing via [PostCSS](https://github.com/postcss/postcss)
  - cssnano for minification
  - nested
  - extend
  - vars
  - autoprefixer
- gulpfile written in ES6 (ES2015)
- better folder structure
- no predefined AJAX libraries (use [Fetch](https://github.com/github/fetch) or [Superagent](https://github.com/visionmedia/superagent) if you need one).

Good Reads:
https://toddmotto.com/react-create-class-versus-component/
http://stackoverflow.com/questions/25494365/es6-module-export-options

Icons:
https://design.google.com/icons/

onClick={() => this.props.addAlert('error')} 