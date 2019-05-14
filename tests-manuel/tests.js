exports.config = {
    
    seleniumAddress: 'http://localhost:4444/wd/hub',
    chromeOnly: true,
    specs: [ "TC01-loadFilms.js", "TC02-newFilm.js", "TC03-deleteFilms.js" ]
    
};