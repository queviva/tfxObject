////////////////////////////////////////////////////////////
// queviva pizzaface 
//
// true|false|null toggling object

/*global CustomEvent*/

(() => { // anonymouse closure

    // loop through all tfx objects and set them up
    document.querySelectorAll('input[type=range].tfx.tfx-slider').forEach((obj) => {
        
        obj.ops = {
            value: 1,
            trueColor: '#66f',
            falseColor: '#e9e9e9',
            nullColor: '#888',
            disabledColor: '#ccc',
            transSpeed: '0.3s',
            step: 1,
            disabled: false,
        };
        
        let vals = obj.dataset.options ? JSON.parse(obj.dataset.options) : null;
        
        for (let i in vals) {
            if (obj.ops[i] !== undefined) {
                obj.ops[i] = vals[i];
            }
        }
        
        obj.min = 0;
        obj.max = 2;
        obj.step = obj.ops.step !== 1 ? 2 : 1;
        obj.value = 1;
        
        obj.setDisabled = val => {
        
            obj.disabled = (val === true);
        
            if (val === true) {
                obj.style.setProperty(
                    '--thumb-color',
                    obj.ops.disabledColor
                );
            }
            else {
                obj.setValue(obj.value);
            }
        
            obj.dispatchEvent(new CustomEvent('disabledSet', {detail: val }));
            
        };
        
        obj.setValue = val => {

            obj.style.setProperty(
                '--thumb-color',
                [obj.ops.trueColor, obj.ops.nullColor, obj.ops.falseColor][(obj.value = val)]
            );
            obj.dispatchEvent(new CustomEvent('valueSet', { detail: val }));
        },
        
        obj.setColor = (col, val) => {
            
            if(obj.ops[col+'Color']){
                obj.ops[col +'Color'] = val;
            }
            
            obj.dispatchEvent(new CustomEvent('colorSet', { detail: val }));
        },
        
        obj.setTrans = val => {
            obj.style.setProperty('--trans-speed', val);
            obj.dispatchEvent(new CustomEvent('transSet', { detail: val }));
        };
        
        // resize the thumb
        let h = parseInt(window.getComputedStyle(obj).height, 10);
        obj.style.setProperty('--thumb-height', (h + 'px'));
        obj.style.setProperty('--thumb-radius', (h/2 + 'px'));
        
        // set up from options or defaults
        obj.setTrans(obj.ops.transSpeed);
        obj.setValue(obj.ops.value);
        obj.addEventListener('input', e => { obj.setValue(obj.value); });
        obj.setDisabled(obj.ops.disabled);
        
    });
    
})();