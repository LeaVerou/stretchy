/*
Build file to concat & minify files, compile SCSS and so on.
npm install gulp gulp-util gulp-uglify gulp-rename gulp-concat gulp-sourcemaps gulp-sass --save-dev
*/
// grab our gulp packages
var gulp  = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var sourcemaps = require("gulp-sourcemaps");

gulp.task("sass", function() {
	return gulp.src(["**/*.scss", "!node_modules/**"])
		.pipe(sourcemaps.init())
		.pipe(sass().on("error", sass.logError))
		.pipe(autoprefixer({
			browsers: ["last 2 versions"],
			cascade: false
		}))
		.pipe(rename({ extname: ".css" }))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("."));
});

gulp.task("minify", function() {
	var u = uglify({output: {
		max_line_len  : 1000 // to prevent merge conflicts
	}});

	u.on("error", function(error) {
		console.error(error);
		u.end();
	});

	return gulp.src(["stretchy.js"])
	.pipe(sourcemaps.init())
	.pipe(u)
	.pipe(rename("stretchy.min.js"))
	.pipe(sourcemaps.write("."))
	.pipe(gulp.dest("."));

});

gulp.task("watch", function() {
	gulp.watch(["**/*.js"], ["minify"]);
	gulp.watch(["**/*.scss"], ["sass"]);
});

gulp.task("default", ["sass", "minify"]);
