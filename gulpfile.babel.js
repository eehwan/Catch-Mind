import gulp from "gulp";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import minifyCSS from "gulp-csso";
import del from "del";
import bro from "gulp-browserify";
import babelify from "babelify";

const paths = {
  styles: {
    src: "assets/scss/styles.scss",
    dest: "src/static",
    watch: "assets/scss/**/*.scss"
  },
  js: {
    src: "assets/js/main.js",
    dest: "src/static",
    watch:"assets/js/**/*.js"
  }
};

const clean = () => del(["src/static"])
const styles = () =>
  gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions", "safari 7", "IE 10"],
        castcade: false
      })
    )
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.styles.dest));

const js = () =>
      gulp
        .src(paths.js.src)
        .pipe(
          bro({
            transform: [
              babelify.configure({
                presets:["@babel/preset-env"]
              })
            ]
          })
        )
        .pipe(gulp.dest(paths.js.dest))

const watchFiles = () => {
  gulp.watch(paths.styles.watch, styles);
  gulp.watch(paths.js.watch, js);
}

export const dev = gulp.series(clean, styles, js, watchFiles)

export const build = gulp.series(clean, styles, js);