module.exports = function() {
    var artindex = '',
    pages = this.pages();

    for(var i=0; i < pages.length, page=pages[i]; i++) {
	artindex += '<a href="' + page.get('paths').url + '">' + page.get('title') + '</a>\n';
    }
    return artindex;
}