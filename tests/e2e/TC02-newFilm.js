describe("Check if a new contact can be created",function () {
    it("List should grow after the contact creation", function (){
        browser.get("https://sos1819-07.herokuapp.com/ui/v1/takingstats/");
        element
            .all(by.repeater("taking in takingstats"))
            .then( function (initialTakings) {
                
                element(by.model('newTaking.film')).sendKeys('sssssl');
                element(by.model('newTaking.country')).sendKeys('Spain');
                element(by.model('newTaking.year')).sendKeys('2017');
                element(by.model('newTaking.distributor')).sendKeys('UPI');
                element(by.model('newTaking.money')).sendKeys('1234');
                element(by.model('newTaking.rank')).sendKeys('122');
                element(by.model('newTaking.spectator')).sendKeys('1000');
                
                element(by.css('[value="add"]')).click();
                
                element
                    .all(by.repeater("taking in takingstats"))
                    .then( function (finalTakings) {
                        expect(finalTakings.length).toEqual(initialTakings.length+1);
                    });
            });
    });
});