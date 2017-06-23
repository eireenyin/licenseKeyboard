//Load plugins
var gulp = require("gulp");
var $ = require('gulp-load-plugins')();
pngquant = require("imagemin-pngquant");
autoprefixer = require('autoprefixer');
browserSync = require('browser-sync');
del = require("del");

var paths = {
  mainLess: './src/css/*.less',
  less: './src/css/*.less',
  img: './src/images/*',
  js: ['./src/js/*.js'],
  moveLibs: ['./src/js/lib/*/*/*', './src/js/lib/*']
}
var dist = {
  root:'./dist',
  css: './dist/css',
  js: './dist/js',
  img: './dist/images',
  maps: './dist/maps',
  libs: './dist/js/libs'
}

gulp.task('styles', function() {
  return gulp.src(paths.mainLess)
    .pipe($.plumber({
      errorHandler: $.notify.onError('Error: <%= error.message %>')
    }))
    .pipe($.sourcemaps.init())
    .pipe($.less().on('error', function(e) {
      console.error(e.message);
      this.emit('end');
    }))
    .pipe($.postcss([autoprefixer(['iOS >= 7', 'Android >= 4.1'])]))
    .pipe(gulp.dest(dist.css))
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe($.cssnano({
        zindex: false,
        autoprefixer: false
    }))
    .pipe($.sourcemaps.write('../maps'))
    .pipe(gulp.dest(dist.css))
    .pipe($.notify({
      message: 'Styles task complete'
    }));
});

gulp.task('build-styles', function() {
  return gulp.src(paths.mainLess)
    .pipe($.less())
    .pipe($.postcss([autoprefixer(['iOS >= 7', 'Android >= 4.1'])]))
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe($.cssnano({
        zindex: false,
        autoprefixer: false
    }))
    .pipe(gulp.dest(dist.css))
    .pipe($.notify({
      message: 'build styles task complete'
    }));
});


gulp.task('scripts', function() {
  return gulp.src(paths.js)
    .pipe($.plumber({
      errorHandler: $.notify.onError('Error: <%= error.message %>')
    }))
    .pipe($.sourcemaps.init())
    .pipe(gulp.dest(dist.js))
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe($.uglify())
    .pipe($.sourcemaps.write("../maps"))
    .pipe(gulp.dest(dist.js))
    .pipe($.notify({
      message: 'Scripts task complete'
    }));
});

gulp.task('build-scripts', function() {
  return gulp.src(paths.js)
    .pipe(gulp.dest(dist.js))
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe($.uglify())
    .pipe(gulp.dest(dist.js))
    .pipe($.notify({
      message: 'Scripts task complete'
    }));
});


// move
gulp.task('move', function() {
  return gulp.src(paths.moveLibs).pipe(gulp.dest(dist.libs));
});
gulp.task('moveCss', function() {
  return gulp.src(paths.movecss).pipe(gulp.dest(dist.css));
});
gulp.task('moveBootstrap', function() {
  return gulp.src(paths.moveBootstrap).pipe(gulp.dest(dist.root));
});


gulp.task('images', function() {
  return gulp.src(paths.img)
    .pipe($.plumber({
      errorHandler: $.notify.onError('Error: <%= error.message %>')
    }))
    .pipe($.imagemin({
      progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(dist.img))
    .pipe($.notify({
      message: 'Images task complete'
    }));
});

gulp.task('clean', function(cb) {
  return del([dist.css, dist.js, dist.img, dist.maps], cb)
});

gulp.task('default', ['clean'], function() {
  gulp.run('move', 'styles', 'scripts', 'images');
});

gulp.task('build', ['clean'], function() {
  gulp.run('move',  'build-styles', 'build-scripts', 'images');
});

//serve

gulp.task("serve", ['default'], function() {

  var files = [dist.js, dist.css, './*.html'];

  browserSync.init(files, {
    server: {
      baseDir: './',
      directory: true
    }
  });
  //watch .less files
  gulp.watch(paths.less, ['styles']);
  //watch .js files
  gulp.watch(paths.js, ['scripts']);
  //watch image files
  gulp.watch(paths.img, ['images']);
})
