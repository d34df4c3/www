function DriveModel(router, diskName)
{
    Model.call(this, router, 'DFS-' + diskName, 600 * 1000);

    this.diskName = diskName;
    this.isMounted = false;
    this.totalSpace = 0;
    this.usedSpace = 0;
    this.freeSpace = 0;
}

/* Model */
DriveModel.prototype = Object.create(Model.prototype);
DriveModel.prototype.constructor = DriveModel;