Ext.define("test.comp.chart.AddCountryWindowController", {
    extend: "Ext.app.ViewController",
    alias: "controller.addCountryController",

    onNameFilterChange: function (textfield, newValue, oldValue, eOpts) {
        var store = Ext.StoreMgr.lookup("countryListId");
        store.clearFilter();
        if (newValue) {
            store.filter('NAME', newValue); // Filter the store by the 'title' field based on the entered value
        } else {
            store.clearFilter(); // If no value entered, clear the filter to show all records
        }
    },

    recordClick: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var target = Ext.get(e.getTarget());
        if (target.hasCls('import-button')) {
            debugger
            Ext.Ajax.request({
                url: "https://api.worldbank.org/v2/country/" + record.data.CCA2 + "/indicator/FP.CPI.TOTL.ZG?format=json",
                method: "GET",
                success: function (response) {
                    var store = Ext.StoreMgr.lookup("markedLinesStore")

                    debugger
                },
                failure: function (error) {
                    debugger
                }
            });
        }
    },

    closeWindow: function () {
        this.getView().destroy();
    },
});