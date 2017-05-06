function ComputerContentView(domElement)
{
    View.call(this, domElement);
}

/* View */
ComputerContentView.prototype = Object.create(View.prototype);
ComputerContentView.prototype.constructor = ComputerContentView;

ComputerContentView.prototype.render = function()
{
    var html =
         '<div class="tile-group double">'
       +    '<span class="tile-group-title">Storage</span>'
       +    '<div id="NathDriveView"></div>'
       +    '<div id="ChronoDriveView"></div>'
       +    '<div id="HubicView"></div>'
       + '</div>';

    this.DOM().html(html);
}