Ext.define("test.comp.chart.AddCountryWindowController", {
    extend: "Ext.app.ViewController",
    alias: "controller.addCountryController",

    onNameFilterChange: function (textfield, newValue, oldValue, eOpts) {
        var store = Ext.StoreMgr.lookup("countryListId");
        store.clearFilter();
        if (newValue) {
            store.filter('NAME', newValue); // Filter the store by the 'title' field based on the entered value
        }
    },

    recordClick: async function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var target = Ext.get(e.getTarget());
        var store = Ext.StoreMgr.lookup("markedLinesStore");
        var title = record.data.CURRENCIES_NAME + " " + record.data.CURRENCIES_SYMBOL
        var recordExists = store.queryBy(function (record) {
            return record.get('data1Title') === title ||
                record.get('data2Title') === title ||
                record.get('data3Title') === title ||
                record.get('data4Title') === title;
        });
        if (!recordExists.items.length) {
            if (target.hasCls('import-button')) {
                try {
                    const response = await Ext.Ajax.request({
                        url: "https://api.worldbank.org/v2/country/" + record.data.CCA2 + "/indicator/FP.CPI.TOTL.ZG?format=json",
                        method: "GET",
                        params: {
                            record: record.data
                        }
                    });
                    var recordData = Ext.decode(response.responseText);

                    if (!store.data.items.length) {
                        recordData[1].map(x => {
                            if (x.value !== undefined) {
                                store.add({
                                    "year": x.date,
                                    "data1": x.value,
                                    "data1Title": title,
                                })
                            }
                        });
                    } else {
                        const fieldsToUpdate = ["data2", "data3", "data4"];

                        fieldsToUpdate.some(field => {
                            if (store.data.items.some(record => record.get(field) === undefined)) {
                                recordData[1].map(x => {
                                    storeRecord = store.findRecord('year', x.date)
                                    if (x.value !== undefined) {
                                        storeRecord.set(`${field}`, x.value);
                                        storeRecord.set(`${field}Title`, title);
                                    }
                                });
                                return true; // Stop iteration if a field is updated
                            }
                        });
                    }
                } catch (error) {
                    Ext.toast("cant load inflation of that Country")
                }
            }
        } else {
            Ext.toast("Error: Country " + record.data.NAME + " is already in your store")
        }

    },

    closeWindow: function () {
        this.getView().destroy();
    },
});