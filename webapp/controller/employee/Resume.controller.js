sap.ui.define([
	"navigation/controller/BaseController",
	"sap/ui/model/json/JSONModel"
	
], function (BaseController) {
	"use strict";
	var _aValidTabKeys = ["Info", "Projects", "Hobbies", "Notes"];
	return BaseController.extend("navigation.controller.employee.Resume", {
		onInit: function () {
			var oRouter = this.getRouter();
			this.getView().setModel(new sap.ui.model.json.JSONModel(), "view");

			oRouter.getRoute("employeeResume").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched : function (oEvent) {
			var oArgs, oView, oQuery;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			oView.bindElement({
				path : "/ProductSet('" + oArgs.employeeId + "')",
				events : {
					change: this._onBindingChange.bind(this),
					dataRequested: function (oEvent) {
						oView.setBusy(true);
					},
					dataReceived: function (oEvent) {
						oView.setBusy(false);
					}
				}
			});
			oQuery = oArgs["?query"];
			if (oQuery && _aValidTabKeys.indexOf(oQuery.tab) > -1){
				oView.getModel("view").setProperty("/selectedTabKey", oQuery.tab);
			} else {
				// the default query param should be visible at all time
				this.getRouter().navTo("employeeResume", {
					employeeId: oArgs.employeeId,
					"?query": {
						tab: _aValidTabKeys[0]
					}
				}, true /*no history*/);
			}
		},
		_onBindingChange : function (oEvent) {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		},
		onTabSelect: function (oEvent){
			var oCtx = this.getView().getBindingContext();
			this.getRouter().navTo("employeeResume", {
				employeeId: oCtx.getProperty("ProductID"),
				"?query": {
					tab: oEvent.getParameter("selectedKey")
				}
			}, true /*without history*/);
		}
	});
});