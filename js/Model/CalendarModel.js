function CalendarModel(router)
{
    Model.call(this, router, 'Calendar', 600 * 1000);

    this.events = [];
}

/* Model */
CalendarModel.prototype = Object.create(Model.prototype);
CalendarModel.prototype.constructor = CalendarModel;