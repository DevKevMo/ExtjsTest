Ext.define("test.comp.chart.Chart", {
  extend: "Ext.tab.Panel",
  xtype: "chartView",

  requires: [
    "test.comp.chart.ChartController",
    "test.comp.chart.ChartModel",
    "test.comp.chart.AddCountryWindow",

    "Ext.chart.series.Bar",
    "Ext.chart.series.Line",
    "Ext.chart.series.Pie",
    "Ext.chart.axis.Numeric",
    "Ext.chart.axis.Category",
    "Ext.chart.interactions.ItemHighlight",
    "Ext.chart.interactions.PanZoom",
  ],

  controller: "chart",
  viewModel: "columnChart",



  items: [{
    xtype: "chart",
    reference: "chart",
    title: "Column",
    dockedItems: [{
      xtype: "toolbar",
      dock: "top",
      overflowX: "auto",
      items: [{
        xtype: "button",
        text: "load",
        handler: "loadCountries",
        tooltip: "load Country name, currencie, cca2 and 3 ",
        iconCls: "x-fa fa-save",
      }, ],
    }],
    bind: {
      store: '{columnDefault}' // Binding to the view model store
    },
    series: [{
        type: "bar",
        xField: "categoryField",
        yField: "valueField",
        style: {
          minGapWidth: 10,
        },
        label: {
          field: "valueField",
          display: "insideEnd",
          renderer: Ext.util.Format.numberRenderer("0"),
        },
      },
      {
        type: "line",
        xField: "categoryField",
        yField: "valueField",
        style: {
          smooth: true,
          fill: false,
        },
        marker: true,
      },
      {
        type: "pie",
        angleField: "valueField",
        label: {
          field: "categoryField",
          display: "outside",
          calloutLine: true,
        },
      },
    ],
    axes: [{
        type: "numeric",
        position: "left",
        title: "Value",
        fields: ["valueField"],
        grid: true,
        minimum: 0, // Specify the minimum value for the y-axis if needed
      },
      {
        type: "category",
        position: "bottom",
        title: "Category",
        fields: ["categoryField"],
      },
    ],
  }, {
    xtype: 'cartesian',
    reference: 'markedLines',
    title: 'Marked Lines',
    width: '100%',
    height: 500,
    insetPadding: {
      top: 40,
      right: 40,
      bottom: 20,
      left: 20
    },
    dockedItems: [{
      xtype: "toolbar",
      dock: "top",
      items: [{
          xtype: "button",
          text: "Add Country",
          handler: "addCountry",
          tooltip: "addCountry to inflation MakedLines",
          iconCls: "x-fa fa-save",
        }, "-",
        {
          xtype: "button",
          text: "Remove Countries",
          handler: "clearStore",
          tooltip: "removeCountry from MakedLines",
          iconCls: "x-fa fa-remove",
        }
      ],
    }],
    legend: {
      docked: 'right',
    },
    bind: {
      store: '{markedLinesStore}' // Binding to the view model store
    },
    axes: [{
      type: 'numeric',
      title: 'Inflation',
      fields: ['data1', 'data2', 'data3', 'data4'],
      position: 'left',
      grid: true,
    }, {
      type: 'category',
      fields: 'year',
      position: 'bottom',
      grid: true,
      label: {
        rotate: {
          degrees: -45
        }
      }
    }],
    series: [{
      type: 'line',
      axis: 'left',
      title: 'data',
      xField: 'year',
      yField: 'data1',
      style: {
        lineWidth: 4
      },
      marker: {
        radius: 4
      },
      highlight: {
        fillStyle: '#000',
        radius: 5,
        lineWidth: 2,
        strokeStyle: '#fff'
      },
      tooltip: {
        trackMouse: true,
        style: 'background: #fff',
        renderer: function (storeItem, item) {
          storeItem.setHtml(item.data.data1 + " %")
        }
      },
      renderer: function () {
        storeItems = Ext.StoreMgr.lookup("markedLinesStore").data.items;
        if (storeItems.length && storeItems[0].data.data1Title) {
          this.setTitle(storeItems[0].data.data1Title)
        }
      }
    }, {
      type: 'line',
      axis: 'left',
      title: 'data',
      xField: 'year',
      yField: 'data2',
      style: {
        lineWidth: 4
      },
      marker: {
        radius: 4
      },
      highlight: {
        fillStyle: '#000',
        radius: 5,
        lineWidth: 2,
        strokeStyle: '#fff'
      },
      tooltip: {
        trackMouse: true,
        style: 'background: #fff',
        renderer: function (storeItem, item) {
          storeItem.setHtml(item.data.data2 + " %");
        }
      },
      renderer: function () {
        storeItems = Ext.StoreMgr.lookup("markedLinesStore").data.items;
        if (storeItems.length && storeItems[0].data.data2Title) {
          this.setTitle(storeItems[0].data.data2Title)
        }
      }
    }, {
      type: 'line',
      axis: 'left',
      title: 'data',
      xField: 'year',
      yField: 'data3',
      style: {
        lineWidth: 4
      },
      marker: {
        radius: 4
      },
      highlight: {
        fillStyle: '#000',
        radius: 5,
        lineWidth: 2,
        strokeStyle: '#fff'
      },
      tooltip: {
        trackMouse: true,
        style: 'background: #fff',
        renderer: function (storeItem, item) {
          storeItem.setHtml(item.data.data3 + " %")
        }
      },
      renderer: function () {
        storeItems = Ext.StoreMgr.lookup("markedLinesStore").data.items;
        if (storeItems.length && storeItems[0].data.data3Title) {
          this.setTitle(storeItems[0].data.data3Title)
        }
      }
    }, {
      type: 'line',
      axis: 'left',
      title: 'data',
      xField: 'year',
      yField: 'data4',
      style: {
        lineWidth: 4
      },
      marker: {
        radius: 4
      },
      highlight: {
        fillStyle: '#000',
        radius: 5,
        lineWidth: 2,
        strokeStyle: '#fff'
      },
      tooltip: {
        trackMouse: true,
        style: 'background: #fff',
        renderer: function (storeItem, item) {
          storeItem.setHtml(item.data.data4 + " %")
        }
      },
      renderer: function () {
        storeItems = Ext.StoreMgr.lookup("markedLinesStore").data.items;
        if (storeItems.length && storeItems[0].data.data4Title) {
          this.setTitle(storeItems[0].data.data4Title)
        }
      }
    }]
  }],
});