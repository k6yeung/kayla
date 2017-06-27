const gulp = require("gulp");
const ts = require("gulp-typescript");
const tslint = require("gulp-tslint");

const tsProject = ts.createProject("./src/tsconfig.json");

gulp.task("default", () => {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("build"));
});

gulp.task("lint", () => {
    return tsProject.src()
        .pipe(tslint());
});
