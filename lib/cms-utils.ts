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
    const defaultSection = merged[section];

    if (isPlainObject(defaultSection) && isPlainObject(value)) {
      merged[section] = { ...defaultSection, ...value };
      continue;
    }

    merged[section] = value;
  }

  return merged as T;
}
