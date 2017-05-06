function ForecastTileView(domElement)
{
    View.call(this, domElement);
    
    this.models = {};
    this.currentCity = false;
    this.wasSyncAtLeastOnce = false;
    
    this.render();
}

/* View */
ForecastTileView.prototype = Object.create(View.prototype);
ForecastTileView.prototype.constructor = ForecastTileView;

/* ModelListener */
ForecastTileView.prototype.onInitilize = function(model)
{
    if (!this.currentCity)
        this.currentCity = model.city;

    this.models[model.city] = model;
    this.render();
}

View.prototype.onSynchronize = function(model)
{
    return;
}

View.prototype.onDesynchronize = function(model)
{
    if (this.currentCity == model.city)
        this.render();
}

View.prototype.onChange = function(model, changedAttributes)
{
    if (this.currentCity == model.city)
        this.render();
}

/* ForecastTileView */ 
ForecastTileView.prototype.currentModel = function()
{
    return this.models[this.currentCity];
}

ForecastTileView.prototype.onChangeCity = function(city)
{
    if (this.currentCity == city)
        return;

    if (!hasOwnProperty.call(this.models, city))
    {
        console.warn('ForecastTileView.prototype.onChangeCity - City not found: ' + city);
        return;
    }

    this.currentCity = city;
    this.render();
}

ForecastTileView.prototype.render = function()
{
    if (Object.keys(this.models).length === 0)
        return this.renderLoadingScript();

    if (!this.currentModel().isSynchronized)
        return this.renderUnsynchronized(this.currentModel());

    this.renderSynchronized(this.currentModel());
}

ForecastTileView.prototype.renderLoadingScript = function()
{
    var html =
        '<div class="tile-large bg-white fg-black">'
      +     '<p class="text-shadow margin10">'
      +         '<span class="mif-spinner4 mif-ani-pulse" style="margin-right: 10px"></span>Loading script ... '
      +     '</p>'
      + '</div>';

    this.DOM().html(html);
}

ForecastTileView.prototype.renderUnsynchronized = function(model)
{
    var html =
        '<div class="tile-large bg-white fg-black">'
      +     '<p class="text-shadow margin10">'
      +         '<span class="mif-spinner4 mif-ani-pulse" style="margin-right: 10px"></span>Connection to server ... '
      +     '</p>'
      + '</div>';

    this.DOM().html(html);
}

ForecastTileView.prototype.renderSynchronized = function(model)
{
    var html =
        '<div class="tile-large bg-white fg-black">'
        +    '<div class="tile-content">'
        +       this.buildMenu()

        +       '<h1 data-role="icon" style="font-size: 4em; position: absolute; top: -5px; left: 25px;"></h1>'
        +       '<h3 data-role="temperature" class="place-left align-right text-shadow" style="margin-left: 110px; width: 50px; display:block;">' + (model.currently.temperature * 1).toFixed() + '<span class="mif-celsius" style="margin-left: -3px; margin-bottom: 8px"></h3>'

        +       '<div class="place-right" style="width: 145px; margin-top: 15px">'
        +           '<p data-role="precipIntensity" class="no-margin"></p>'
        +           '<p data-role="cloudCover" class="no-margin"></p>'
        +           '<p data-role="windSpeed" class="no-margin"></p>'
        +       '</div>'

        +       '<strong data-role="date" class="place-left nomargin" style="width: 150px; margin-left: 10px; margin-top: -20px"></strong>'
        +       '<div class="clear-float"></div>'

        +       '<div style="height: 100px">'
        +           '<div data-role="streamer" data-scroll-bar="true" data-slide-speed="500">'
        +               '<div class="events" style="overflow-x: hidden; overflow-y: hidden;">'
        +                   '<canvas style="margin-top: -10px" width="1000" height="100"></canvas>'
        +               '</div>'
        +           '</div>'
        +       '</div>'

        +       '<div style="margin-top: 10px">' + this.buildDaily(model.daily) + '</div>'
        +   '</div>'
        + '</div>';

    this.DOM().html(html);
    
    $(this.domElement + " a[data-role|='cities']").click(this, function(e) {e.data.onChangeCity($(this).data('value'));});
    this.updateFields(model.currently);

    if ($(this.domElement + " canvas").length != 0)
    {
        var chart = new Chart($(this.domElement + " canvas")[0].getContext("2d"));
        chart.Line(this.buildChartData(model.hourly), this.buildChartOptions());
    }
}

ForecastTileView.prototype.buildMenu = function()
{
    var html = 
          '<ul class="horizontal-menu compact">'
        +     '<li class="place-right shadow bg-grayLighter">'
        +         '<a href="#" class="dropdown-toggle text-bold align-center" style="width: 200px">' + this.currentModel().city + '</a>'
        +         '<ul class="d-menu" data-role="dropdown">'

    for (var city in this.models)
    {
        html += '<li><a href="#" data-role="cities" data-value="' + city + '">' + this.models[city].city + '</a></li>';
    }

    html +=       '</ul>'
        +     '</li>'
        + '</ul>';

    return html;
}

