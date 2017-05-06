function CalendarContentView(domElement)
{
    View.call(this, domElement);
}

/* View */
CalendarContentView.prototype = Object.create(View.prototype);
CalendarContentView.prototype.constructor = CalendarContentView;

CalendarContentView.prototype.render = function()
{
    var html =
         '<div class="tile-group">'
       +    '<div id="CalendarSmallView-Julien"></div>'
       +    '<div id="CalendarSmallView-Nathalie"></div>'
       + '</div>'

       + '<div class="tile-group double">'
       +    '<span class="tile-group-title">Agenda</span>'
       +    '<div id="CalendarView"></div>'
       + '</div>'

       + '<div class="tile-group double">'
       +    '<span class="tile-group-title">Post-It</span>'
       +    '<div id="PostItView"></div>'
       + '</div>';

    this.DOM().html(html);
}