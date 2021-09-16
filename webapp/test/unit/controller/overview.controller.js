/*global QUnit*/

sap.ui.define([
	"navigation/controller/overview.controller"
], function (Controller) {
	"use strict";

	QUnit.module("overview Controller");

	QUnit.test("I should test the overview controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
