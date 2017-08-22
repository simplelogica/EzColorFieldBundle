YUI.add('ezcolor-view', function (Y) {
    "use strict";
    Y.namespace('eZColor');

    Y.eZColor.EzColorView = Y.Base.create('ezcolorView', Y.eZ.FieldView, [], {
        _isFieldEmpty: function () {
            return (this.get('field').fieldValue === null);
        },

        _getName: function () {
            return Y.eZColor.EzColorView.NAME;
        },
    });

    Y.eZ.FieldView.registerFieldView('ezcolor', Y.eZColor.EzColorView);
});
