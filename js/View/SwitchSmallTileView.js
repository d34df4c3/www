function SwitchSmallTileView(domElement, model)
{
    View.call(this, domElement);

    this.model = model;
    this.render(model.getState());
	var thisObject = this;
	$(this.domElement).click(function() {thisObject.toggle()});
}

/* View */
SwitchSmallTileView.prototype = Object.create(View.prototype);
SwitchSmallTileView.prototype.constructor = SwitchSmallTileView;

/* ModelListener */
SwitchSmallTileView.prototype.render = function(data)
{
	this.DOM().empty();
	var html =
        '<a href="#" class="tile-small fg-white bg-black" data-role="tile">'
      + '   <div class="tile-content iconic">'
      + '       <span class="icon mif-lamp"></span>'
      + '   </div>'
      + '   <span class="tile-label text-small">' + (this.model.switchName) + '</span>'
      + '   <strong class="tile-badge bg-magenta text-small" style="display: none;"><span class="mif-warning mif-ani-ring"></span></strong>'
      + '</a>';

    this.DOM().html(html);
	
	if (!data)
	{
		$(this.domElement + " strong").show();
		return;
	}

	$(this.domElement + " strong").hide();
    if (data[0].state == 'ON')
	{
		$(this.domElement + " a").addClass('bg-yellow');
	} else {
		$(this.domElement + " a").removeClass('bg-yellow');
	}
}

SwitchSmallTileView.prototype.toggle = function()
{
	var data = this.model.toggle();
	this.render(data);
}