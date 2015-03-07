var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload  = browserSync.reload;
var compass = require('gulp-compass');
var sass = require('gulp-ruby-sass');

var sources = {
  sass: './sass/*.scss'
}

gulp.task('compass', function() {
  gulp.src(sources.sass)
    .pipe(compass({
      css: 'app/css',
      sass: 'sass',
      require: ['susy']
    }))
    .pipe(reload({stream: true}));
});

gulp.task('serve', ['compass'], function() {
  browserSync({
    server: "./app"
  });
  gulp.watch("app/js/*.js").on('change', reload);
  gulp.watch("app/*.html").on('change', reload);
  gulp.watch("app/partials/*.html").on('change', reload);
  gulp.watch("./sass/**/*.scss", ['compass']);
});

gulp.task('default', ['serve']);