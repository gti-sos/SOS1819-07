describe("Check if data is loaded:", function(){
    
    it("List should show some films", function(){
        
        browser.get("https://sos1819-07.herokuapp.com/#!/ui/v1/subsidies-stats");
        var films = element.all(by.repeater("film in films"));
        expect(films.count()).toBeGreaterThan(0);
    });    
});