function RadioModel(router)
{
    Model.call(this, router, 'Radio', 10000);

    this.state = '';
    this.title = '';
	this.album = '';
	this.artist = '';
	this.file = '';
	this.filename = '';
	this.length = 0;
	this.position = 0;
	this.volume = 0;
	this.repeat = 0;
	this.random = 0;
}

/* Model */
RadioModel.prototype = Object.create(Model.prototype);
RadioModel.prototype.constructor = RadioModel;

RadioModel.prototype.getRefreshData = function()
{
    return {action: 'refresh'};
}