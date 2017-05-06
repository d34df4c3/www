function MainContentView(domElement)
{
    View.call(this, domElement);
}

/* View */
MainContentView.prototype = Object.create(View.prototype);
MainContentView.prototype.constructor = MainContentView;

MainContentView.prototype.render = function()
{
    var html =
         '<div style="width: 1650px">'
       +    '<div class="tile-group double">'
       +       '<span class="tile-group-title">Services</span>'
       +       '<div id="RadioTileView"></div>'
       +       '<div id="ForecastView"></div>'
       +    '</div>'

       +    '<div class="tile-group double">'
       +       '<span class="tile-group-title">Status</span>'
       +       '<div id="NathDriveView"></div>'
       +       '<div id="ChronoDriveView"></div>'
       +       '<div id="HubicView"></div>'
       +    '</div>'

       +    '<div class="tile-group double">'
       +       '<span class="tile-group-title">Agenda</span>'
       +       '<div id="CalendarView"></div>'
       +    '</div>'

       +    '<div class="tile-group double">'
       +       '<span class="tile-group-title">Post-It</span>'
       +       '<div id="PostItView"></div>'
       +    '</div>'
       + '</div>';

    this.DOM().html(html);
}