function HubicTileView(domElement)
{
    View.call(this, domElement);
    
    this.model = false;
    this.render();
}

/* View */
HubicTileView.prototype = Object.create(View.prototype);
HubicTileView.prototype.constructor = HubicTileView;

/* ModelListener */
HubicTileView.prototype.onInitilize = function(model)
{
    this.model = model;
    this.render();
}

HubicTileView.prototype.render = function()
{
    if (!this.model)
        return this.renderLoadingScript();

    if (!this.model.isSynchronized)
        return this.renderUnsynchronized(this.model);

    this.renderSynchronized(this.model);
}

HubicTileView.prototype.renderLoadingScript = function()
{
    var html =
        '<a class="tile tile-wide-x bg-grayLight fg-white" data-role="tile">'
        +   '<div class="tile-content">'
        +       '<div class="padding10">'
        +           '<h1 class="mif-cloud place-left margin10"></h1>'
        +           '<p class="text-shadow place-left margin10 no-margin-top no-padding">HubiC</p>'
        +           '<p class="text-shadow text-secondary place-left margin10" style="width: 210px; margin-top: 5px"><span class="mif-spinner4 mif-ani-pulse" style="margin-right: 10px"></span>Loading script ... </p>'
        +       '</div>'
        +   '</div>'
        +'</a>';

    this.DOM().html(html);
}

HubicTileView.prototype.renderUnsynchronized = function(model)
{
    var html =
        '<a class="tile tile-wide-x bg-grayLight fg-white" data-role="tile">'
    +   '<div class="tile-content">'
    +       '<div class="padding10">'
    +           '<h1 class="mif-cloud place-left margin10"></h1>'
    +           '<p class="text-shadow place-left margin10 no-margin-top no-padding">HubiC</p>'
    +           '<p class="text-shadow text-secondary place-left margin10" style="width: 210px; margin-top: 5px"><span class="mif-spinner4 mif-ani-pulse" style="margin-right: 10px"></span>Connection to server ... </p>'
    +       '</div>'
    +   '</div>'
    +'</a>';

    this.DOM().html(html);
}

HubicTileView.prototype.renderSynchronized = function(model)
{
    var html =
         '<a class="tile tile-wide-x bg-cyan fg-white" data-role="tile">'
        +   '<div class="tile-content">'
        +       '<div class="padding10">'
        +           '<h1 class="mif-cloud place-left margin10"></h1>'
        +           '<p class="text-shadow place-left margin10 no-margin-top no-padding">HubiC</p>'
        +           '<div class="place-left margin10 no-margin-bottom no-margin-top no-padding" style="width: 210px" data-value="' + (model.usedSpace / model.totalSpace * 100) + '" data-color="bg-darkCobalt" data-role="progress"></div>'
        +           '<p class="text-shadow text-secondary place-left margin10" style="width: 210px; margin-top: 5px">'
        +               '<strong class="text-shadow">' + model.freeSpace + '</strong> GB free of <strong class="text-shadow">' + model.totalSpace + '</strong> GB'
        +           '</p>'
        +       '</div>'
        +       '<div id="Hubic-Julien-backups" class="clear-float">'
        +           '<table class="margin10 text-secondary" style="width: 290px; margin-top: 65px">';
    for (var i = 0; i < model.backups.length; ++i)
    {
        var statusIcon = model.backups[i]['isAttached'] ?
            '<strong class="mif-checkmark fg-lightGreen" style="margin-right: 5px"></strong>'
            : '<strong class="mif-cross mif-ani-flash mif-ani-slow fg-crimson" style="margin-right: 7px"></strong>';
        var errorClass = model.backups[i]['isAttached'] ? '' : 'class="fg-crimson" style="font-weight: bold"';
        var lastBackup = new Date(model.backups[i]['lastBackup'] * 1000);
        var dateStr = lastBackup.getDDMMYYYYHHMI();
        if (!model.backups[i]['lastBackup'])
            dateStr = '-';
    
        html += '<tr>'
             + '<td ' + errorClass + '>' + statusIcon + model.backups[i]['name'] + '</td>'
             + '<td class="text-small">' + dateStr + '</td>'
             + '<td class="align-right"><strong class="text-shadow">' + (model.backups[i]['size'] /1).toFixed(1) + '</strong> GB</td>'
             + '</tr>';
    }
    html += '</table>'
        +       '</div>'
        +   '</div>'
        +'</a>';

    this.DOM().html(html);
}