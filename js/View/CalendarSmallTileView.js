function CalendarSmallTileView(domElement, userId, userName, color)
{
    View.call(this, domElement);
    
    this.userId = userId;
    this.userName = userName;
    this.color = color;
    
    this.model = false;
    this.wasSyncAtLeastOnce = false;
    
    this.render();
}

/* View */
CalendarSmallTileView.prototype = Object.create(View.prototype);
CalendarSmallTileView.prototype.constructor = CalendarSmallTileView;

/* ModelListener */
CalendarSmallTileView.prototype.onInitilize = function(model)
{
    this.model = model;
    this.render();
    $("#CSTV-" + this.userId).html('<span class="mif-spinner4 mif-ani-pulse"></span>');
    $("#CSTV-" + this.userId).show();
}

CalendarSmallTileView.prototype.onSynchronize = function(model)
{
    this.renderOnChange(model);
}

CalendarSmallTileView.prototype.onDesynchronize = function(model)
{
    $("#CSTV-" + this.userId).html('<span class="mif-spinner4 mif-ani-pulse"></span>');
    $("#CSTV-" + this.userId).removeClass('bg-red').addClass('bg-grayLight');
    $("#CSTV-" + this.userId).show();
}

CalendarSmallTileView.prototype.onChange = function(model, changedAttributes)
{
    this.renderOnChange(model);
}

CalendarSmallTileView.prototype.render = function()
{
    var html =
        '<a href="/Sport/Calendar.html?u=' + this.userId + '" class="tile-small ' + this.color + ' fg-white" data-role="tile">'
      + '   <div class="tile-content iconic">'
      + '       <span class="icon mif-calendar"></span>'
      + '   </div>'
 //     + '   <span class="tile-label text-small">' + this.userName + '</span>'
      + '   <strong id="CSTV-' + this.userId + '" class="tile-badge bg-grayLight text-small" style="display: none"></strong>'
      + '</a>';

    this.DOM().html(html);

    if (!this.model || !this.model.isSynchronized)
        return;

    this.renderOnChange(this.model);
}

CalendarSmallTileView.prototype.renderOnChange = function(model)
{
    var now = new Date();

    var numEvents = 0;
    for (var i = 0; i < model.events.length; ++i)
    {
        if (model.events[i].isDone || model.events[i].user_id != this.userId)
            continue;
        if (!Date.areDateEquals(now, Date.createFromTimestamp(model.events[i].date)))
            break;
        ++numEvents;
    }

    if (numEvents)
    {
        $("#CSTV-" + this.userId).text(numEvents);
        $("#CSTV-" + this.userId).addClass('bg-red').removeClass('bg-grayLight');
        $("#CSTV-" + this.userId).show();
    }
    else
    {
        $("#CSTV-" + this.userId).hide();
    }
}