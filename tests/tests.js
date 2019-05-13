exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	chromeOnly: true,
	specs: ["e2e/TC01-loadFilm.js",
	        "e2e/TC02-newFilm.js",
	        "e2e/TC03-deleteFilm.js"]

};