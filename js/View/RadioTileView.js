function RadioTileView(domElement)
{
    View.call(this, domElement);
    
    this.model = false;
    this.render();
}

/* View */
RadioTileView.prototype = Object.create(View.prototype);
RadioTileView.prototype.constructor = RadioTileView;

/* ModelListener */
RadioTileView.prototype.onInitilize = function(model)
{
    this.model = model;
    this.render();
}

RadioTileView.prototype.render = function()
{
    if (!this.model)
        return this.renderLoadingScript();

    if (!this.model.isSynchronized)
        return this.renderUnsynchronized(this.model);

    this.renderSynchronized(this.model);
}

RadioTileView.prototype.renderLoadingScript = function()
{
    var html =
        '<a href="/Radio" class="tile bg-grayLight fg-white" data-role="tile">'
      +     '<div id="radioTileIdle" class="tile-content iconic">'
      +         '<span class="icon mif-music"></span>'
      +         '<span class="tile-label"><span class="mif-spinner4 mif-ani-pulse" style="margin-right: 10px"></span>Loading ... </span>'
      +     '</div>'
      + '</a>';

    this.DOM().html(html);
}

RadioTileView.prototype.renderUnsynchronized = function(model)
{
    var html =
        '<a href="/Radio" class="tile bg-grayLight fg-white" data-role="tile">'
      +     '<div id="radioTileIdle" class="tile-content iconic">'
      +         '<span class="icon mif-music"></span>'
      +         '<span class="tile-label"><span class="mif-spinner4 mif-ani-pulse" style="margin-right: 10px"></span>Connecting ... </span>'
      +     '</div>'
      + '</a>';

    this.DOM().html(html);
}

RadioTileView.prototype.renderSynchronized = function(model)
{
    var html = '<a href="/Radio" class="tile bg-lightBlue fg-white" data-role="tile">';

    if (model.state != 'play')
    {
    
        html += '<div class="tile-content iconic">'
           +     '<span class="icon mif-music"></span>'
           +     '<span class="tile-label">Radio</span>'
           + '</div>';
    }
    else
    {
        html += '<div class="tile-content image-container">'
           +     '<div class="frame">'
           +         '<img src="Radio/' + (model.coverimage ? model.coverimage : 'templates/default/images/default_cover.png') + '" />'
           +     '</div>'
           +     '<div class="image-overlay">'
           +         '<p class="align-left no-margin text-small">'
           +             '<strong>' + model.artist + '</strong><br />'
           +             '<strong>' + model.album + '</strong><br /><br />'
           +             '<span>' + model.title + '</span>'
           +         '</p>'
           +     '</div>'
           + '</div>';
    }

    html += '</a>';

    this.DOM().html(html);
}