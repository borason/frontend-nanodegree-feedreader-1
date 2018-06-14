
$(function() {
// Test suite for RSS feeds
    describe('RSS Feeds', function() {
        // First test checks to see if allFeeds array is defined and at least one item
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        // Second test loops through all items in the array and checks to see if their is a url defined and contains content
        it('feed urls are defined', function () {
            for(let i = 0; i < allFeeds.length; i++) {
              expect(allFeeds[i].url).toBeDefined();
              expect(allFeeds[i].url.length).not.toBe(0);
            }
        });
        // Third test loops through the array and checks that there is a feed name and that it has content
        it('feed names are defined', function () {
            for(let i = 0; i < allFeeds.length; i++) {
              expect(allFeeds[i].name).toBeDefined();
              expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });
// Test suite for the menu
    describe('The Menu', function() {
        // Variable that selects the hamburger icon
        const hamburger = document.querySelector('.icon-list');
        // Test that checks to see the menu is hidden by default by making sure the body element has the 'menu-hidden' class
        it('hidden by default', function() {
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });
        // Test to see that the menu appears and disappears when clicked
        it('toggles menu when clicked', function() {
        /* simulateClick function was obtained from
        https://gomakethings.com/how-to-simulate-a-click-event-with-javascript/
        which is licenced under MIT license https://gomakethings.com/mit */
           let simulateClick = function (elem) {
                // Create our event (with options)
                var evt = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                // If cancelled, don't dispatch our event
                var canceled = !elem.dispatchEvent(evt);
            };
            // first click opens menu
            simulateClick(hamburger);
            // click removes 'menu-hidden' class from body and checks to make sure that it doesn't contain that class
            expect(document.body.classList.contains('menu-hidden')).toBe(false);
            // second click closes menu
            simulateClick(hamburger);
            // click adds 'menu-hidden' class to body and checks to make sure that class is there
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });
    });
// Test suite to check there loadFeed function works and loads at least one feed
    describe('Initial Entries', function() {
        let feed = document.querySelector('.feed');
        let entry = document.querySelector('.entry-link');
        // Runs the loadFeed function to establish baseline for test
        beforeEach(function(done) {
            loadFeed(0, function() {
            done();
            });
        });
        // loadFeed function should create a feed container that has article elements with '.entry' class
        // test checks to see if there is at least one article element
        it('contains entry element in feed element', function() {
            feed = document.querySelector('.feed');
            entry = document.querySelector('.entry-link');
            expect(feed.contains(entry)).toBe(true);
        });
    });
// Test suite to see if content changes when new feed is loaded
    describe('New Feed Selection', function() {
        var firstFeedContent;
        // Runs loadFeed function and sets the results to a variable
        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeedContent = document.querySelector('.feed').innerHTML;
            });
            done();
        });

        it('loads new content upon new feed load', function() {
            // Runs loadFeed function again
            loadFeed(1, function() {
            });
            // Sets results to new variable
            const secondFeedContent = document.querySelector('.feed').innerHTML;
            // compares the results of both variables to see that there is a difference
            expect(firstFeedContent).not.toBe(secondFeedContent);
        });
    });
}());
