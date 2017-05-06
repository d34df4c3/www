function MagicHomeModel(router, ledName)
{
    Model.call(this, router, 'MagicHome-' + ledName, 60 * 1000);

    this.ledName = ledName;
	this.state = 'NotConnected';
    this.color = '0, 0, 0';
}

/* Model */
MagicHomeModel.prototype = Object.create(Model.prototype);
MagicHomeModel.prototype.constructor = MagicHomeModel;