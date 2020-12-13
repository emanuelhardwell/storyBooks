/*  */
/*  */
const timeago = require("timeago.js");

const timeModify = {};

timeModify.timeago = (timestamp) => {
  return timeago.format(timestamp);
};

timeModify.truncate = (str, len) => {
  if (str.length > len && str.length > 0) {
    let new_str = str + " ";
    new_str = str.substr(0, len);
    new_str = str.substr(0, new_str.lastIndexOf(" "));
    new_str = new_str.length > 0 ? new_str : str.substr(0, len);
    return new_str + "...";
  }
  return str;
};

timeModify.stripTags = (input) => {
  return input.replace(/<(?:.|\n)*?>/gm, "");
};

timeModify.select = (selected, options) => {
  return options
    .fn(this)
    .replace(new RegExp(' value="' + selected + '"'), '$& selected="selected"')
    .replace(
      new RegExp(">" + selected + "</option>"),
      ' selected="selected"$&'
    );
};

module.exports = timeModify;
