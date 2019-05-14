exports.config = {
    seleniumAddress: "http://localhost:4444/wd/hub",
    chromeOnly: true,
    specs: [ "TC01-loadEarningsInterStats.js", "TC02-newEarningInterStat.js", "TC03-deleteEarningInterStat.js"
    ]
};

//"test": "newman run https://www.getpostman.com/collections/42de04216c03f4cb50a9"
