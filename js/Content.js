function Content()
{
    this.views = [];
    this.Contents = [];
}

Content.prototype.render = function(name)
{
    if (this.Contents[name] == undefined)
    {
        console.warn('Content::render - View does not exist: ' + name);
        return false;
    }

    this.Contents[name].render();
    this.views.forEach(function(_) {if ($(_.domElement).length > 0) _.render();});

    return true;
}

Content.prototype.addView = function(view)
{
    this.views.push(view);
    return view;
}

Content.prototype.addContentView = function(name, view)
{
    this.Contents[name] = view;
}