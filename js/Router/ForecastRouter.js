function ForecastRouter()
{
    Router.call(this);

    this.apiKey = '670edf7724f35d96498b37cb49d90678';
}

/* Router */
ForecastRouter.prototype = Object.create(Router.prototype);
ForecastRouter.prototype.constructor = ForecastRouter;

ForecastRouter.prototype.execute = function()
{
    this.requests.forEach(function(_)
    {
        $.ajax(
        {
            dataType: "jsonp",
            url: 'https://api.forecast.io/forecast/'
                + this.apiKey + '/'
                + _.data.latitude + ','
                + _.data.longitude,
            data:
            {
                'units': 'ca',
                'lang': 'fr'
            },
            context: this,
            success: function(results, textStatus, jqXHR) {this.successCallback([_.callback], [results], [_.data], textStatus, jqXHR);},
            error: function(jqXHR, textStatus, errorThrown) {this.errorCallback([_.callback], [_.data], jqXHR, textStatus, errorThrown);},
            complete: function(jqXHR, textStatus) {this.completeCallback([_.callback], jqXHR, textStatus);}
        })
        
    }, this);
}