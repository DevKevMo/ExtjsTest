Ext.define('test.comp.tree.TreeModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'name', type: 'string' },
        { name: 'leaf', type: 'boolean' },
        { name: 'children', type: 'auto' }
    ]
});