define(function () {
         
    function loadCss(url) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    };     
                
    return {
        loadCss: loadCss,
        getConfig: function (baseUrl) {
            var params = this.getParams(),
                f = params.f, 
                c = params.c,
                shim = {
                'containers/editable-container': {
                    deps: ['require', 'editable-form/editable-form-utils', 'editable-form/editable-form'],
                    init: function(require) {
                        loadCss(require.toUrl("./editable-container.css")); 
                    }                  
                },   
                'element/editable-element': {
                    deps: ['require'], //here should be dynamically added container
                    init: function(require) {
                        loadCss(require.toUrl("./editable-element.css")); 
                    }                         
                },
                'editable-form/editable-form': {
                    deps: ['require',
                    'inputs/text',
                    'inputs/textarea',
                    'inputs/select',
                    'inputs/checklist',
                    'inputs/html5types',
                    'inputs-ext/address/address'],
                    init: function(require) {
                        loadCss(require.toUrl("./editable-form.css")); 
                    }      
                },
                'inputs/select': ['inputs/list'],
                'inputs/checklist': ['inputs/list'],
                'inputs/list': ['inputs/abstract'],
                'inputs/text': ['inputs/abstract'],
                'inputs/textarea': ['inputs/abstract'],
                'inputs/abstract': ['editable-form/editable-form-utils'],   
                'inputs/html5types': ['inputs/text'],   

                //bootstrap
                'bootstrap/js/bootstrap': {
                    deps: ['require'],
                    init: function(require) {
                        loadCss(require.toUrl("../css/bootstrap.css")); 
                    }                
                },
                'editable-form/editable-form-bootstrap': [
                'editable-form/editable-form', 
                'bootstrap/js/bootstrap'
                ],
                'containers/editable-popover': ['containers/editable-container', 
                'bootstrap/js/bootstrap'
                ],
                'inputs/date/date': {
                    deps: ['require', 
                    'bootstrap/js/bootstrap',
                    'inputs/abstract', 
                    'inputs/date/bootstrap-datepicker/js/bootstrap-datepicker'],
                    init: function(require) {
                        loadCss(require.toUrl("./bootstrap-datepicker/css/datepicker.css")); 
                    }
                },

                //jqueryui
                'jqueryui/js/jquery-ui-1.9.1.custom': {
                    deps: ['require'],
                    init: function(require) {
                        loadCss(require.toUrl("../css/redmond/jquery-ui-1.9.1.custom.css")); 
                    }                
                },  
                'editable-form/editable-form-jqueryui': [
                'editable-form/editable-form', 
                'jqueryui/js/jquery-ui-1.9.1.custom'
                ],            
                'containers/editable-tooltip': ['containers/editable-container', 
                'jqueryui/js/jquery-ui-1.9.1.custom'
                ],                      
                'inputs/dateui/dateui': ['inputs/abstract'],

                //plain
                //'inputs/dateui/dateui': ['inputs/abstract', 'inputs/date/bootstrap-datepicker/js/bootstrap-datepicker'],
                'containers/editable-poshytip': [ 
                'containers/editable-container', 
                'poshytip/jquery.poshytip'
                ],
                'poshytip/jquery.poshytip': {
                    deps: ['require'],
                    init: function(require) {
                        loadCss(require.toUrl("./tip-yellowsimple/tip-yellowsimple.css")); 
                    }                
                },
                'inputs/dateui/jquery-ui-datepicker/js/jquery-ui-1.9.1.custom': {
                    deps: ['require'],
                    init: function(require) {
                        loadCss(require.toUrl("../css/redmond/jquery-ui-1.9.1.custom.css")); 
                    } 
                },

                //inline container
                'containers/editable-inline': ['containers/editable-container'],

                //inputs-ext
                'inputs-ext/address/address': {
                    deps: ['require', 'inputs/abstract'],
                    init: function(require) {
                        loadCss(require.toUrl("./address.css")); 
                    }
                }
            };

            /*
             modify shim for bootstrap, jqueryui or plain
            */
            
            if(f === 'bootstrap') { 
                //bootstrap
                shim['editable-form/editable-form'].deps.push('inputs/date/date');
                shim['element/editable-element'].deps.push('editable-form/editable-form-bootstrap');
                shim['element/editable-element'].deps.push(c === 'popup' ? 'containers/editable-popover' : 'containers/editable-inline');
            } else if(f === 'jqueryui') {
                //jqueryui
                shim['editable-form/editable-form'].deps.push('inputs/dateui/dateui');
                shim['element/editable-element'].deps.push('editable-form/editable-form-jqueryui');
                shim['element/editable-element'].deps.push(c === 'popup' ? 'containers/editable-tooltip' : 'containers/editable-inline');
            } else {    
                //plain
                shim['editable-form/editable-form'].deps.push('inputs/dateui/dateui');
                shim['inputs/dateui/dateui'].push('inputs/dateui/jquery-ui-datepicker/js/jquery-ui-1.9.1.custom');
                shim['element/editable-element'].deps.push(c === 'popup' ? 'containers/editable-poshytip' : 'containers/editable-inline');        
            }            
            
            
            /*
             return requirejs config
            */            
            
            return {
                baseUrl: baseUrl,
                paths: {
//                    "bootstrap": "../test/libs/bootstrap221", 
                    "bootstrap": "../test/libs/bootstrap222", 
                    "jqueryui": "../test/libs/jquery-ui-1.9.1.custom", 
                    "poshytip": "../test/libs/poshytip",
                    "test": "../test" 
                },
                shim: shim
            };  
        },

        getParams: function() {
            var url = window.location.href, f, c;
            if(url.match(/f=jqueryui/i)) { 
                f = 'jqueryui';
            } else if(url.match(/f=plain/i)) {
                f = 'plain';
            } else {      
                f = 'bootstrap';
            }
            c = url.match(/c=inline/i) ? 'inline' : 'popup';
            return {f: f, c: c};
        }
    }
});