const gulp = require("gulp");
const ts = require("gulp-typescript");
const tslint = require("gulp-tslint");
const mocha = require("gulp-mocha");

const tsProject = ts.createProject("./src/tsconfig.json");
const tsTestProject = ts.createProject("./test/tsconfig.json");

gulp.task("default", () => {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("build/src/bloom"));
});

gulp.task("lint", () => {
    return gulp.src([
            "src/bloom/bloom.ts",
            "test/bloom/bloom.ts"
        ])
        .pipe(tslint())
        .pipe(tslint.report());
});

gulp.task("test", () => {
    return tsTestProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("build/test/bloom"))
        .pipe(mocha());
});
