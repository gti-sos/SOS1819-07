describe("Check if data is loaded: ",function () {
    it("List shows some earnings inter stats ", function (){
        browser.get('https://sos1819-07.herokuapp.com/#!/ui/v1/earnings-inter-stats');
        var earningsInterStats = element.all(by.repeater("earningInterStat in earningsInterStats"));
        expect(earningsInterStats.count()).toBeGreaterThan(0);
    });
});