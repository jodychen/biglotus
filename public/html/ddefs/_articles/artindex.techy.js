module.exports = function() {
    var artindex = '',
    pages = this.pages();
    artindex += '<script> var ddefs = [';
    var ppa = [];
    var p;
    for(var i=0; i < pages.length, page=pages[i]; i++) {
	// artindex += '<a href="' + page.get('paths').url + '">' + page.get('title') + '</a>\n';
	p = '{  Title: "' +  page.get('title') + '", Url: "' + page.get('paths').url + '" }'; 
	ppa.push(p);
    }
    artindex += ppa.join(",\n")
    artindex += "\n]</script>";
    return artindex;
}
