describe('Test if all is deleted', function() {
    it('delete all', function() {
        browser.get('http://localhost:8080/ui/v1/takingstats/');

        element
            .all(by.repeater("taking in takingstats"))
            .then(function(initialTakings) {
                element.all(by.css('[value="delete"]')).click();
                element.all(by.repeater("taking in takingstats"))
                    .then(function(finalTakings) {
                        expect(finalTakings.length).toEqual(finalTakings.length);



                    })
            })
    })
})
