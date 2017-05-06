function Router()
{
    this.requests = [];

    setTimeout(function(_) {_.send();}, 1000, this);
}

Router.prototype.push = function(name, data, callback)
{
    this.requests.push({name: name, data: data, callback: callback});
}

Router.prototype.send = function()
{
    if (this.requests.length == 0)
    {
        setTimeout(function(_) {_.send();}, 1000, this);
        return;
    }

    this.execute();
    this.requests = [];
}
// TODO: call callback with setTimeout
Router.prototype.successCallback = function(callbacks, results, requests, textStatus, jqXHR)
{
    if (callbacks.length != results.length)
    {
        console.error('Num. callbacks (' + callbacks.length + ') != Num. results (' + results.length + '). result: ', results);
        this.errorCallback(callbacks, requests, jqXHR, "error", "Results != Callbacks");
        return;
    }

    callbacks.forEach(function(_, i) {_("success", results[i], requests[i].data);});
}

Router.prototype.errorCallback = function(callbacks, requests, jqXHR, textStatus, errorThrown)
{
    console.error(textStatus + ' - ' + errorThrown + '. jqXHR: ', jqXHR);
    callbacks.forEach(function(_, i) {_(textStatus, errorThrown, requests[i].data);});
}

Router.prototype.completeCallback = function(callbacks, jqXHR, textStatus)
{
    setTimeout(function(_) {_.send();}, 1000, this);
}