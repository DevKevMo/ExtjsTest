Ext.define("test.comp.tree.TreeView", {
    extend: "Ext.tab.Panel",
    xtype: "treeView",
    requires: ["test.comp.tree.TreeController", "test.comp.tree.TreeStore"],
    controller: "tree",
 
  /* TODO: ADD tools make stuff with tree */
    dockedItems: [{
      xtype: "toolbar",
      dock: "top",
      overflowX: "auto",
      items: [{
          xtype: "tbtext",
          text: "add tools:",
        },
        
      ],
    }],
    items: [{
      xtype: "treepanel",
      rootVisible: false,
      title: "tree",
      store: {
        proxy: {
          type: "ajax",
        },
        type: "treestore",
        storeId: "idTreeStore",
      },
      columns: [
          {
              xtype: 'treecolumn',
              dataIndex: 'name',
              flex: 1
          }
      ],
      listeners: {
          itemclick: function (tree, record) {
              console.log('Clicked:', record.get('name'));
          }
      }
    }
    ],
  });