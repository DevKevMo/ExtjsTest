/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
  extend: "test.Application",

  name: "test",

  requires: [
    "test.*",
    'Ext.tree.Panel',
    'Ext.data.TreeStore'
],

  mainView: "test.comp.main.Main",
});
