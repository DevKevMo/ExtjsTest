Ext.define("test.comp.login.Login", {
  extend: "Ext.window.Window",
  xtype: "login",

  requires: ["test.comp.login.LoginController", "Ext.form.Panel"],

  controller: "login",
  bodyPadding: 10,
  title: "Login",
  closable: false,
  autoShow: true,
  modal: true,
  resizable: false,

  items: {
    xtype: "form",
    reference: "form",
    items: [
      {
        xtype: "textfield",
        name: "username",
        fieldLabel: "Username",
        allowBlank: false,
      },
      {
        xtype: "textfield",
        name: "password",
        inputType: "password",
        fieldLabel: "Password",
        allowBlank: false,
      },
    ],
    buttons: [
      {
        text: "Login",
        flex: 1,
        formBind: true,
        listeners: {
          click: "onLoginClick",
        },
      },
    ],
  },
});
