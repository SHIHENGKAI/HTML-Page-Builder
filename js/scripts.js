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

jQuery(document).ready(function(){
	 
	/**
	 * This is the click event for our element links
	 * Clicking this element causes this script to read and return the associated HTML file.
	 * This is then echoed into the correct container.
	 */
	$('.element-fetcher').click(function(){
		
		var $this = $(this),
			echo = readHTMLFile( $(this).attr('href') );
			
		$( $this.attr('data-destination') ).append(echo);
		
		return false;
		
	});
	
	/**
	 * Here's the output section
	 */
	$('#output-button').click(function(){
		var content = $('#content').html();
		content = content.replace(/class="ui-sortable"/g, '');
		content = content.replace(/contenteditable="true"/g, '');
		content = content.replace(/<section class="block"><div class="handle"><\/div>/g, '');
		content = content.replace(/<!--end block--><\/section>/g, '');
		$('#output-code').text(content);
	});
	
	$('#page-content').sortable({ handle: ".handle" });
});