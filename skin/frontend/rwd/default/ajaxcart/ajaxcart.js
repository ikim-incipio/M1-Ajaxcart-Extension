jQuery(document).on('click', '.button.btn-popup.config', function(e){
	e.preventDefault();

	if (jQuery('.products-grid')[0]){
		var html = jQuery(this).parent().parent().parent().html();
	} else if (jQuery('.products-list')[0]){
		var html = jQuery(this).parent().parent().parent().parent().html();
	}

	html = html.replace(/class="button btn-popup config"/, 'class="button btn-ajaxcart config"');
	html = html.replace(/product-collection-image-/g, 'product-collection-image-ajax-')
	html = html.replace(/<ul class="configurable-swatch-list/, '<ul class="configurable-swatch-list-ajax')

	jQuery('body').append('<div class="lightBoxWrapper"><div class="overlay"></div><div class="productViewLightBox"><span class="closeLightBox">x</span><div class="productDetail">'+html+'</div></div></div>');
	$j(document).trigger('configurable-media-images-ajax-init', ConfigurableMediaImages);
});

jQuery(document).on('click', '.button.btn-ajaxcart.config', function(e){
	e.preventDefault();

	var data = 'isAjax=1';
	var currentUrl = window.location.href;
	var baseUrl = currentUrl.substring(0, currentUrl.substring(7, currentUrl.length).indexOf('/')+8);
	var url = baseUrl+'ajaxcart/index';

	var cartUrl = $(this).href;
	var params = cartUrl.substring(cartUrl.indexOf('add')+4, cartUrl.length-1).split('/');
	for (var i=0;i<params.length;i+=2){
		data+='&'+params[i]+'='+params[i+1];
	}
	if (jQuery('.products-grid')[0]){
		var selected = jQuery(this).parent().siblings('.configurable-swatch-list-ajax').children('.selected');
	} else if (jQuery('.products-list')[0]){
		var selected = jQuery(this).parent().siblings('.product-primary').children('.configurable-swatch-list-ajax').children('.selected');
	}
	data+='&super_attribute='+selected.attr('data-attr')+':'+selected.attr('data-option-value');
	data+='&qty=1';

	jQuery('#ajax_loader').show();

	jQuery.ajax({
		url: url,
		method: 'POST',
		dataType: 'json',
		data: data,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		timeout: 10000,
		cache: true,
	}).done(function(response){
		jQuery('#ajax_loader').hide();

		if (response.status == 'SUCCESS'){
			jQuery('#ajax_alert .ajax-alert-msg').text(response.message);
			jQuery('#ajax_alert').show();
			setTimeout(function(){
				jQuery('#ajax_alert').hide();
			}, 2000);

			if (jQuery('#header .links')){
				jQuery('#header .links').replaceWith(response.toplinks);
			}
			
			if (jQuery('.header-minicart')){
				jQuery('.minicart-wrapper').html(response.minicart.substring(response.minicart.indexOf('<div class="minicart-wrapper">'), response.minicart.length));
				jQuery('.skip-cart .count').text(response.minicart.substring(response.minicart.indexOf('<span class="count">')+20, response.minicart.substring(response.minicart.indexOf('<span class="count">'), response.minicart.length).indexOf('</span>')+response.minicart.indexOf('<span class="count">')));
			}
			jQuery('.lightBoxWrapper').remove();
			$j(document).trigger('configurable-media-images-init', ConfigurableMediaImages);
		} else if (response.status == 'ERROR'){
			jQuery('#ajax_alert .ajax-alert-msg').text(response.message);
		} else {
			jQuery('#ajax_alert .ajax-alert-msg').text('Unknown error has occurred');
		}
	}).fail(function(jqXHR, statusText){
		console.log(statusText);
	});
});

jQuery(document).on('click', '.closeLightBox, .lightBoxWrapper .overlay', function(){
	jQuery('.lightBoxWrapper').remove();
	$j(document).trigger('configurable-media-images-init', ConfigurableMediaImages);
});
