Ext.define("test.comp.login.LoginController", {
  extend: "Ext.app.ViewController",
  alias: "controller.login",

  onLoginClick: function (btn, value) {
    form = this.lookup("form"); // formfield with the login values (username and password)
    formValues = form.getValues();
    Ext.Ajax.request({
      url: "app/api/main.cfc?method=login",
      method: "POST",
      params: {
        userData: Ext.encode(formValues),
      },
      success: (response) => {
        var data = Ext.decode(response.responseText); // Get the values ERROR(true,false), DATA(returnValue), and MESSAGE
        Ext.toast(data.MESSAGE);
        if (!data.ERROR) {
          localStorage.setItem("userSessionKm", data.DATA);
          this.getView().destroy();
        } else {
          form.reset();
        }
      },
    });
  },
});
