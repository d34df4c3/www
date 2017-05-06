function DriveSmallTileView(domElement)
{
    View.call(this, domElement);

    this.model = false;
    this.wasSyncAtLeastOnce = false;

    this.render();
}

/* View */
DriveSmallTileView.prototype = Object.create(View.prototype);
DriveSmallTileView.prototype.constructor = DriveSmallTileView;

/* ModelListener */
DriveSmallTileView.prototype.onInitilize = function(model)
{
    this.model = model;
    this.render();
    $(this.domElement + " strong").html('<span class="mif-spinner4 mif-ani-pulse"></span>');
    $(this.domElement + " strong").show();
}

DriveSmallTileView.prototype.onSynchronize = function(model)
{
    this.render(model);
}

DriveSmallTileView.prototype.onDesynchronize = function(model)
{
    $(this.domElement + " strong").html('<span class="mif-spinner4 mif-ani-pulse"></span>');
    $(this.domElement + " strong").show();
}

DriveSmallTileView.prototype.onChange = function(model, changedAttributes)
{
    this.renderOnChange(model);
}

DriveSmallTileView.prototype.render = function()
{
    var html =
        '<a href="#" class="tile-small bg-lightOlive fg-white" data-role="tile">'
      + '   <div class="tile-content iconic">'
      + '       <span class="icon mif-drive"></span>'
      + '   </div>'
      + '   <span class="tile-label text-small">' + (this.model.name + '').substring(4) + '</span>'
      + '   <strong class="tile-badge bg-magenta text-small" style="display: none;"><span class="mif-warning mif-ani-ring"></span></strong>'
      + '</a>';

    this.DOM().html(html);
    
    if (!this.model || !this.model.isSynchronized)
        return;

    this.renderOnChange(this.model);
}

DriveSmallTileView.prototype.renderOnChange = function(model)
{
    if (model.isMounted)
        $(this.domElement + " strong").hide();
    else
        $(this.domElement + " strong").show();
}