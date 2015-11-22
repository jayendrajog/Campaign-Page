//initilization
var campaigns = []; /*This holds all of the parsed JSON data, a database could be used instead for larger amounts
					  of data, but since this is a small amount of data, this variable is sufficient */

$the_url = "https://api.indiegogo.com/1/search/campaigns.json?api_token=e377270bf1e9121da34cb6dff0e8af52a03296766a8e955c19f62f593651b346";
window.onload = function(){
	$.getJSON( $the_url, function( data ) {
			$.each(data, function(obj, key, value){
				var titles = [];
				var counter = 0;
				var index = 0;
				for(var i in key)
				{
					if(key[i] != null && key[i].image_types != undefined)
					{
						campaigns.push({title: key[i].title, web_url: key[i].web_url, image_url: key[i].image_types.small, tagline: key[i].tagline});
						if(counter % 4 == 0)
							titles.push('<div class="row">');

						titles.push('<div class="grid-item"><div class="name">' + campaigns[index].title 
							+ '</div><a target = "_blank" href = "' + campaigns[index].web_url
							+ '"><img class="pic" src ="' +  campaigns[index].image_url 
							+ '"></a><div class="subscript">'+ campaigns[index].tagline + '</div></div>');
						if(((counter+1)%4) == 0)
						{
							titles.push('</div>');
							counter = 0;
						}
						else counter++;
						index++;
					}
				}
				$('#grid').append(titles.join(''));	
			});
	});}

//search bars
function clear(elementID){
	if(document.getElementById(elementID) != null)
    	document.getElementById(elementID).innerHTML = "";
}

function search(input_word, isTitle){
	/*
	@param input_word: the word typed by the user in lowercase form
	@param isTitle: boolean value correlating to whether title is being searched or not
	*/
	var counter = 0;
	var titles = [];
	for(var i in campaigns)
	{
		if(isTitle == true)
			var word = campaigns[i].title.toLowerCase();
		else var word = campaigns[i].tagline.toLowerCase();
		console.log(campaigns[i].title);
		if(word.indexOf(input_word) > -1)
		{
			if(counter % 4 == 0)
			{
				titles.push('<div class="row">');
			}
			console.log('getting called 3');
			titles.push('<div class="grid-item"><div class="name">' + campaigns[i].title 
			+ '</div><a target = "_blank" href = "' + campaigns[i].web_url
			+ '"><img class="pic" src ="' +  campaigns[i].image_url 
			+ '"></a><div class="subscript">'+ campaigns[i].tagline + '</div></div>');
			if(((counter+1)%4) == 0)
			{
				titles.push('</div>');
				counter = 0;
			}
			else counter++;
		}
	}
	console.log(titles);
	clear('grid');
	$('#grid').append(titles.join(''));
}

document.getElementById('submit_title').onclick = function() {search(document.getElementById('the_title').value.toLowerCase(), true)};
document.getElementById('submit_tag').onclick = function() {search(document.getElementById('the_tag').value.toLowerCase(), false)};
document.getElementById('reset_title').onclick = function() {search("", true)};
document.getElementById('reset_tag').onclick = function() {search("", false)};
