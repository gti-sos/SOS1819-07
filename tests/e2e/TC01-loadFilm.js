describe("Check if data is loaded: ",function () {
    it("List shows more than 3 items", function (){
        
        browser.get("https://sos1819-07.herokuapp.com/ui/v1/takingstats/");
        var taking = element.all(by.repeater("taking in takingstats"));
        expect(taking.count()).toBeGreaterThan(0);
    });
});