Ext.define("test.comp.chart.ChartModel", {
    extend: "Ext.app.ViewModel",
    alias: "viewmodel.columnChart",
    stores: {
        columnDefault: {
            storeId: "columnDefaultId",
            fields: ["categoryField", "valueField"],
            data: [{
                    categoryField: "Category 1",
                    valueField: 10
                },
                {
                    categoryField: "Category 2",
                    valueField: 20
                },
                {
                    categoryField: "Category 3",
                    valueField: 15
                },
            ],
        },
        countryList: {
            storeId: "countryListId",
            fields: ['ID', 'NAME', 'CCA2', 'CCA3', 'CURRENCIES_NAME', 'CURRENCIES_SYMBOL'],
            autoLoad: true,
            proxy: {
                type: "ajax",
                url: "http://dokuwebdev.datasec.de/azubi_kmoritz/exttraining/test/app/api/chart.cfc?method=getCountries",
                reader: {
                    type: "json",
                    rootProperty: "DATA",
                },
                writer: {
                    type: "json",
                },
            },
        },
        markedLinesStore: {
            storeId: "markedLinesStore",
            fields: ['year', 'data1', 'data2', 'data3', 'data4'],
        }
    },
});