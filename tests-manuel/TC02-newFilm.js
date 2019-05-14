describe("Check if a new film can be created",function () {
    it("List should grow after the film creation", function (){
        browser.get("https://sos1819-07.herokuapp.com/ui/v1/subsidies-stats/");
        element
            .all(by.repeater("film in films"))
            .then( function (initialFilms) {
                
                element(by.model('newFilm.country')).sendKeys('prueba');
                element(by.model('newFilm.film')).sendKeys('prueba');
                element(by.model('newFilm.year')).sendKeys('1');
                element(by.model('newFilm.subsidyReceibed')).sendKeys('1');
                element(by.model('newFilm.subsidyBudgetProject')).sendKeys('1');
                element(by.model('newFilm.subsidyPercentage')).sendKeys('1');
                
                element(by.css('[value="add"]')).click();
                
                element
                    .all(by.repeater("film in films"))
                    .then( function (finalFilms) {
                        expect(finalFilms.length).toEqual(initialFilms.length+1);
                    });
            });
    });
});