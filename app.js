/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
  extend: "test.Application",

  name: "test",

  requires: ["test.*"],

  mainView: "test.comp.main.Main",
});
