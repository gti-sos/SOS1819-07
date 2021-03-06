describe('Test if all films are deleted', function() {
    it('delete all', function() {
        browser.get("https://sos1819-07.herokuapp.com/#!/ui/v1/subsidies-stats");

        element
            .all(by.repeater("film in films"))
            .then(function(initialFilms) {
                element.all(by.css('[value="deleteAll"]')).click();
                element.all(by.repeater("film in films"))
                    .then(function(finalFilms) {
                        expect(finalFilms.length).toEqual(0);



                    });
            });
    });
});
