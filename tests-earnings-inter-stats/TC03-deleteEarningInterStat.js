describe("Check if a earning inter stat can be deleted",function () {
    it("List should grow after the earning inter stat deletion", function (){
        browser.get('https://sos1819-07.herokuapp.com/#!/ui/v1/earnings-inter-stats');
        element
            .all(by.repeater("earningInterStat in earningsInterStats"))
            .then( function (initialEarningsInterStats) {
                
                /*element(by.model('newEarningInterStat.country')).sendKeys('France');
                element(by.model('newEarningInterStat.year')).sendKeys('2017');
                element(by.model('newEarningInterStat.title')).sendKeys('Rambo');
                element(by.model('newEarningInterStat.territory')).sendKeys('20');
                element(by.model('newEarningInterStat.earning')).sendKeys('545485');
                element(by.model('newEarningInterStat.territoryTotal')).sendKeys('27');*/
                

                element(by.css('[value="delete"]')).click();
                
                element
                    .all(by.repeater("earningInterStat in earningsInterStats"))
                    .then( function (finalEarningInterStats) {
                        expect(finalEarningInterStats.length).toEqual(initialEarningsInterStats.length-1);
                    });
            });
    });
});

