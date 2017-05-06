Date.dayName =
[
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi'
];

Date.dayShortName =
[
    'Dim.',
    'Lun.',
    'Mar.',
    'Mer.',
    'Jeu.',
    'Ven.',
    'Sam.'
];

Date.monthName =
[
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Aout',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
];

Date.monthShortName =
[
    'Jan.',
    'Fév.',
    'Mars',
    'Avr.',
    'Mai',
    'Juin',
    'Juil.',
    'Aout',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.'
];

Date.createFromTimestamp = function(timestamp)
{
    if (!timestamp)
        return false;
    return new Date(timestamp * 1000);
}

Date.createFromYYYYMMDD = function(text, sep)
{
    if (!text)
        return null;
    var res = text.split(sep);
    return new Date(res[0], res[1] - 1, res[2]);
}

Date.timestampFromYYYYMMDD = function(text, sep)
{
    var d = Date.createFromYYYYMMDD(text, sep);
    if (!d)
        return d;
    return d.getTimestamp();
}

Date.prototype.getTimestamp = function()
{
    return this.getTime() / 1000;
}

Date.prototype.getDayName = function()
{
    return Date.dayName[this.getDay()];
}

Date.prototype.getMonthName = function()
{
    return Date.monthName[this.getMonth()];
}

Date.prototype.getDayShortName = function()
{
    return Date.dayShortName[this.getDay()];
}

Date.prototype.getMonthShortName = function()
{
    return Date.monthShortName[this.getMonth()];
}

Date.prototype.getDDMMYYYYHHMI = function()
{
    return (this.getDate() < 10 ? '0' : '') + this.getDate() + '-'
        + (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1) + '-'
        + this.getFullYear() + ' '
        + (this.getHours() < 10 ? '0' : '') + this.getHours() + ':'
        + (this.getMinutes() < 10 ? '0' : '') + this.getMinutes();
}

Date.prototype.getHHhMI = function()
{
    return this.getHours() + 'h'
        + (this.getMinutes() < 10 ? '0' : '') + this.getMinutes();
}

Date.prototype.YYYYMMDD = function(sep)
{
    return this.getFullYear() + sep
        + (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1) + sep
        + (this.getDate() < 9 ? '0' : '') + this.getDate();
}

Date.prototype.DDMMYYYY = function(sep)
{
    return this.getDate() + sep
        + (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1) + sep
        + this.getFullYear();
}

Date.today = function()
{
    var res = new Date();
    res.setHours(0, 0, 0, 0, 0);
    return res;
}

Date.areDateEquals = function(a, b)
{
    
    var aa = new Date(a);
    aa.setHours(0, 0, 0, 0, 0);
    var bb = new Date(b);
    bb.setHours(0, 0, 0, 0, 0);
    return bb.getTime() == aa.getTime();
}