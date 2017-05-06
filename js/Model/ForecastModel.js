function ForecastModel(router, city, latitude, longitude)
{
    Model.call(this, router, 'Forecast', 600 * 1000);

    this.city = city;
    this.latitude = latitude;
    this.longitude = longitude;
    this.currently = {};
    this.hourly = {};
    this.daily = {};
}

/* Model */
ForecastModel.prototype = Object.create(Model.prototype);
ForecastModel.prototype.constructor = ForecastModel;

ForecastModel.prototype.getRefreshData = function()
{
    return {latitude: this.latitude, longitude: this.longitude};
}