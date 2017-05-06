function Model(router, name, timeout)
{
    this.router = router;
    this.name = name;
    this.refreshInterval = timeout;
    this.isInitialized = false;
    this.isSynchronized = false;
    this.listeners = [];
}

Model.prototype.addListener = function(newListener)
{
    this.listeners.push(newListener);
}

Model.prototype.initialize = function()
{
    this.isInitialized = true;

    this.listeners.forEach(function(_) {_.onInitilize(this);}, this);

    setTimeout(function(_) {_.sendRefreshRequest();}, 1, this);
}

Model.prototype.setSynchronization = function(isSync)
{
    // The model must be initialized first
    if (!this.isInitialized)
        isSync = false;
    
    if (this.isSynchronized == isSync)
        return;

    this.isSynchronized = isSync;

    if (isSync)
        this.listeners.forEach(function(_) {_.onSynchronize(this);}, this);
    else
        this.listeners.forEach(function(_) {_.onDesynchronize(this);}, this);
}

Model.prototype.sendRefreshRequest = function()
{
    var that = this;
    this.router.push(this.name, this.getRefreshData(), function(status, result, data) {that.refreshCallback(status, result, data);});
}

Model.prototype.sendRequest = function(data)
{
    var that = this;
    this.router.push(this.name, data, function(status, result, data) {that.refreshCallback(status, result, data);});
}

Model.prototype.getRefreshData = function()
{
    return {refresh: true};
}

Model.prototype.refreshCallback = function(status, result, data)
{
    if (status != "success")
    {
        this.setSynchronization(false);
    }
    else
    {
        this.setSynchronization(true);
        this.changed(this.refresh(result));
    }
    setTimeout(function(_) {_.sendRefreshRequest();}, this.refreshInterval, this);
}

Model.prototype.refresh = function(result)
{
    return this.load(result);
}

Model.prototype.changed = function(changedAttributes)
{
    if (!changedAttributes.length)
        return;
    this.listeners.forEach(function(_) {_.onChange(this, changedAttributes);}, this);
}

Model.prototype.load = function(newData)
{
    var ret = [];
    for (var attr in newData)
    {
        if (!newData.hasOwnProperty(attr) || !this.hasOwnProperty(attr))
            continue;

        if (!this.isEquals(newData[attr], this[attr]))
        {
            this[attr] = newData[attr];
            ret.push(attr);
        }
    }
    return ret;
}

Model.prototype.isEquals = function(a, b)
{
    if (typeof a !== typeof b)
        return false;

    if (typeof a === 'boolean' || typeof a === 'number' || typeof a === 'string')
        return a === b;

    if (Object.prototype.toString.call(a) === '[object Array]')
    {
        if (a.length != b.length)
            return false;

        for (var i = 0; i < a.length; ++i)
        {
            if (!this.isEquals(a[i], b[i]))
                return false;
        }
        return true;
    }

    if (typeof a === 'object')
    {
        var retValue = true;
        for (var attr in a)
        {
            if (!a.hasOwnProperty(attr) || !b.hasOwnProperty(attr))
                return false;

            if (!this.isEquals(a[attr], b[attr]))
                return false;
        }
        return true;
    }

    console.log("ERROR - Model::isEquals - Unknown type: " + typeof a);
    return false;
}