var request = require('request'),
    cheerio = require('cheerio'),
    fs      = require('fs');
request('http://substack.net/images/',function(err,resp,body){
    if(!err && resp.statusCode == 200){
	var $ = cheerio.load(body);
	$('tr').filter(function(i,element){
          var permission = $(this).children().first().text();
	  var fileName = $(this).children().last().text();
          var absoluteLink = 'http://substack.net/images/' + fileName;
	  var fileType = fileName.slice(fileName.length - 3, fileName.length).toUpperCase();	
	  
	if(fileName.match(/\w+\.\w+/)){
          fs.appendFile('images.csv', permission + "," + absoluteLink + "," + fileType + '\n', function(err) {
          if (err) {
            throw err;
          };
      	});      
        
	}
	
	});
	
			
	}
});


