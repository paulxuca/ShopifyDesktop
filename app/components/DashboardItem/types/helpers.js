export function jsonStringToObject(convString) {
  return JSON.parse(unescape(convString));
}

export function checkDateToday(momentArg) {
  return momentArg.diff(Date.now(), 'days') === 0;
}
