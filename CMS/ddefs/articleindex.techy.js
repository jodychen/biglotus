module.exports = function() {
    var artindex = '',
    pages = this.pages();
    artindex += '[';
    var ppa = [];
    var p;
    for(var i=0; i < pages.length, page=pages[i]; i++) {
	if ('ddef' === page.get('tag')) {
	    p = '{  "Title": "' +  page.get('title') + '", "Url": "' + page.get('paths').url + '" }'; 
	    ppa.push(p);
	}

    }
    artindex += ppa.join(",")
    artindex += "]";
    return artindex;
}
