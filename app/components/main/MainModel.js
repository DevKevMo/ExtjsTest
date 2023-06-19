Ext.define("test.components.main.MainModel", {
  extend: "Ext.app.ViewModel",
  alias: "viewmodel.main",
  stores: {
    User: {
      fields: [
        {
          name: "id",
          type: "number",
          mapping: "ID",
        },
        {
          name: "username",
          type: "string",
          mapping: "USERNAME",
        },
        {
          name: "about",
          type: "string",
          mapping: "ABOUTYOU",
        },
        {
          name: "favnum",
          type: "number",
          mapping: "FAVNUM",
        },
        {
          name: "birthday",
          type: "string",
          mapping: "BIRTHDAY",
        },
        {
          name: "test",
          type: "string",
          mapping: "TEST",
        },
      ],
      autoLoad: true,
      id: "user", //delete later
      proxy: {
        type: "ajax",
        url: "../../api/main.cfc?method=getUser",
        extraParams: {
          qSID: localStorage.getItem("KMSESSION"),
        },
        reader: {
          type: "json",
          rootProperty: "",
        },
        writer: {
          type: "json",
        },
        api: {
          read: "../../api/main.cfc?method=getUser",
          write: "write",
          update: "update",
          destroy: "destroy",
        },
      },
    },
  },
});
