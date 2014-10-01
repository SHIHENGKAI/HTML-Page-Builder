/*-----------------------------------------------------------------------------------*/
/*	CUSTOM FUNCTIONS
/*-----------------------------------------------------------------------------------*/
function readHTMLFile(url){
    var toReturn;
    $.ajax({
        url: url,
        async: false
    }).done(function(data){
        toReturn = data;
    });
    return toReturn;
};

/**
 * This dpesnt really work, so will revisit
 */
function blockAdded () {
	$('#removeme').each(function() {
		$(this).on('click', function() {
	        $(this).closest('.block').remove();
	    });
    });

    $('*[contenteditable="true"]').summernote({
	  airMode: true
	});
};
/*-----------------------------------------------------------------------------------*/
/*	DOCUMENT READY JS
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function(){
	 
	/**
	 * Call sortable on where we're adding page sections
	 * This means that the page can easily be re-ordered
	 * 
	 * @toDo: We could do with the same thing available for sections with multiple blocks inside them, like a text section with 3 columns of text
	 */
	$('#page-content').sortable({ 
		handle: ".handle",
		placeholder: "ui-state-highlight",
		forcePlaceholderSize: true
	});
	
	/**
	 * This is the click event for our element links
	 * Clicking this element causes this script to read and return the associated HTML file.
	 * This is then echoed into the correct container.
	 */
	$('.element-fetcher').click(function(){
		
		var $this = $(this),
			echo = readHTMLFile( $this.attr('href') );
		
		$( $this.attr('data-destination') ).append(echo);		
		
		$('.sortable').each(function(){
			$(this).sortable({
				handle: ".sub-handle"
			});	
		});

		blockAdded();
		
		return false;
		
	});
	
	/**
	 * Here's the output section
	 */
	$('#output-button').click(function(){
		var content = $('#content').html();
		content = content.replace(/class="ui-sortable"/gi, '');
		content = content.replace(/contenteditable="true"/gi, '');
		content = content.replace(/<section class="block"><div class="handle"><\/div>/gi, '');
		content = content.replace(/<!--end block--><\/section>/gi, '');
		$('#output-code').text(content);
	});

});

/*-----------------------------------------------------------------------------------*/
/*	DANS CRUDE JS - HOLD ON TIGHT
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function(){
	
	/**
	 * Stylish menu
	 */
    $('#menu').metisMenu();

	/**
	 * Menu hide
	 */
	$('#close-menu').click(function(){
    	$('#content, #builder').toggleClass("menu-closed");
    	return false;
    });
});