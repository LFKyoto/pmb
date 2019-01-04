// +-------------------------------------------------+
// � 2002-2004 PMB Services / www.sigb.net pmb@sigb.net et contributeurs (voir www.sigb.net)
// +-------------------------------------------------+
// $Id: ManageOptions.js,v 1.5 2018-11-13 09:32:58 dgoron Exp $

define([
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/request",
        "dojo/query",
        "dojo/on",
        "dojo/dom-attr",
        "dojo/dom",
        "dojo/dom-style",
        "dojo/ready"
], function(declare, lang, request, query, on, domAttr, dom, domStyle, ready){
	return declare(null, {
		selectorAvailableColumns:null,
		selectorSelectedColumns:null,
		objects_type:null,
		constructor: function(objects_type) {
			this.objects_type = objects_type;
			this.selectorAvailableColumns = dom.byId(this.objects_type+'_available_columns');
			this.selectorSelectedColumns = dom.byId(this.objects_type+'_selected_columns');
			on(dom.byId(this.objects_type+'_options_img'), 'click', lang.hitch(this, this.contentShow));
			on(dom.byId(this.objects_type+'_options_move_available_to_selected'), 'click', lang.hitch(this, this.moveAvailableToSelected));
			on(dom.byId(this.objects_type+'_options_move_selected_to_available'), 'click', lang.hitch(this, this.moveSelectedToAvailable));
			on(dom.byId(this.objects_type+'_options_move_option_first'), 'click', lang.hitch(this, this.moveOptionFirst));
			on(dom.byId(this.objects_type+'_options_move_option_top'), 'click', lang.hitch(this, this.moveOptionTop));
			on(dom.byId(this.objects_type+'_options_move_option_bottom'), 'click', lang.hitch(this, this.moveOptionBottom));
			on(dom.byId(this.objects_type+'_options_move_option_last'), 'click', lang.hitch(this, this.moveOptionLast));
			if(dom.byId(this.objects_type+'_search_form')) {
				on(dom.byId(this.objects_type+'_search_form'), 'submit', lang.hitch(this, this.selectAll));
			}
			//Edition d'une liste perso
			if(dom.byId('list_dataset_form')) {
				on(dom.byId('list_dataset_form'), 'submit', lang.hitch(this, this.selectAll));
			}
		},
		contentShow: function() {
			var domNode = dom.byId(this.objects_type+'_options_content');
			if(domStyle.get(domNode, 'display') == 'none') {
				domStyle.set(domNode, 'display', 'block');
				domAttr.set(dom.byId(this.objects_type+'_options_img'), 'src', pmbDojo.images.getImage('minus.gif'));
			} else {
				domStyle.set(domNode, 'display', 'none');
				domAttr.set(dom.byId(this.objects_type+'_options_img'), 'src', pmbDojo.images.getImage('plus.gif'));
			}
		},
		moveOptions: function(src, dest, where) {
			var total = src.options.length;
			var number = src.selectedOptions.length;
			if(number) {
				var selectedOptions = src.selectedOptions;
			    var selected = [];
			    for (var i = 0; i < selectedOptions.length; i++) {
		            selected.push(selectedOptions[i]);
			    }
				for(var selItem=0; selItem<=number; selItem++) {
					if(selected[selItem]) {
						var newOption = selected[selItem].cloneNode(true);
						newOption.selected="true";
						var index = selected[selItem].index; 
						src.removeChild(selected[selItem]);
						switch(where) {
							case 'first':
								dest.insertBefore(newOption, dest.options[selItem]);
								break;
							case 'top':
								var index_up = index-1;
								if(index_up < 0) {
									index_up = 0;
								}
								dest.insertBefore(newOption, dest.options[index_up]);
								break;
							case 'bottom':
								var index_down = index+1;
								if(index_down > (total-1)) {
									dest.appendChild(newOption);
								} else {
									dest.insertBefore(newOption, dest.options[index_down]);
								}
								break;
							default:
								dest.appendChild(newOption);
								break;
						}
					}
				}
			}
		},
		moveAvailableToSelected: function() {
			this.moveOptions(this.selectorAvailableColumns, this.selectorSelectedColumns);
		},
		moveSelectedToAvailable: function() {
			this.moveOptions(this.selectorSelectedColumns, this.selectorAvailableColumns);
		},
		moveOptionFirst: function() {
			this.moveOptions(this.selectorSelectedColumns, this.selectorSelectedColumns, 'first');
		},
		moveOptionTop: function() {
			this.moveOptions(this.selectorSelectedColumns, this.selectorSelectedColumns, 'top');
		},
		moveOptionBottom: function() {
			this.moveOptions(this.selectorSelectedColumns, this.selectorSelectedColumns, 'bottom');
		},
		moveOptionLast: function() {
			this.moveOptions(this.selectorSelectedColumns, this.selectorSelectedColumns);
		},
		selectAll: function() {
			var selectedColumns = document.getElementById(this.objects_type+'_selected_columns');
	        for (var i = 0; i < selectedColumns.options.length; i++) { 
	        	selectedColumns.options[i].selected = true; 
	        }
		}
	});
});