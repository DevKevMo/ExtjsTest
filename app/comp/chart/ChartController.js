Ext.define("test.comp.chart.ChartController", {
  extend: "Ext.app.ViewController",
  alias: "controller.chart",


  loadCountries: function () {
    /*   Ext.Ajax.request({ // get Json data from Image
        url: "https://restcountries.com/v3.1/all?fields=name,currencies,cca2,cca3",
        method: "GET",
        success: function (response) {
          data = JSON.parse(response.responseText);
          dataNew = data.map(x => {
            if (Object.values(x.currencies)[0] != undefined) {
              var currencieName = Object.values(x.currencies)[0].name
              var currencieSymbol = Object.values(x.currencies)[0].symbol
              return dataNew = {
                "name": x.name.common,
                "cca2": x.cca2,
                "cca3": x.cca3,
                "currencieName": currencieName,
                "currencieSymbol": currencieSymbol,
              };
            }
          });
          Ext.Ajax.request({
            url: "app/api/chart.cfc?method=addCountries",
            method: "POST",
            params: {
              dataObj: JSON.stringify(dataNew)
            },
            success: (response) => {
              debugger
            },
          });
        },
        failure: function (error) {
          Ext.toast(error.status + ": " + error.statusText)
        }
      }); */
  },

  clearStore: function () {
    Ext.StoreMgr.lookup("markedLinesStore").removeAll();
  },

  addCountry: function (btn) {
    Ext.create("test.comp.chart.AddCountryWindow", {
      graph: this.lookup("markedLines")
    });
  },


});