ForecastTileView.prototype.buildDaily = function(dailyData)
{
    var html = '';
    var data = dailyData.data;
    var numData = (data.length > 5) ? 5 : data.length;
    for (var i = 0; i < numData; ++i)
    {
        var dateTime = Date.createFromTimestamp(data[i].time);
        html += '<div class="place-left align-center shadow bg-grayLighter" style="width: 50px; height: 100px; margin-left:10px">'
            +       '<h1 class="text-shadow ' + ForecastTileView.icons[data[i].icon] + '" style="font-size: 2em; display: block; margin-bottom: 5px; margin-top: 5px"></h1>'
            +       '<strong class="place-left text-secondary fg-darkBlue" style="width: 25px; display:block">' + data[i].temperatureMin.toFixed() + '</strong>'
            +       '<strong class="place-right text-secondary fg-darkRed" style="width: 25px; display:block">' + data[i].temperatureMax.toFixed() + '</strong>'
            +       '<strong class="text-small mif-weather4"> ' + data[i].precipProbability.toFixed() + '%</strong>'
            +       '<strong class="text-small mif-windy2"> ' + data[i].windSpeed.toFixed() + '</strong>'
            +       '<strong>' + dateTime.getDayShortName() + '</strong>'
            + '</div>';
    }
    return html;
}
    
ForecastTileView.prototype.updateFields = function(forecast)
{
    $(this.domElement + " [data-role|='icon']").removeClass().addClass('text-shadow ' + ForecastTileView.icons[forecast.icon]);
    $(this.domElement + " [data-role|='precipIntensity']").html('Pluie: <span class="text-bold">'
        + (forecast.precipIntensity * 1).toFixed(2)
        + '</span> mm (<span class="text-bold">'
        + (forecast.precipProbability * 100).toFixed()
        + '</span> %)');
    $(this.domElement + " [data-role|='cloudCover']").html('Nuage: <span class="text-bold">' + (forecast.cloudCover * 100).toFixed() + '</span> %');
    $(this.domElement + " [data-role|='windSpeed']").html('Vent: <span class="text-bold">' + forecast.windSpeed + '</span> km/h');
    var d = Date.createFromTimestamp(forecast.time);
    $(this.domElement + " [data-role|='date']").html(d.getDayName() + '<br />' + d.getDate() + ' ' + d.getMonthShortName() + ' ' + d.getFullYear() + ' - ' + d.getHHhMI());
}

ForecastTileView.icons =
{
    'clear-day': 'mif-sun',
    'clear-night': 'mif-moon2',
    'rain': 'mif-rainy',
    'snow': 'mif-snowy3',
    'sleet': 'mif-weather4',
    'wind': 'mif-wind',
    'fog': 'mif-cloudy2',
    'cloudy': 'mif-cloudy',
    'partly-cloudy-day': 'mif-cloudy3',
    'partly-cloudy-night': 'mif-cloud5'
};

ForecastTileView.prototype.buildChartOptions = function()
{
    var that = this;
    var options =
    {
        bezierCurve: true,
        showScale: true,
        scaleLineWidth: 2,
        scaleFontSize: 11,
        scaleOverride: true,
        scaleShowLabels: false,
        scaleStartValue: 0,
        scaleSteps: 10,
        scaleStepWidth: 10,
        pointDot: false,
        pointHitDetectionRadius: 4,
        tooltipEvents: ["mousemove"],
        showTooltips: true,
        customTooltips: function(e)
        {
            if(!e)
                return;
            that.updateFields(that.currentModel().hourly.data[e.labels[0]]);
        },
        tooltipTemplate: "<%=index%>",
        multiTooltipTemplate: "<%=index%>",
        tooltipXOffset: 2
    };
    
    return options;
}

ForecastTileView.prototype.buildChartData = function(hourlyData)
{
    var hourly = hourlyData.data;
    
    var numData = hourly.length;
    var data =
    {
        labels: [],
        temperature: [],
        precipProbability: [],
        zeroAxe: []
    };
    
    for (var i = 0; i < numData; ++i)
    {
        data.labels.push(hourly[i].time);
        data.temperature.push(hourly[i].temperature);
        data.precipProbability.push(hourly[i].precipProbability);
        data.zeroAxe.push(0);
    }
    
    var minTemperature = Math.min.apply(null, data.temperature);
    var maxTemperature = Math.max.apply(null, data.temperature);
    
    for (var i = 0; i < numData; ++i)
    {
        data.labels[i] = (i % 2 == 0) ? (new Date.createFromTimestamp(data.labels[i])).getHours() + 'h' : '';
        data.temperature[i] = this.remap(minTemperature, maxTemperature, data.temperature[i]);
        data.precipProbability[i] = (data.precipProbability[i] * 100).toFixed();
        data.zeroAxe[i] = (maxTemperature > 0 && minTemperature < 0) ? this.remap(minTemperature, maxTemperature, data.zeroAxe[i]) : null;
    }

    var data =
    {
        labels: data.labels,
        datasets: [
            {
                label: "Temperature",
                fillColor: "rgba(249,224,0,0.5)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: data.temperature
            },
            {
                label: "Precipitation Probability",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: data.precipProbability
            },
            {
                label: "Zero Degree",
                fillColor: "rgba(0,0,0,0)",
                strokeColor: "rgba(0,0,0,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: data.zeroAxe
            }
        ]
    };

    return data;
}

ForecastTileView.prototype.remap = function(min, max, value)
{
    return (value - min) * 100 / (max - min);
}