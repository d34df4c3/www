function MagicHomeSmallTileView(domElement)
{
    View.call(this, domElement);

    this.model = false;
    this.wasSyncAtLeastOnce = false;

    this.render();
}

/* View */
MagicHomeSmallTileView.prototype = Object.create(View.prototype);
MagicHomeSmallTileView.prototype.constructor = MagicHomeSmallTileView;

/* ModelListener */
MagicHomeSmallTileView.prototype.onInitilize = function(model)
{
    this.model = model;
	var thisObject = this;
	$(this.domElement).click(function() {thisObject.toggle()});
    this.render();
    $(this.domElement + " strong").html('<span class="mif-spinner4 mif-ani-pulse"></span>');
    $(this.domElement + " strong").show();
}

MagicHomeSmallTileView.prototype.onSynchronize = function(model)
{
    this.render(model);
}

MagicHomeSmallTileView.prototype.onDesynchronize = function(model)
{
    $(this.domElement + " strong").html('<span class="mif-spinner4 mif-ani-pulse"></span>');
    $(this.domElement + " strong").show();
}

MagicHomeSmallTileView.prototype.onChange = function(model, changedAttributes)
{
    this.renderOnChange(model);
}

MagicHomeSmallTileView.prototype.render = function()
{
    var html =
        '<a href="#" class="tile-small fg-white" data-role="tile">'
      + '   <div class="tile-content iconic">'
      + '       <span class="icon mif-lamp"></span>'
      + '   </div>'
      + '   <span class="tile-label text-small">' + (this.model.ledName) + '</span>'
      + '   <strong class="tile-badge bg-magenta text-small" style="display: none;"><span class="mif-warning mif-ani-ring"></span></strong>'
      + '</a>';

    this.DOM().html(html);
    
    if (!this.model || !this.model.isSynchronized)
        return;

    this.renderOnChange(this.model);
}

MagicHomeSmallTileView.prototype.renderOnChange = function(model)
{
	if (model.state == 'OFF')
	{
        $(this.domElement + " a").css('background-color', 'black');
        $(this.domElement + " strong").hide();
		return;
	}
	if (model.state == 'ON')
	{
        
		$(this.domElement + " a").css('background-color', 'rgb(' + model.color + ')');
        $(this.domElement + " strong").hide();
		return;
	}

	$(this.domElement + " a").css('background-color', 'black');
    $(this.domElement + " strong").show();
}

MagicHomeSmallTileView.prototype.toggle = function()
{
	if (!this.model)
		return;

	if (this.model.state == 'ON')
	{
		this.model.sendRequest({action: 'OFF'});
	}
	if (this.model.state == 'OFF')
	{
		this.model.sendRequest({action: 'ON'});
	}
}