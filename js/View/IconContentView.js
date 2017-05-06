function IconContentView(domElement)
{
    View.call(this, domElement);
}

/* View */
IconContentView.prototype = Object.create(View.prototype);
IconContentView.prototype.constructor = IconContentView;

IconContentView.prototype.render = function()
{
    var html =
         '<div style="width: 400px">'
       +    '<div class="tile-group double">'
       +       '<div id="RadioTileView"></div>'
       +       '<div id="CalendarSmallView-Julien"></div>'
       +       '<div id="CalendarSmallView-Nathalie"></div>'
       +       '<div id="PostItSmallView" onClick="javascript:content.render(\'calendar\');"></div>'
       +       '<div id="ChronoDriveSmallView" onClick="javascript:content.render(\'computer\');"></div>'
       +       '<div id="NathDriveSmallView" onClick="javascript:content.render(\'computer\');"></div>'
       +       '<div id="HubicSmallView" onClick="javascript:content.render(\'computer\');"></div>'
       +       '<div id="NeufForecastSmallView" onClick="javascript:content.render(\'forecast\');"></div>'
       +       '<div id="LuxForecastSmallView" onClick="javascript:content.render(\'forecast\');"></div>'
       +       '<div id="BxlForecastSmallView" onClick="javascript:content.render(\'forecast\');"></div>'
	   +       '<div id="TvMagicHome"></div>'
	   +       '<div id="SwitchLampSalon"></div>'
       +    '</div>'
       + '</div>';

    this.DOM().html(html);
}