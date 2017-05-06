function PostItSmallTileView(domElement)
{
    View.call(this, domElement);

    this.model = false;
    this.wasSyncAtLeastOnce = false;

    this.render();
}

/* View */
PostItSmallTileView.prototype = Object.create(View.prototype);
PostItSmallTileView.prototype.constructor = PostItSmallTileView;

/* ModelListener */
PostItSmallTileView.prototype.onInitilize = function(model)
{
    this.model = model;
    this.render();
    $(this.domElement + " strong[data-role='HIGH']").html('<span class="mif-spinner4 mif-ani-pulse"></span>');
    $(this.domElement + " strong[data-role='NORMAL']").html('<span class="mif-spinner4 mif-ani-pulse"></span>');
    $(this.domElement + " strong[data-role='HIGH']").show();
    $(this.domElement + " strong[data-role='NORMAL']").show();
}

PostItSmallTileView.prototype.onSynchronize = function(model)
{
    this.renderOnChange(model);
}

PostItSmallTileView.prototype.onDesynchronize = function(model)
{
    $(this.domElement + " strong[data-role='HIGH']").html('<span class="mif-spinner4 mif-ani-pulse"></span>');
    $(this.domElement + " strong[data-role='NORMAL']").html('<span class="mif-spinner4 mif-ani-pulse"></span>');
    $(this.domElement + " strong[data-role='HIGH']").show();
    $(this.domElement + " strong[data-role='NORMAL']").show();
}

PostItSmallTileView.prototype.onChange = function(model, changedAttributes)
{
    this.renderOnChange(model);
}

PostItSmallTileView.prototype.render = function()
{
    var html =
        '<a href="#" class="tile-small bg-yellow fg-white" data-role="tile">'
      + '   <div class="tile-content iconic">'
      + '       <span class="icon mif-pin"></span>'
      + '   </div>'
      + '   <strong data-role="HIGH" class="tile-badge bg-magenta text-small" style="display: none; right: 37px;"></strong>'
      + '   <strong data-role="NORMAL" class="tile-badge bg-blue text-small" style="display: none; right: 6px;"></strong>'
      + '</a>';

    this.DOM().html(html);
    
    if (!this.model || !this.model.isSynchronized)
        return;

    this.renderOnChange(this.model);
}

PostItSmallTileView.prototype.renderOnChange = function(model)
{
    var numHigh = 0;
    var numNormal = 0;
    for (var i = 0; i < model.postits.length; ++i)
    {
        var postit = model.postits[i];
        if (postit.isCompleted || postit.priority == 'LOW')
            continue;

        if (postit.priority == 'HIGH')
            ++numHigh;
        else if (postit.dueDate && Date.createFromTimestamp(postit.dueDate) - 24 * 3600000 <= Date.today())
            ++numHigh;
        else
            ++numNormal;
    }

    if (numHigh)
    {
        $(this.domElement + " strong[data-role='HIGH']").text(numHigh);
        $(this.domElement + " strong[data-role='HIGH']").show();
    }
    else
    {
        $(this.domElement + " strong[data-role='HIGH']").hide();
    }
    
    if (numNormal)
    {
        $(this.domElement + " strong[data-role='NORMAL']").text(numNormal);
        $(this.domElement + " strong[data-role='NORMAL']").show();
    }
    else
    {
        $(this.domElement + " strong[data-role='NORMAL']").hide();
    }
}