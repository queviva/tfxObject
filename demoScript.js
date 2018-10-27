////////////////////////////////////////////////////////////
// queviva queviva
//
// demo script for using tfx togglers

(()=>{

    // loop through all the dependants
    document.querySelectorAll('.ynxDependant').forEach(obj => {
    
        // set the trigger
        obj.trig = obj.dataset.trigger ? obj.dataset.trigger : 0;
    
        // remember the computed height
        obj.oldHeight = window.getComputedStyle(obj).height;
    
        // hide this dependant
        obj.style.height = '0px';
    
        // add a lizzer to the master
        document
            .getElementById(obj.dataset.master)
            .addEventListener('valueSet', e => {
                
                obj.style.height = e.detail == obj.trig ? obj.oldHeight : '0px';
    
            }, false);
    });
    
})();