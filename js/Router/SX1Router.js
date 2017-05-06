function SX1Router()
{
    Router.call(this);
}

/* Router */
SX1Router.prototype = Object.create(Router.prototype);
SX1Router.prototype.constructor = SX1Router;

SX1Router.prototype.execute = function()
{
    var ajaxData = this.requests.map(function(_) {return {model: _.name, args:_.data};});
    var callbacks = this.requests.map(function(_) {return _.callback;});

    $.ajax(
    {
        dataType: 'json',
        url: 'php/ajax.php',
        data: {'data': encodeURIComponent(JSON.stringify(ajaxData))},
        method : 'POST',
        context: this,
        success: function(results, textStatus, jqXHR) {this.successCallback(callbacks, results, ajaxData, textStatus, jqXHR);},
        error: function(jqXHR, textStatus, errorThrown) {this.errorCallback(callbacks, ajaxData, jqXHR, textStatus, errorThrown);},
        complete: function(jqXHR, textStatus) {this.completeCallback(callbacks, jqXHR, textStatus);}
    });
}
