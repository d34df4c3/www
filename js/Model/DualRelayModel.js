function DualRelayModel(switchName)
{
    this.switchName = switchName;
	this.lastState = {};
}

/* Model */
DualRelayModel.prototype = Object.create(Model.prototype);
DualRelayModel.prototype.constructor = DualRelayModel;

DualRelayModel.prototype.getState = function()
{
	return this.get();
}

DualRelayModel.prototype.switchOn = function()
{
	return DualRelayModel.get(1, 'ON')
}

DualRelayModel.prototype.switchOff = function()
{
	return DualRelayModel.get(1, 'OFF')
}

DualRelayModel.prototype.toggle = function()
{
	return this.get(1, (this.lastState && this.lastState[0].state == 'ON') ? 'OFF' : 'ON')
}

DualRelayModel.prototype.get = function(switchId, state)
{
	var url = 'http://192.168.1.11/';
	if (switchId && state)
		url = url + '?relay='+ switchId +'&action='+ state;

	var result = false;
	var thisObject = this;
	$.ajax(
    {
        dataType: 'json',
        url: 'php/Proxy.php',
        data: {url: encodeURIComponent(url)},
        method : 'GET',
		async: false,
        success: function(data, textStatus, jqXHR) {result = data; thisObject.lastState = data;},
        error: function(jqXHR, textStatus, errorThrown) {console.log('DualRelayModel.get (error)', jqXHR);},
        complete: function(jqXHR, textStatus, errorThrown) {}
    });
	return result;
}