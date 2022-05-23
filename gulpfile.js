const { src, dest, parallel, series, watch } = require('gulp');
const concat = require('gulp-concat'); 
const uglify = require('gulp-uglify-es').default; 
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const map = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

function browsersync() {
	browserSync.init({ 
		server: { baseDir: 'app/' }, 
		notify: false, 
		online: true
	})
}

function scripts() {
	return src([ 
		'app/js/app.js',
		])
	.pipe(concat('app.min.js')) 
	.pipe(uglify()) 
	.pipe(dest('app/js/')) 
	.pipe(browserSync.stream())
}

function styles() {
	return src('app/sass/main.scss') 
	.pipe(sass())
	.pipe(concat('app.min.css'))
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) 
	.pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) 
    .pipe(map.write('../sourcemaps/'))
	.pipe(dest('app/css/'))
	.pipe(browserSync.stream()) 
}

function startwatch() { 
	watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
    watch('app/**/sass/**/*', styles);
    watch('app/**/*.html').on('change', browserSync.reload);
}

function buildcopy() {
	return src([ // Выбираем нужные файлы
		'app/css/**/*.min.css',
		'app/js/**/*.min.js',
		'app/images/dest/**/*',
		'app/**/*.html',
		], { base: 'app' }) // Параметр "base" сохраняет структуру проекта при копировании
	.pipe(dest('docs')) // Выгружаем в папку с финальной сборкой
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.build = series(styles, scripts, buildcopy);
exports.default = parallel(styles, scripts, browsersync, startwatch);