import fuzzy from 'fuzzy';

export function getSuggestions(data, fields) {
  return fuzzy.filter(data.replace(/ /g, '')
              .split(/AND|WHERE|SORT|SORT BY/i).pop()
              , fields);
}

export function selectDropdown(currentState, newData) {
  const filtered = currentState.split(' ');
  filtered.splice(filtered.length - 1, 1, newData);
  return filtered.join(' ');
}
