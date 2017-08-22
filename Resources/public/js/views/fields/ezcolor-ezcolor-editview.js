YUI.add('ezcolor-editview', function (Y) {
    "use strict";
    Y.namespace('eZColor');

    var L = Y.Lang,
        FIELDTYPE_IDENTIFIER = 'ezcolor';

    Y.eZColor.EzColorEditView = Y.Base.create('ezcolorEditView', Y.eZ.FieldEditView, [], {
        events: {
            '.ezcolor-input-ui input': {
                'blur': 'validate',
                'valuechange': 'validate'
            }
        },

        validate: function () {
            var validity = this._getInputValidity(),
                config = this._variables();

            if ( validity.valueMissing ) {
                this.set('errorStatus', 'This field is required');
            } else {
                this.set('errorStatus', false);
            }
        },

        _variables: function () {
            var def = this.get('fieldDefinition');

            return {
                "isRequired": def.isRequired
            };
        },

        _getInputValidity: function () {
            return this.get('container').one('.ezcolor-input-ui input').get('validity');
        },

        _getFieldValue: function () {
            return this.get('container').one('.ezcolor-input-ui input').get('value');
        }
    });

    Y.eZ.FieldEditView.registerFieldEditView(
        FIELDTYPE_IDENTIFIER, Y.eZColor.EzColorEditView
    );
});
