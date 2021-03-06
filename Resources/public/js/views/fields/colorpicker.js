
function coloPicker() {

    YUI().use('dial', 'slider', 'event-valuechange', 'color', function(Y){
        Y.one('.picker').addClass('yui3-skin-sam');

        var hue = new Y.Dial({
                min: 0,
                max: 360,
                stepsPerRevolution: 360,
                continuous: true,
                centerButtonDiameter: 0.4,
                render: '#hue-dial'
            }),
            sat = new Y.Slider({
                min: 0,
                max: 100,
                value: 100,
                render: '#sat-slider'
            }),
            lum = new Y.Slider({
                min: 0,
                max: 100,
                value: 50,
                render: '#lum-slider'
            }),
            satValue = Y.one('#sat-slider span'),
            lumValue = Y.one('#lum-slider span'),
            color = Y.one('.color');


        hue.after('valueChange', function(e) {
            updatePickerUI();
        });

        sat.after('thumbMove', function(e) {
            updatePickerUI();
        });

        lum.after('thumbMove', function(e) {
            lumValue.set('text', lum.get('value') + '%');
            updatePickerUI();
        });

        function setPickerUI(hsl) {
            if (typeof hsl.h !== 'undefined') {
                hue.set('value', +hsl.h);
            }

            if (typeof hsl.s !== 'undefined') {
                sat.set('value', +hsl.s);
            }

            if (typeof hsl.l !== 'undefined') {
                lum.set('value', +hsl.l);
            }
        }

        function updatePickerUI() {
            var h = hue.get('value'),
                s = sat.get('value'),
                l = lum.get('value'),
                hslString = Y.Color.fromArray([h, s, l], Y.Color.TYPES.HSL),
                hexString = Y.Color.toHex(hslString);

            satValue.set('text', s + '%');
            lumValue.set('text', l + '%');

            color.setStyle('backgroundColor', hexString);

            updateOutput(hslString);
        }


        var hexOutput = Y.one('.ezcolor-input-ui input'),
            focused = null;

        hexOutput.on('focus', setFocused);
        hexOutput.on('blur', unsetFocused);
        hexOutput.on('valueChange', updatePickerFromValue);

        function updateOutput(hslString) {
            if (hexOutput !== focused) {
                hexOutput.set('value', Y.Color.toHex(hslString));
            }
        }

        function updatePickerFromValue(e) {
            var val = e.newVal,
                hsl = [];

            if (Y.Color.toArray(val)) {
                hsl = Y.Color.toArray(Y.Color.toHSL(val));
                setPickerUI({
                    h: hsl[0],
                    s: hsl[1],
                    l: hsl[2]
                });
            }
        }

        function setFocused(e) {
            focused = e.currentTarget;
        }

        function unsetFocused(e) {
            if (focused === e.currentTarget) {
                focused = null;
            }
        }
        var initial = hexOutput.get('value');
        if (initial) {
            updateOutput(initial);
        }
    });
};