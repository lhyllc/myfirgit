fis.match('::packager', {
    spriter: fis.plugin('csssprites')
});

fis.match('*.{js,css}', {
    useHash: true
});

fis.match('*.js', {
    optimizer: fis.plugin('uglify-js') // js 压缩
});

fis.match('*.css', {
	useSprite: true,
    optimizer: fis.plugin('clean-css') // css 压缩
});

fis.match('*.png', {
    optimizer: fis.plugin('png-compressor') // png 图片压缩
});

fis.match('*.html', {
    optimizer: fis.plugin('html-minifier') //html 压缩
});
// fis.match('*.html', {
//   optimizer: fis.plugin('html-compress') //html 压缩
// })
