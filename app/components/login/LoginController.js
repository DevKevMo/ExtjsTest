Ext.define("test.components.login.LoginController", {
  extend: "Ext.app.ViewController",
  alias: "controller.login",

  onLoginClick: function () {
    data = this.lookupReference("form").getValues();
    Ext.Ajax.request({
      url: "../games/api/login.cfc?method=userLogin",
      method: "POST",
      params: {
        qdata: JSON.stringify(data),
      },
      success: (response) => {
        if (JSON.parse(response.responseText).SESSIONHASH != "") {
          localStorage.setItem(
            "KMSESSION",
            JSON.parse(response.responseText).SESSIONHASH
          );
          localStorage.setItem("FilterNewToDo", "OpenTasks");
          location.reload();
        } else {
          Ext.Msg.alert("Error", "Please Try again");
        }
      },
    });
  },
});
