function PostItTileView(domElement)
{
    View.call(this, domElement);
    
    this.model = false;
    this.blockRender = false;
    this.render();
}

/* View */
PostItTileView.prototype = Object.create(View.prototype);
PostItTileView.prototype.constructor = PostItTileView;

/* ModelListener */
PostItTileView.prototype.onInitilize = function(model)
{
    this.model = model;
    this.render();
}

PostItTileView.prototype.render = function()
{
    if (this.blockRender)
        return;

    if (!this.model)
        return this.renderLoadingScript();

    if (!this.model.isSynchronized)
        return this.renderUnsynchronized(this.model);

    this.renderSynchronized(this.model);
}

PostItTileView.prototype.renderLoadingScript = function()
{
    var html =
        '<div class="tile-large tile-big-y bg-yellow fg-white">'
      +     '<p class="text-shadow margin10">'
      +         '<span class="mif-spinner4 mif-ani-pulse" style="margin-right: 10px"></span>Loading script ... '
      +     '</p>'
      + '</div>';

    this.DOM().html(html);
}

PostItTileView.prototype.renderUnsynchronized = function(model)
{
    var html =
        '<div class="tile-large tile-big-y bg-yellow fg-white">'
      +     '<p class="text-shadow margin10">'
      +         '<span class="mif-spinner4 mif-ani-pulse" style="margin-right: 10px"></span>Connection to server ... '
      +     '</p>'
      + '</div>';

    this.DOM().html(html);
}

PostItTileView.prototype.renderSynchronized = function(model)
{
    var html = '<div class="tile-large tile-big-y bg-yellow fg-white" style="overflow-x: hidden; overflow-y: auto">'
        + '<ul class="postit">';
    if (model.postits.length == 0)
    {
        html += '<li><p class="text-shadow margin10">There are no post-it.</p></li>';
    }

    for (var i = 0; i < model.postits.length; ++i)
    {
        var done = model.postits[i].isCompleted ? ' done' : '';
        var high = model.postits[i].priority == 'HIGH' ? ' important' : '';
        
        var checked = '';
        var msgClass = '';
        if (model.postits[i].isCompleted)
        {
            checked = '<span class="mif-checkmark"></span>';
            msgClass = 'done';
        }
        else if (model.postits[i].priority == 'HIGH')
        {
            checked = '<span class="fg-crimson mif-warning mif-ani-ring"></span>';
            msgClass = 'high';
        }

        var dayleftLabel = '';
        if (!model.postits[i].isCompleted && model.postits[i].dueDate)
        {
            var dueDate = Date.createFromTimestamp(model.postits[i].dueDate);
            var today = Date.today();
            var daysLeft = (dueDate - today) / (24 * 3600000);

            if (daysLeft == 0)
                dayleftLabel = '<span class="tag fg-white bg-magenta">Aujourd\'hui</span>';
            else if (daysLeft < 0)
                dayleftLabel = '<span class="tag fg-white bg-magenta mif-ani-ring">J+' + -daysLeft.toFixed(0) + '</span>';
            else
                dayleftLabel = '<span class="tag fg-white bg-blue">J-' + daysLeft.toFixed(0) + '</span>';
        }

        html += '<li data-value="' + i + '">'
          +     '<div class="checkbox">' + checked + '</div>'
          +     '<div class="message fg-grayDarker ' + msgClass + '">' + dayleftLabel + ' ' + model.postits[i].message + '</div>'
          + '</li>';
    }
    
    html += '<li>'
          +     '<button class="button add place-right"><span class="mif-plus" style="margin-right: 10px"></span>Ajouter un Post-It</button>'
          + '</li>';

    html += '</ul>'
      + '</div>';

    this.DOM().html(html);

    $(this.domElement + " .checkbox").click(this, function(e)
    {
        var postit = model.postits[$(this).parent().data('value')];
        model.complete(postit.id, postit.isCompleted != true);
    });
 
    $(this.domElement + " .message").click(this, function(e)
    {
        var postit = model.postits[$(this).parent().data('value')];
        e.data.renderEdition(postit);
    });

    $(this.domElement + " button").click(this, function(e)
    {
        e.data.renderEdition();
    });
}

