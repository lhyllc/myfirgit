//启用插件
fis.match('::packager', {
    spriter: fis.plugin('csssprites'),
    'html-minifier': fis.plugin('fis-optimizer-html-minifier'),
    autoprefixer: fis.plugin('fis3-preprocessor-autoprefixer')
});

// css预处理器；less编译
fis.match('*.less', {
    parser: fis.plugin('less'), 
    rExt: '.css',
    useHash: true,
    useSprite: true,
    optimizer: fis.plugin('clean-css')
});
//CSS后处理器autoprefixer，
fis.match('*.{css,less}', {
  preprocessor: fis.plugin('autoprefixer', {
    "browsers": ["Android >= 2.1", "iOS >= 4", "ie >= 8", "firefox >= 15"],
    "cascade": true
  })
})

// 开启md5戳
fis.match('*.{js,css}', {
    useHash: true 
});

fis.match('::image', {
    useHash: true
});
//js压缩
fis.match('*.js', {
    optimizer: fis.plugin('uglify-js')
});
//css压缩
fis.match('*.css', {
    useSprite: true,
    optimizer: fis.plugin('clean-css')
});
//png图片压缩
fis.match('*.png', {
    optimizer: fis.plugin('png-compressor')
});

// html 压缩
fis.match('*.html', {
    optimizer: fis.plugin('html-minifier') 
});
