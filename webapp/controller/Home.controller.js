sap.ui.define([
	"navigation/controller/BaseController"
 ], function (Controller) {
	"use strict";
 
	return Controller.extend("navigation.controller.Home", {
			onDisplayNotFound : function () {
				//display the "notFound" target without changing the hash
				this.getRouter().getTargets().display("notFound", {
						fromTarget : "home"
				});
			},
			onNavToEmployees : function (){
				this.getRouter().navTo("employeeList");
			}
	});
 
 });
