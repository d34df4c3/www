function ForecastSmallTileView(domElement)
{
    View.call(this, domElement);

    this.model = false;
    this.render();
}

/* View */
ForecastSmallTileView.prototype = Object.create(View.prototype);
ForecastSmallTileView.prototype.constructor = ForecastSmallTileView;

/* ModelListener */
ForecastSmallTileView.prototype.onInitilize = function(model)
{
    this.model = model;
    this.render();
    $(this.domElement + " span[data-role='city']").text('Connecting ...');
    $(this.domElement + " strong[data-role='lowTemp']").text('');
    $(this.domElement + " strong[data-role='highTemp']").text('');
    $(this.domElement + " div[data-role='icon']").html('<span class="icon mif-spinner4 mif-ani-pulse"></span>');
}

ForecastSmallTileView.prototype.onSynchronize = function(model)
{
    return;
}

ForecastSmallTileView.prototype.onDesynchronize = function(model)
{
    $(this.domElement + " span[data-role='city']").text('Connecting ...');
    $(this.domElement + " strong[data-role='lowTemp']").text('');
    $(this.domElement + " strong[data-role='highTemp']").text('');
    $(this.domElement + " div[data-role='icon']").html('<span class="icon mif-spinner4 mif-ani-pulse"></span>');
}

ForecastSmallTileView.prototype.onChange = function(model, changedAttributes)
{
    this.renderOnChange(model);
}

ForecastSmallTileView.prototype.render = function()
{
    var html =
        '<a href="#" class="tile-small bg-white fg-dark" data-role="tile">'
      + '   <div data-role="icon" class="tile-content iconic"><span class="icon mif-spinner4 mif-ani-pulse"></span></div>'
      + '   <span data-role="city" class="tile-label text-small" style="top: 2px">Loading ...</span>'
      + '   <strong data-role="lowTemp" class="tile-badge bg-darkCyan fg-white text-small align-center" style="left: 6px; width: 25px; padding-left: 5px; padding-right: 5px"></strong>'
      + '   <strong data-role="highTemp" class="tile-badge bg-darkRed fg-white text-small align-center" style="right: 6px; width: 25px; padding-left: 5px; padding-right: 5px"></strong>'
      + '</a>'
      
    this.DOM().html(html);

    if (!this.model || !this.model.isSynchronized)
        return;

    this.renderOnChange(this.model);
}

ForecastSmallTileView.prototype.renderOnChange = function(model)
{
    var forecast = model.daily.data[0];

    $(this.domElement + " span[data-role='city']").text(model.city);
    $(this.domElement + " strong[data-role='lowTemp']").text(forecast.temperatureMin.toFixed());
    $(this.domElement + " strong[data-role='highTemp']").text(forecast.temperatureMax.toFixed());
    $(this.domElement + " div[data-role='icon']").html('<span class="icon ' + ForecastTileView.icons[forecast.icon] + '"></span>');
}