// ClozeCard constructor takes two arguments: text and cloze.
exports.ClozeCard = function(text, cloze) {
	// Converting incoming strings to lower case
	var textToLower = text.toLowerCase();
	var clozeToLower = cloze.toLowerCase();

	// Confirming that the cloze statement appears within the full text
	if (!textToLower.includes(clozeToLower)) {
		console.log('ERROR: cloze-deletion is not part of the full text -- <' + cloze + '>');
		return;
	}

	this.full = text;
	this.cloze = cloze;
	this.partial = text.replace(cloze, '...');
}