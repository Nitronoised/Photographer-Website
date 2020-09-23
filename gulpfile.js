const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const cssnano = require("cssnano");
const concat = require("gulp-concat");
const terser = require("gulp-terser");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");

const { src, series, parallel, dest, watch } = require("gulp");

const jsPath = "src/js/**/*.js";
const cssPath = "src/css/*.css";

function copyHtml() {
  return src("src/*.html").pipe(gulp.dest("dist"));
}

function imgTask() {
  return src("src/img/*").pipe(imagemin()).pipe(gulp.dest("dist/img"));
}
function cssMin() {
  return src(cssPath)
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("dist/css"));
}

function jsTask() {
  return src(jsPath)
    .pipe(sourcemaps.init())
    .pipe(concat("all.js"))
    .pipe(terser())
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/assets/js"));
}

function cssTask() {
  return src(cssPath)
    .pipe(sourcemaps.init())
    .pipe(concat("style.css"))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(cssnano())
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/css"));
}

function watchTask() {
  watch([cssPath, jsPath], { interval: 1000 }, parallel(cssTask, jsTask));
}

exports.cssTask = cssTask;
exports.cssMin = cssMin;
exports.jsTask = jsTask;
exports.imgTask = imgTask;
exports.copyHtml = copyHtml;
exports.default = series(
  parallel(copyHtml, imgTask, jsTask, cssTask, cssMin),
  watchTask
);
