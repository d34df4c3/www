function CalendarTileView(domElement)
{
    View.call(this, domElement);
    
    this.model = false;
    this.render();
}

/* View */
CalendarTileView.prototype = Object.create(View.prototype);
CalendarTileView.prototype.constructor = CalendarTileView;

/* ModelListener */
CalendarTileView.prototype.onInitilize = function(model)
{
    this.model = model;
    this.render();
}

CalendarTileView.prototype.render = function()
{
    if (!this.model)
        return this.renderLoadingScript();

    if (!this.model.isSynchronized)
        return this.renderUnsynchronized(this.model);

    this.renderSynchronized(this.model);
}

CalendarTileView.prototype.renderLoadingScript = function()
{
    var html =
        '<div class="tile-large tile-big-y bg-crimson fg-white">'
      +     '<p class="text-shadow margin10">'
      +         '<span class="mif-spinner4 mif-ani-pulse" style="margin-right: 10px"></span>Loading script ... '
      +     '</p>'
      + '</div>';

    this.DOM().html(html);
}

CalendarTileView.prototype.renderUnsynchronized = function(model)
{
    var html =
        '<div class="tile-large tile-big-y bg-crimson fg-white">'
      +     '<p class="text-shadow margin10">'
      +         '<span class="mif-spinner4 mif-ani-pulse" style="margin-right: 10px"></span>Connection to server ... '
      +     '</p>'
      + '</div>';

    this.DOM().html(html);
}

CalendarTileView.prototype.renderSynchronized = function(model)
{
    var html = '<div class="tile-large tile-big-y bg-crimson fg-white" style="overflow-x: hidden; overflow-y: auto">';
    
    if (model.events.length == 0)
    {
        html += '<p class="text-shadow margin10">There are no events.</p>'
             + '</div>';

        this.DOM().html(html);
        return;
    }

    html += '<div class="schedule-list">';

    var currentDate = false;
    for (var i = 0; i < model.events.length; ++i)
    {
        if (currentDate != model.events[i].date)
        {
            var dateTime = Date.createFromTimestamp(model.events[i].date);
            html += '<strong class="date text-secondary text-shadow">'
                 + dateTime.getDayName() + ' '
                 + dateTime.getDate() + ' '
                 + dateTime.getMonthName()
                 + '</strong>';
            currentDate = model.events[i].date;
        }
        
        var userColor;
        switch (model.events[i].user_id)
        {
            case 1: userColor = 'bg-darkBlue'; break;
            case 2: userColor = 'bg-magenta'; break;
            default: userColor = 'grayLight';
        }
        
        var tag;
        switch (model.events[i].type)
        {
            case 'Run': tag = '<span class="tag fg-white bg-magenta">Run</span>'; break;
            case 'Bike': tag = '<span class="tag fg-white bg-green">Bike</span>'; break;
            case 'Swim': tag = '<span class="tag fg-white bg-blue">Swim</span>'; break;
            case 'Hike': tag = '<span class="tag fg-white bg-brown">Hike</span>'; break;
            case 'Musculation': tag = '<span class="tag fg-white bg-amber">Muscu</span>'; break;
            default: tag = '';
        }
        
        var specialClass = '';
        if (model.events[i].isDone)
            specialClass = 'done';
        else if (model.events[i].isObjectif)
            specialClass = 'important mif-ani-ring mif-ani-slow';
        
        html += '<a href="/Sport/Calendar.html?u=' + model.events[i].user_id + '" class="schedule-item">'
             + '<div class="time text-secondary ' + userColor + '">' + model.events[i].time + '</div>'
             + '<div class="description  fg-white ' + specialClass + '">'
             +    '<div class="description-header">' + model.events[i].title + ' ' + tag + ' </div>'
             +    '<div class="description-content text-secondary fg-grayLighter">'
             +        '<p>' + model.events[i].description + '</p>'
             +    '</div>'
             + '</div>'
             + '</a>';
    }
    
    html += '</div>'
      + '</div>';

    this.DOM().html(html);
}