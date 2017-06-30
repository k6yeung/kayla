const gulp = require("gulp");
const ts = require("gulp-typescript");
const tslint = require("gulp-tslint");
const mocha = require("gulp-mocha");


gulp.task("default", () => {
    const tsProject = ts.createProject("./tsconfig.json");
    const merge = require('merge2');
    const tsResult = tsProject.src()
        .pipe(tsProject());

    return merge([
        tsResult.dts.pipe(gulp.dest('./definitions')),
        tsResult.js.pipe(gulp.dest(tsProject.config.compilerOptions.outDir))
    ]);
});

gulp.task("lint", () => {
    return gulp.src([
            "src/bloom/bloom.ts",
            "test/bloom/bloom.ts",
            "gulpfile.js",
        ])
        .pipe(tslint())
        .pipe(tslint.report());
});

gulp.task("test", () => {
    return gulp.src("build/test/bloom")
        .pipe(mocha());
});
