const configIconsExists = (config, iconName) => {
  if (!config.hasOwnProperty('icons')) return;

  return config.icons.hasOwnProperty(iconName);
};

function getIconByMessageType(type, config) {
  const changedIcon = configIconsExists(config, 'changed')
    ? config.icons.changed
    : ':exclamation:';
  const addedIcon = configIconsExists(config, 'added')
    ? config.icons.added
    : ':white_check_mark:';
  const removedIcon = configIconsExists(config, 'removed')
    ? config.icons.removed
    : ':fire:';

  const iconByMessageType = {
    FIELD_CHANGED_KIND: changedIcon,
    FIELD_REMOVED: addedIcon,
    TYPE_CHANGED_KIND: changedIcon,
    TYPE_REMOVED: addedIcon,
    TYPE_REMOVED_FROM_UNION: addedIcon,
    VALUE_REMOVED_FROM_ENUM: addedIcon,
    ARG_REMOVED: addedIcon,
    ARG_CHANGED_KIND: changedIcon,
    REQUIRED_ARG_ADDED: removedIcon,
    REQUIRED_INPUT_FIELD_ADDED: removedIcon,
    INTERFACE_REMOVED_FROM_OBJECT: addedIcon,
    DIRECTIVE_REMOVED: addedIcon,
    DIRECTIVE_ARG_REMOVED: addedIcon,
    DIRECTIVE_LOCATION_REMOVED: addedIcon,
    REQUIRED_DIRECTIVE_ARG_ADDED: removedIcon,
    ARG_DEFAULT_VALUE_CHANGE: changedIcon,
    VALUE_ADDED_TO_ENUM: removedIcon,
    INTERFACE_ADDED_TO_OBJECT: removedIcon,
    TYPE_ADDED_TO_UNION: removedIcon,
    OPTIONAL_INPUT_FIELD_ADDED: removedIcon,
    OPTIONAL_ARG_ADDED: removedIcon
  };

  return iconByMessageType[type] || ':dog:';
}

function mountMessage(allChanges, config) {
  const block = '---------------------------------\n';

  let message = `${block}\n:sound: NEW SCHEMA UPDATES\n\n\n`;

  message = allChanges.reduce((prevChange, nextChange) => {
    const Icon = getIconByMessageType(nextChange.type, config);
    return prevChange + `${Icon}  ${nextChange.description}\n`;
  }, message);

  return `${message}\n${block}`;
}

module.exports = {
  mountMessage: mountMessage
};
