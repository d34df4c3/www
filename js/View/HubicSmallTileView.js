function HubicSmallTileView(domElement)
{
    View.call(this, domElement);

    this.model = false;
    this.wasSyncAtLeastOnce = false;

    this.render();
}

/* View */
HubicSmallTileView.prototype = Object.create(View.prototype);
HubicSmallTileView.prototype.constructor = HubicSmallTileView;

/* ModelListener */
HubicSmallTileView.prototype.onInitilize = function(model)
{
    this.model = model;
    this.render();
    $(this.domElement + " strong").html('<span class="mif-spinner4 mif-ani-pulse"></span>');
    $(this.domElement + " strong").show();
}

HubicSmallTileView.prototype.onSynchronize = function(model)
{
    this.render(model);
}

HubicSmallTileView.prototype.onDesynchronize = function(model)
{
    $(this.domElement + " strong").html('<span class="mif-spinner4 mif-ani-pulse"></span>');
    $(this.domElement + " strong").show();
}

HubicSmallTileView.prototype.onChange = function(model, changedAttributes)
{
    this.renderOnChange(model);
}

HubicSmallTileView.prototype.render = function()
{
    var html =
        '<a href="#" class="tile-small bg-blue fg-white" data-role="tile">'
      + '   <div class="tile-content iconic">'
      + '       <span class="icon mif-cloud"></span>'
      + '   </div>'
      + '   <span class="tile-label text-small">HubiC</span>'
      + '   <strong class="tile-badge bg-magenta text-small" style="display: none;"><span class="mif-warning mif-ani-ring"></span></strong>'
      + '</a>';

    this.DOM().html(html);

    if (!this.model || !this.model.isSynchronized)
        return;

    this.renderOnChange(this.model);
}

HubicSmallTileView.prototype.renderOnChange = function(model)
{
    if (model.state != 'NotConnected')
        $(this.domElement + " strong").hide();
    else
        $(this.domElement + " strong").show();
}