function View(domElement)
{
    ModelListener.call(this);

    this.domElement = domElement;
    this.wasSyncAtLeastOnce = false;
}

/* ModelListener */
View.prototype = Object.create(ModelListener.prototype);
View.prototype.constructor = View;

/* View */
View.prototype.render = function() {}

View.prototype.clear = function()
{
    this.domElement.html();
}

View.prototype.DOM = function()
{
    return $(this.domElement);
}

View.prototype.onInitilize = function(model)
{
    this.render();
}

View.prototype.onSynchronize = function(model)
{
    this.wasSyncAtLeastOnce = true;
    this.render();
}

View.prototype.onDesynchronize = function(model)
{
    this.render();
}

View.prototype.onChange = function(model, changedAttributes)
{
    this.render();
}