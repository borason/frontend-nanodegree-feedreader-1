'use strict';
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
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeTruthy();
            });
        });
        // Third test loops through the array and checks that there is a feed name and that it has content
        it('feed names are defined', function () {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeTruthy();
            });
        });
    });
// Test suite for the menu
    describe('The Menu', function() {
        // Test that checks to see the menu is hidden by default by making sure the body element has the 'menu-hidden' class
        it('hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        // Test to see that the menu appears and disappears when clicked
        it('toggles menu when clicked', function() {
            // clicks menu icon
            $('.menu-icon-link').trigger('click');
            // click removes 'menu-hidden' class from body and checks to make sure that it doesn't contain that class
            expect($('body').hasClass('menu-hidden')).not.toBe(true);
            // second click closes menu
            $('.menu-icon-link').trigger('click');
            // click adds 'menu-hidden' class to body and checks to make sure that class is there
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
// Test suite to check there loadFeed function works and loads at least one feed
    describe('Initial Entries', function() {
        // Runs the loadFeed function to establish baseline for test
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        // loadFeed function should create a feed container that has article elements with '.entry' class
        // test checks to see if there is at least one article element
        it('contains at least one article element with entry class in .feed div element', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });
// Test suite to see if content changes when new feed is loaded
    describe('New Feed Selection', function() {
        let firstFeedContent;
        // let secondFeedContent;
        beforeEach(function(done) {
        // Invokes loadFeed function with first feed in the allFeeds array
            loadFeed(0, function() {
                // Sets results to variable
                firstFeedContent = document.querySelector('.feed').innerText;
                // Invokes loadFeed function with second feed in the allFeeds array
                loadFeed(1, done);
            });
        });

        it('loads new content upon new feed load', function() {
            // compares the result of the current feed to see that there is a difference with first feed
            expect(document.querySelector('.feed').innerText).not.toBe(firstFeedContent);
        });
    });
}());
