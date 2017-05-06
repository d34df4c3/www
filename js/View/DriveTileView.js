function DriveTileView(domElement)
{
    View.call(this, domElement);
    
    this.model = false;
    this.render();
}

/* View */
DriveTileView.prototype = Object.create(View.prototype);
DriveTileView.prototype.constructor = DriveTileView;

/* ModelListener */
DriveTileView.prototype.onInitilize = function(model)
{
    this.model = model;
    this.render();
}

DriveTileView.prototype.render = function()
{
    if (!this.model)
        return this.renderLoadingScript();

    if (!this.model.isSynchronized)
        return this.renderUnsynchronized(this.model);

    this.renderSynchronized(this.model);
}

DriveTileView.prototype.renderLoadingScript = function()
{
    var html =
        '<a class="tile-small tile-wide-x bg-grayLight fg-white" data-role="tile">'
      +     '<div class="tile-content">'
      +         '<div class="padding10">'
      +             '<h1 class="mif-drive place-left margin10"></h1>'
      +             '<p class= "text-shadow text-secondary place-left margin10" style="width: 210px; margin-top: 5px">'
      +                 '<span class="mif-spinner4 mif-ani-pulse" style="margin-right: 10px"></span>Loading script ... '
      +             '</p>'
      +         '</div>' 
      +     '</div>'
      + '</a>';

    this.DOM().html(html);
}

DriveTileView.prototype.renderUnsynchronized = function(model)
{
    if (!this.wasSyncAtLeastOnce)
    {
        var html =
            '<a class="tile-small tile-wide-x bg-grayLight fg-white" data-role="tile">'
          +     '<div class="tile-content">'
          +         '<div class="padding10">'
          +             '<h1 class="mif-drive place-left margin10"></h1>'
          +             '<p class= "text-shadow place-left margin10 no-margin-top no-padding">' + model.diskName + '</p>'
          +             '<p class= "text-shadow text-secondary place-left margin10" style="width: 210px; margin-top: 5px">'
          +                 '<span class="mif-spinner4 mif-ani-pulse" style="margin-right: 10px"></span>Connection to server ... '
          +             '</p>'
          +         '</div>' 
          +     '</div>'
          + '</a>';

        this.DOM().html(html);
    }
    else
    {
        var html =
            '<a class="tile-small tile-wide-x bg-grayLight fg-white" data-role="tile">'
          +     '<div class="tile-content">'
          +         '<div class="padding10">'
          +             '<h1 class="mif-drive place-left margin10"></h1>'
          +             '<p class= "text-shadow place-left margin10 no-margin-top no-padding">' + model.diskName + '</p>'
          +             '<p class= "text-shadow text-secondary place-left margin10" style="width: 210px; margin-top: 5px">'
          +                 '<span class="mif-spinner4 mif-ani-pulse" style="margin-right: 10px;"></span>Synchronization lost ...'
          +             '</p>'
          +         '</div>' 
          +     '</div>'
          + '</a>';

        this.DOM().html(html);
    }
}

DriveTileView.prototype.renderSynchronized = function(model)
{
    var html =
        '<a class="tile-small tile-wide-x bg-lightOlive fg-white" data-role="tile">'
      +     '<div class="tile-content">'
      +         '<div class="padding10">'
      +             '<h1 class="mif-drive place-left margin10"></h1>'
      +             '<p class= "text-shadow place-left margin10 no-margin-top no-padding">' + model.diskName + '</p>'
      +             '<div class="place-left margin10 no-margin-bottom no-margin-top no-padding" style="width: 210px" data-value="' + (model.usedSpace / model.totalSpace * 100) + '" data-color="bg-lightGreen" data-role="progress"></div>'
      +             '<p class= "text-shadow text-secondary place-left margin10" style="width: 210px; margin-top: 5px">'
      +                 '<strong class="text-shadow">' + this.byteToGB(model.freeSpace) + '</strong> GB free of <strong class="text-shadow">' + this.byteToGB(model.totalSpace) + '</strong> GB'
      +             '</p>'
      +         '</div>' 
      +     '</div>'
      + '</a>';

    this.DOM().html(html);
}

DriveTileView.prototype.byteToGB = function(numBytes)
{
    numGB = numBytes / 1048576;
    return numGB.toFixed(1);
}