PostItTileView.prototype.renderEdition = function(postit)
{
    this.blockRender = true;

    var html =
       '<div class="tile-large tile-big-y bg-yellow fg-white padding10" style="overflow-x: hidden; overflow-y: auto">'
      +     '<h4 name="title">Nouveau Post-It</h4>'
      +     '<label name="completion" class="input-control checkbox" style="display: none">'
      +         '<input name="isCompleted" type="checkbox">'
      +         '<span class="check"></span>'
      +         '<span class="caption"> Tâche réalisée<span name="completionDate"></span></span>'
      +     '</label>'
      +     '<h5>Priorité</h5>'
      +     '<div class="input-control select full-size">'
      +         '<select name="priority" style="padding-left: 35px">'
      +             '<option value="HIGH"><span class="mif-user prepend-icon"></span>Haute</option>'
      +             '<option value="NORMAL">Normale</option>'
      +             '<option value="LOW">Basse</option>'
      +         '</select>'
      +         '<span class="prepend-icon mif-warning mif-ani-ring"></span>'
      +     '</div>'
      +     '<h5>Message</h5>'
      +     '<div class="input-control text full-size">'
      +         '<span class="mif-pin prepend-icon"></span>'
      +         '<input name="message" type="text">'
      +     '</div>'
      +     '<h5>Echéance</h5>'
      +     '<div class="input-control text full-size" data-role="datepicker">'
      +         '<input name="dueDate" type="text">'
      +         '<div class="button-group">'
      +             '<button class="button" data-role="cal"><span class="mif-calendar"></span></button>'
      +             '<button class="button" data-role="clear"><span class="mif-cross"></span></button>'
      +         '</div>'
      +     '</div>'
      +     '<div style="margin-top: 15px">'
      +         '<button name="cancel" class="button"><span class="mif-cross" style="margin-right: 10px"></span>Annuler</button>'
      +         '<button name="submit" class="button place-right"><span class="mif-checkmark" style="margin-right: 10px"></span>Valider</button>'
      +     '</div>'
      + '</div>';

    this.DOM().html(html);
    
    if (postit)
    {
        this.DOM().find("h4[name='title']").text('Modification du Post-It');
        this.DOM().find("label[name='completion']").show();
        this.DOM().find("select[name='priority'] option[value='" + postit.priority + "']").attr("selected", "selected");
        if (postit.isCompleted)
        {
            this.DOM().find("input[name='isCompleted']").attr("checked", "checked");
            this.DOM().find("span[name='completionDate']").text(' le ' + Date.createFromTimestamp(postit.completionDate).DDMMYYYY('-'));
        }
        this.DOM().find("input[name='message']").val(postit.message);
        if (postit.dueDate)
            this.DOM().find("input[name='dueDate']").val(Date.createFromTimestamp(postit.dueDate).YYYYMMDD('.'));
    }
    else
    {
        this.DOM().find("select[name='priority'] option[value='NORMAL']").attr("selected", "selected");
    }
    
    this.DOM().find("button[name='cancel']").click(this, function(e) {e.data.blockRender = false; e.data.render();});
    this.DOM().find("button[name='submit']").click(this, function(e)
    {
        var error = false;
        if (e.data.DOM().find("input[name='message']").val() == '')
        {
            e.data.DOM().find("input[name='message']").addClass('error');
            error = true;
        }

        if (error)
            return;

        var data =
        {
            priority: e.data.DOM().find("select[name='priority']").val(),
            isCompleted: e.data.DOM().find("input[name='isCompleted']").is(':checked'),
            message: e.data.DOM().find("input[name='message']").val(),
            dueDate: Date.timestampFromYYYYMMDD(e.data.DOM().find("input[name='dueDate']").val(), '.')
        };

        if (postit)
            e.data.model.update(postit.id, data);
        else
            e.data.model.create(data);

        e.data.blockRender = false;
        e.data.render();
    });
}