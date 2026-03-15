import { CMSField, CMSSection } from "@/app/(admin)/admin-overview/cms-planning/cmsData";

const PAGE_KEY_MAP: Record<string, string> = {
  leaderboard_scholars: "leaderboard-scholars",
  leaderboard_universities: "leaderboard-universities",
  leaderboard_doctors: "leaderboard-doctors",
};

export function resolvePlanningPageKey(rawPageKey: string): string {
  return PAGE_KEY_MAP[rawPageKey] || rawPageKey;
}

export function resolvePlanningSectionKey(rawPageKey: string, rawSectionKey: string): string {
  const pageKey = resolvePlanningPageKey(rawPageKey);

  const prefixed = `${rawPageKey}_`;
  if (rawSectionKey.startsWith(prefixed)) {
    return rawSectionKey.slice(prefixed.length);
  }

  // Handle lb_ scholars / universities / doctors
  const lbMatch = rawSectionKey.match(/^lb_(scholars|universities|doctors)_(.+)$/);
  if (lbMatch) {
    return lbMatch[2]; // returns 'hero', 'faq', 'table', 'final_cta', etc.
  }

  const sectionMap: Record<string, string> = {
    about_cta_banner: "final_cta",
    contact_hero: "hero",
    contact_form: "form",
    contact_final_cta: "final_cta",
    legal_hero: "hero",
  };

  const mapped = sectionMap[rawSectionKey];
  if (mapped) return mapped;

  const canonicalPrefix = `${pageKey}_`;
  if (rawSectionKey.startsWith(canonicalPrefix)) {
    return rawSectionKey.slice(canonicalPrefix.length);
  }

  return rawSectionKey;
}

function defaultForField(field: CMSField): unknown {
  if (field.type === "repeatable") {
    const nested = Object.fromEntries(
      (field.subFields || []).map((subField) => [
        subField.key,
        defaultForField(subField),
      ]),
    );
    const count = Math.max(1, field.repeatableCount || 1);
    return Array.from({ length: count }, () => ({ ...nested }));
  }

  return field.placeholder || "";
}

export function defaultsForSection(section: CMSSection): Record<string, unknown> {
  return Object.fromEntries(
    section.fields.map((field) => [field.key, defaultForField(field)]),
  );
}
