////////////////////////////////////////////////////////////
// queviva zozobra 
//
// labelled yes|no|null toggling object

/*global CustomEvent*/

(()=>{ // anonymouse closure

    const toggleYNX = (obj, val) => {
        
        // compute all the necessary values for this toggle
        let specs = [
            'ynx ' + (val === 0 ? 'ynx-selected' : val === 2 ? 'ynx-unselected' : 'ynx-null'),
            'ynx ' + (val === 2 ? 'ynx-selected' : val === 0 ? 'ynx-unselected' : 'ynx-null')
        ];
        
        // actually set all the computed values
        obj.children[0].setAttribute('class', specs[0]);
        obj.children[2].setAttribute('class', specs[1]);
        
        // send an event to anyone who might be listening
        obj.dispatchEvent(new CustomEvent('ynx-change', { detail: val }));
            
    };
    
    document.querySelectorAll("div.ynx.ynx-holder").forEach((obj, i) => {
        
        // default options
        obj.ops = {
            value: 1,
            trueColor: '#ea0',
            falseColor: '#c30',
            nullColor: '#888',
            disabledColor: '#ccc',
            transSpeed: '0.3s',
            disabled: false,
            step: 1,
            returnValues: [0, 1, 2]
        };
        
        // create the necessary elements to insert in the div
        let
        yDiv = document.createElement('div'),
        iDiv = document.createElement('input'),
        nDiv = document.createElement('div'),
        
        vals = obj.dataset.options ? JSON.parse(obj.dataset.options) : null;
        
        for (let i in vals) {
            if (obj.ops[i] !== undefined) {
                obj.ops[i] = vals[i];
            }
        }
        
        // style the divs
        yDiv.setAttribute('class', 'ynx ynx-null');
        iDiv.setAttribute('class', 'tfx tfx-slider');
        nDiv.setAttribute('class', 'ynx ynx-null');
        
        // type the input
        iDiv.type = 'range';
        
        // set apropos values
        yDiv.innerHTML = obj.dataset.caps ? JSON.parse(obj.dataset.caps)[0] : 'yes';
        nDiv.innerHTML = obj.dataset.caps ? JSON.parse(obj.dataset.caps)[1] : 'no';
        iDiv.setAttribute('data-options', JSON.stringify(obj.ops));
        
        // set the options in the css
        yDiv.style.setProperty('--selected-col', obj.ops.trueColor);
        nDiv.style.setProperty('--selected-col', obj.ops.falseColor);
        obj.style.setProperty('--trans-speed', obj.ops.transSpeed);
        
        // give this ynx a setValue method, pass to tfx object
        obj.setValue = val => iDiv.setValue(val);
        
        // give this ynx a setDisabled method, pass to tfx object
        obj.setDisabled = val => iDiv.setDisabled(val);
        
        // add listeners and handlers
        yDiv.addEventListener('click', e => {
            if (!iDiv.disabled) {
                iDiv.setValue(0);
            }
        });
        
        iDiv.addEventListener('valueSet', e => {
            let val = parseInt(iDiv.value, 10);
            toggleYNX(obj, val);
            obj.dispatchEvent(
                new CustomEvent(
                    'valueSet',
                    { detail: obj.ops.returnValues[val] }
                )
            );
        });
        
        iDiv.addEventListener('disabledSet', e => {
            if (e.detail) {
                yDiv.setAttribute('class', 'ynx ynx-unselected');
                nDiv.setAttribute('class', 'ynx ynx-unselected');
            }
        });
        
        nDiv.addEventListener('click', e => {
            if (!iDiv.disabled) {
                iDiv.setValue(2);
            }
        });
        
        // add those elements to the holder
        [yDiv, iDiv, nDiv].forEach(div => { obj.appendChild(div); });
        
    });
    
    
})();