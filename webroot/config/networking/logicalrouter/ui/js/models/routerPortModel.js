/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-model'
], function (_, ContrailModel) {
    var routerPortModel = ContrailModel.extend({

        defaultConfig: {
            'network': null,
            'ip': null,
            'disableRP': false
        },

        validateAttr: function (attributePath, validation, data) {
            var model = data.model().attributes.model(),
                attr = cowu.getAttributeFromPath(attributePath),
                errors = model.get(cowc.KEY_MODEL_ERRORS),
                attrErrorObj = {}, isValid;

            isValid = model.isValid(attributePath, validation);

            attrErrorObj[attr + cowc.ERROR_SUFFIX_ID] =
                        (isValid == true) ? false : isValid;
            errors.set(attrErrorObj);
        },

        validations: {
            routerPortModelConfigValidations: {
                'ip': function(value, attr, finalObj) {
                    if(value === null || value.trim() === "") {
                        return;
                    }
                    var fixedIP = value.trim();
                    if(!isValidIP(fixedIP) || fixedIP.split("/").length > 1) {
                        return "Enter a valid IP In the format xxx.xxx.xxx.xxx";
                    }
                }
            }
        }
    });
    return routerPortModel;
});
