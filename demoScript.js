////////////////////////////////////////////////////////////
// queviva queviva
//
// demo script for using tfx togglers

(()=>{

    // loop through all the dependants
    document.querySelectorAll('.ynxDependant').forEach(obj => {
    
        // set the trigger
        obj.trig = obj.dataset.trigger ? parseInt(obj.dataset.trigger, 10) : 0;
    
        // remember the computed height
        obj.oldHeight = window.getComputedStyle(obj).height;
    
        // hide this dependant
        obj.style.height = '0px';
    
        // add a lizzer to the master
        document
            .getElementById(obj.dataset.master)
            .addEventListener('valueSet', e => {
            
                let val = parseInt(e.detail, 10);
            
                obj.style.height = val === obj.trig ? obj.oldHeight : '0px';
    
            }, false);
    });
    
    document.getElementById('question05').addEventListener('valueSet', e => {
        document.getElementById('dbEntry05').innerHTML = e.detail;
        return;
        document.getElementById('dbEntry05').innerHTML = [
            'upward',
            'not selected',
            'downward'
        ][parseInt(e.detail,10)];
    
    }, false);
    
})();