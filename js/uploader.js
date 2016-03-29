jQuery(document).ready(function($){
 
 
    var custom_uploader;
	
	var $btn;
 
 
    $('.image_upload_button').live( 'click', function(e) {
		
		$btn = $(this);
 
        e.preventDefault();
 
        //If the uploader object has already been created, reopen the dialog
        if (custom_uploader) {
            custom_uploader.open();
            return;
        }
 
        //Extend the wp.media object
        custom_uploader = wp.media.frames.file_frame = wp.media({
            title: 'Choose Image',
            button: {
                text: 'Choose Image'
            },
            multiple: false
        });
 
        //When a file is selected, grab the URL and set it as the text field's value
        custom_uploader.on('select', function() {
            attachment = custom_uploader.state().get('selection').first().toJSON();
			console.log(attachment.url);
			console.log($($btn).siblings());
            $($btn).siblings('.image_upload_value').val(attachment.url);
			$($btn).siblings('.image_upload_preview').attr("src", attachment.url)
        });
 
        //Open the uploader dialog
        custom_uploader.open();
 
    });
	
	$('.image_upload_clear').click(function(e) {
		
		e.preventDefault();
		
		$(this).siblings('.image_upload_value').val('');
		$(this).siblings('.image_upload_preview').attr("src", '');
		
	});
 
 
});