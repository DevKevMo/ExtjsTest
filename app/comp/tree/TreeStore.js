Ext.define('test.comp.tree.TreeStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.treestore',
    model: 'test.comp.tree.TreeModel',
    storeId: "idTreeStore",
    proxy: {
        type: 'ajax',
        url: 'data/files.json',
        reader: {
            type: 'json'
        }
    },
    autoLoad: true
});