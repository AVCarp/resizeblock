
jQuery.event.special.resizeblock = {
	setup: function(data, namespaces) {
		var elem = this;
		var handler = jQuery.proxy(jQuery.event.special.resizeblock.handler, elem);
		jQuery(elem).data('handler', elem);
		var ifr = $('<iframe style="position: absolute; top:0; left:0; width:100%; height:100%; border:0; margin:0; padding:0; z-index: -100;" />');
		jQuery(elem).append(ifr);
		jQuery(elem).data('resize_frame', ifr);
		var wnd = $(ifr).get(0).contentWindow;
		jQuery(wnd).on  ('resize', handler);
	},
	teardown: function(namespaces) {
		var elem = this;
		var handler = jQuery(elem).data('handler');
		var ifr = jQuery(elem).data('resize_frame');
		var wnd = $(ifr).get(0).contentWindow;
		jQuery(wnd).off ('resize', handler);
		jQuery(elem).remove(ifr);
		jQuery(elem).data('resize_frame', null);
		jQuery(elem).data('handler', null);
	},
	handler: function(event) {
		var elem = this;
		jQuery(elem).triggerHandler('resizeblock');
	}
}
