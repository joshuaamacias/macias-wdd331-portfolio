/**
 * PostCSS Configuration
 *
 * PostCSS transforms your CSS using JavaScript plugins. It runs after you write
 * your CSS and before the browser sees it. Plugins run in order: first in the
 * array runs first. Order matters because each plugin works on the output of
 * the previous one.
 */
import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';
import postcssUrl from 'postcss-url';
import cssNano from 'cssnano';

export default {
    plugins: [
        /*
         * 1. postcss-import: Inlines @import rules by replacing them with the
         *    actual file contents. Run this first so other plugins see one
         *    combined stylesheet instead of separate files.
         */
        postcssImport,

        /*
         * 2. postcss-url: Rewrites url() paths. Here we fix font paths so that
         *    after build, references like ../fonts/ point to ./fonts/ in the
         *    output folder. Other urls are left unchanged.
         */
        postcssUrl({
            url: (asset) => {
                if (asset.url.startsWith('../fonts/')) {
                    return asset.url.replace('../fonts/', './fonts/');
                }
                return asset.url;
            }
        }),

        /*
         * 3. autoprefixer: Adds vendor prefixes (e.g. webkit, moz) based on
         *    .browserslistrc. Lets you write modern CSS without manually adding
         *    prefixes for older browsers.
         */
        autoprefixer,

        /*
         * 4. cssnano: Minifies CSS (removes whitespace, shortens values) to
         *    reduce file size. Run last so all other transforms are already done.
         */
        cssNano
    ]
};
