function HubicModel(router)
{
    Model.call(this, router, 'Hubic', 600 * 1000);

    this.state = 'NotConnected';
    this.account = '';
    this.syncDirectory = '';
    this.totalSpace = 0;
    this.usedSpace = 0;
    this.freeSpace = 0;
    this.backups = [];
}

/* Model */
HubicModel.prototype = Object.create(Model.prototype);
HubicModel.prototype.constructor = DriveModel;