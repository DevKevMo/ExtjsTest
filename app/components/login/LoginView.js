Ext.define("Games.view.login.loginView", {
  extend: "Ext.window.Window",
  xtype: "login",

  requires: ["Games.view.login.LoginController", "Ext.form.Panel"],

  controller: "login",
  bodyPadding: 10,
  title: "Login",
  resizable: false,
  closable: false,
  autoShow: true,
  height: 522,

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
        formBind: true,
        listeners: {
          click: "onLoginClick",
        },
      },
    ],
  },
});
