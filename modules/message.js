function getIconByMessageType(type) {
  const iconByMessageType = {
    FIELD_CHANGED_KIND: ':exclamation:',
    FIELD_REMOVED: ':fire:',
    TYPE_CHANGED_KIND: ':exclamation:',
    TYPE_REMOVED: ':fire:',
    TYPE_REMOVED_FROM_UNION: ':fire:',
    VALUE_REMOVED_FROM_ENUM: ':fire:',
    ARG_REMOVED: ':fire:',
    ARG_CHANGED_KIND: ':exclamation:',
    REQUIRED_ARG_ADDED: ':white_check_mark:',
    REQUIRED_INPUT_FIELD_ADDED: ':white_check_mark:',
    INTERFACE_REMOVED_FROM_OBJECT: ':fire:',
    DIRECTIVE_REMOVED: ':fire:',
    DIRECTIVE_ARG_REMOVED: ':fire:',
    DIRECTIVE_LOCATION_REMOVED: ':fire:',
    REQUIRED_DIRECTIVE_ARG_ADDED: ':white_check_mark:',
    ARG_DEFAULT_VALUE_CHANGE: ':exclamation:',
    VALUE_ADDED_TO_ENUM: ':white_check_mark:',
    INTERFACE_ADDED_TO_OBJECT: ':white_check_mark:',
    TYPE_ADDED_TO_UNION: ':white_check_mark:',
    OPTIONAL_INPUT_FIELD_ADDED: ':white_check_mark:',
    OPTIONAL_ARG_ADDED: ':white_check_mark:'
  };

  return iconByMessageType[type] || ':dog:';
}

function mountMessage(allChanges) {
  const block = '---------------------------------\n';

  let message = `${block}\n:sound: NEW SCHEMA UPDATES\n\n\n`;

  message = allChanges.reduce((prevChange, nextChange) => {
    const Icon = getIconByMessageType(nextChange.type);
    return prevChange + `${Icon}  ${nextChange.description}\n`;
  }, message);

  return `${message}\n${block}`;
}

module.exports = {
  mountMessage: mountMessage
};
