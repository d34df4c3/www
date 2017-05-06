function PostItModel(router)
{
    Model.call(this, router, 'PostIt', 600 * 1000);

    this.postits = false;
}

/* Model */
PostItModel.prototype = Object.create(Model.prototype);
PostItModel.prototype.constructor = PostItModel;

Model.prototype.getRefreshData = function()
{
    return {action: 'GET'};
}

Model.prototype.complete = function(id, isCompleted)
{
    this.sendRequest({action: 'COMPLETE', id: id, value: isCompleted});
}

Model.prototype.update = function(id, data)
{
    data['id'] = id;
    data['action'] = 'UPDATE';
    this.sendRequest(data);
}

Model.prototype.create = function(data)
{
    data['action'] = 'INSERT';
    this.sendRequest(data);
}