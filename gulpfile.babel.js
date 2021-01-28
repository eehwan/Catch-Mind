import gulp from "gulp";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";

const paths = {
  styles: {
    src: "assets/scss/styles.scss",
    dest: "src/static",
    watch: "assets/scss/**/*.scss"
  },
};

function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions", "safari 7", "IE 10"],
        castcade: false
      })
    )
    .pipe(gulp.dest(paths.styles.dest));
}
function watchFiles() {
  gulp.watch(paths.styles.watch, styles)
}

const dev = gulp.series([styles, watchFiles])

export default dev;