export type CmsMap = Record<string, unknown>;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

export function mergeCmsWithDefaults<T extends CmsMap>(
  defaults: T,
  incoming: unknown,
): T {
  if (!isPlainObject(incoming)) {
    return defaults;
  }

  const merged: Record<string, unknown> = { ...defaults };

  for (const [section, value] of Object.entries(incoming)) {
    const defaultSection = Object.prototype.hasOwnProperty.call(merged, section)
      ? merged[section]
      : undefined;

    if (isPlainObject(defaultSection) && isPlainObject(value)) {
      merged[section] = mergeCmsWithDefaults(defaultSection as CmsMap, value);
      continue;
    }

    if (value === "" || value === null || value === undefined) {
      continue;
    }

    merged[section] = value;
  }

  return merged as T;
}
