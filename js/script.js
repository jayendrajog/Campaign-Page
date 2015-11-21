$the_url = "https://api.indiegogo.com/1/search/campaigns.json?api_token=e377270bf1e9121da34cb6dff0e8af52a03296766a8e955c19f62f593651b346";
$.getJSON( $the_url, function( data ) {
		$.each(data, function(obj, key, value){
			var titles = [];
			var counter = 0;
			for (var i in key)
			{
				if(counter % 4 == 0)
					titles.push('<div class="row">');
				titles.push('<div class="grid-item"><div class="name">' + key[i].title 
					+ '</div><img class="pic" src ="' + key[i].image_types.small 
					+ '"><div class="subscript">'+ key[i].tagline + '</div></div>');
				if((counter+1)%4== 0)
				{
					titles.push('</div>');
					counter = 0;
				}
				else counter++;
			}
			$('#grid').append(titles.join(''));		
		});
});
$('#container').masonry({
    // options
    itemSelector : '.item',
    columnWidth : 200
  });

$('.grid').isotope({
  // options
  itemSelector: '.grid-item',
  layoutMode: 'fitRows'
});