function RadioRouter()
{
    Router.call(this);
}

/* Router */
RadioRouter.prototype = Object.create(Router.prototype);
RadioRouter.prototype.constructor = RadioRouter;

RadioRouter.prototype.execute = function()
{
    this.requests.forEach(function(_)
    {
        $.ajax(
        {
            dataType: 'json',
            url: 'Radio/control.php',
            data: _.data,
            method : 'POST',
            context: this,
            success: function(results, textStatus, jqXHR) {this.successCallback([_.callback], [results], [_.data], textStatus, jqXHR);},
            error: function(jqXHR, textStatus, errorThrown) {this.errorCallback([_.callback], [_.data], jqXHR, textStatus, errorThrown);},
            complete: function(jqXHR, textStatus) {this.completeCallback([_.callback], jqXHR, textStatus);}
        })
        
    }, this);
}
