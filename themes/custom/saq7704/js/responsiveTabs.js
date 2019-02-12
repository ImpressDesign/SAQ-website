var RESPONSIVEUI = {};
(function(jQuery) {
  RESPONSIVEUI.responsiveTabs = function () {
    var jQuerytabSets = jQuery('.responsive-tabs');
    if (!jQuerytabSets.hasClass('responsive-tabs--enabled')) {  // if we haven't already called this function and enabled tabs
      jQuerytabSets.addClass('responsive-tabs--enabled'); 
      //loop through all sets of tabs on the page
      var tablistcount = 1;
      jQuerytabSets.each(function() {
        var jQuerytabs = jQuery(this);
        // add tab heading and tab panel classes
        jQuerytabs.children(':header').addClass('responsive-tabs__heading');
        jQuerytabs.children('div').addClass('responsive-tabs__panel');
        // determine if markup already identifies the active tab panel for this set of tabs
        // if not then set first heading and tab to be the active one
        var jQueryactivePanel = jQuerytabs.find('.responsive-tabs__panel--active');
        if(!jQueryactivePanel.length) {
          jQueryactivePanel = jQuerytabs.find('.responsive-tabs__panel').first().addClass('responsive-tabs__panel--active');
        }
        jQuerytabs.find('.responsive-tabs__panel').not('.responsive-tabs__panel--active').hide().attr('aria-hidden','true'); //hide all except active panel
        jQueryactivePanel.attr('aria-hidden', 'false');
        /* make active tab panel hidden for mobile */
        jQueryactivePanel.addClass('responsive-tabs__panel--closed-accordion-only');
        // wrap tabs in container - to be dynamically resized to help prevent page jump
        var jQuerytabsWrapper = jQuery('<div/>', {'class': 'responsive-tabs-wrapper' });
        jQuerytabs.wrap(jQuerytabsWrapper);
        var highestHeight = 0;
        // determine height of tallest tab panel. Used later to prevent page jump when tabs are clicked
        jQuerytabs.find('.responsive-tabs__panel').each(function() {
          var tabHeight = jQuery(this).height();
          if (tabHeight > highestHeight) {
            highestHeight = tabHeight;
          }
        });
        //create the tab list
        var jQuerytabList = jQuery('<ul/>', { 'class': 'responsive-tabs__list', 'role': 'tablist' });
        //loop through each heading in set
        var tabcount = 1;
        jQuerytabs.find('.responsive-tabs__heading').each(function() {
          var jQuerytabHeading = jQuery(this);
          var jQuerytabPanel = jQuery(this).next();
          jQuerytabHeading.attr('tabindex', 0);
          // CREATE TAB ITEMS (VISIBLE ON DESKTOP)
          //create tab list item from heading
          //associate tab list item with tab panel
          var jQuerytabListItem = jQuery('<li/>', { 
            'class': 'responsive-tabs__list__item',
            id: 'tablist' + tablistcount + '-tab' + tabcount,
            'aria-controls': 'tablist' + tablistcount +'-panel' + tabcount,
            'role': 'tab',
            tabindex: 0,
            text: jQuerytabHeading.text(),
            keydown: function (objEvent) {
              if (objEvent.keyCode === 13) { // if user presses 'enter'
                jQuerytabListItem.click();
              }
            },
            click: function() {
              //Show associated panel
              //set height of tab container to highest panel height to avoid page jump
              jQuerytabsWrapper.css('height', highestHeight);
              // remove hidden mobile class from any other panel as we'll want that panel to be open at mobile size
              jQuerytabs.find('.responsive-tabs__panel--closed-accordion-only').removeClass('responsive-tabs__panel--closed-accordion-only');
              // close current panel and remove active state from its (hidden on desktop) heading
              jQuerytabs.find('.responsive-tabs__panel--active').toggle().removeClass('responsive-tabs__panel--active').attr('aria-hidden','true').prev().removeClass('responsive-tabs__heading--active');
              //make this tab panel active
              jQuerytabPanel.toggle().addClass('responsive-tabs__panel--active').attr('aria-hidden','false');
              //make the hidden heading active
              jQuerytabHeading.addClass('responsive-tabs__heading--active');
              //remove active state from currently active tab list item
              jQuerytabList.find('.responsive-tabs__list__item--active').removeClass('responsive-tabs__list__item--active');
              //make this tab active
              jQuerytabListItem.addClass('responsive-tabs__list__item--active');
              //reset height of tab panels to auto
              jQuerytabsWrapper.css('height', 'auto');
            }
          });
          //associate tab panel with tab list item
          jQuerytabPanel.attr({
            'role': 'tabpanel',
            'aria-labelledby': jQuerytabListItem.attr('id'),
            id: 'tablist' + tablistcount + '-panel' + tabcount
          });
          // if this is the active panel then make it the active tab item
          if(jQuerytabPanel.hasClass('responsive-tabs__panel--active')) {
            jQuerytabListItem.addClass('responsive-tabs__list__item--active');
          }
          // add tab item
          jQuerytabList.append(jQuerytabListItem);
          // TAB HEADINGS (VISIBLE ON MOBILE)
          // if user presses 'enter' on tab heading trigger the click event
          jQuerytabHeading.keydown(function(objEvent) {
            if (objEvent.keyCode === 13) {
              jQuerytabHeading.click();
            }
          });
          //toggle tab panel if click heading (on mobile)
          jQuerytabHeading.click(function() {
            // remove any hidden mobile class
            jQuerytabs.find('.responsive-tabs__panel--closed-accordion-only').removeClass('responsive-tabs__panel--closed-accordion-only');
            // if this isn't currently active
            if (!jQuerytabHeading.hasClass('responsive-tabs__heading--active')){
              var oldActivePos,
                jQueryactiveHeading = jQuerytabs.find('.responsive-tabs__heading--active');
              // if there is an active heading, get its position
              if(jQueryactiveHeading.length) {
                oldActivePos = jQueryactiveHeading.offset().top;
              }
              // close currently active panel and remove active state from any hidden heading
              jQuerytabs.find('.responsive-tabs__panel--active').slideToggle().removeClass('responsive-tabs__panel--active').prev().removeClass('responsive-tabs__heading--active');
              //close all tabs
              jQuerytabs.find('.responsive-tabs__panel').hide().attr('aria-hidden','true');
              //open this panel
              jQuerytabPanel.slideToggle().addClass('responsive-tabs__panel--active').attr('aria-hidden','false');
              // make this heading active
              jQuerytabHeading.addClass('responsive-tabs__heading--active');
              var jQuerycurrentActive = jQuerytabs.find('.responsive-tabs__list__item--active');
              //set the active tab list item (for desktop)
              jQuerycurrentActive.removeClass('responsive-tabs__list__item--active');
              var panelId = jQuerytabPanel.attr('id');
              var tabId = panelId.replace('panel','tab');
              jQuery('#' + tabId).addClass('responsive-tabs__list__item--active');
              //scroll to active heading only if it is below previous one
              var tabsPos = jQuerytabs.offset().top;
              var newActivePos = (jQuerytabHeading.offset().top) - 15;
              if(oldActivePos < newActivePos) {
                jQuery('html, body').animate({ scrollTop: tabsPos }, 0).animate({ scrollTop: newActivePos }, 400);
              }
            }
            // if this tab panel is already active
            else {
              // hide panel but give it special responsive-tabs__panel--closed-accordion-only class so that it can be visible at desktop size
              jQuerytabPanel.removeClass('responsive-tabs__panel--active').slideToggle(function () { jQuery(this).addClass('responsive-tabs__panel--closed-accordion-only'); });
              //remove active heading class
              jQuerytabHeading.removeClass('responsive-tabs__heading--active');
              //don't alter classes on tabs as we want it active if put back to desktop size
            }
          });
          tabcount ++;
        });
        // add finished tab list to its container
        jQuerytabs.prepend(jQuerytabList);
        // next set of tabs on page
        tablistcount ++;
      });
    }
  };
})(jQuery);