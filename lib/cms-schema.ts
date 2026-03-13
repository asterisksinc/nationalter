import { z } from "zod";

const LogoSchema = z.object({
  name: z.string(),
  image: z.string().optional(),
  url: z.string().optional(),
});

const HeroBgSchema = z.object({
  desktop_background_image: z.string().optional(),
  mobile_background_image: z.string().optional(),
});

const FinalCtaSchema = z.object({
  kicker: z.string(),
  heading: z.string(),
  body: z.string(),
  primary_cta_label: z.string(),
  banner_image: z.string(),
  banner_alt: z.string(),
});

const FaqSchema = z.object({
  kicker: z.string(),
  title: z.string(),
  body: z.string(),
});

const HomeHeroSchema = HeroBgSchema.extend({
  top_message: z.string(),
  heading_line_1: z.string(),
  heading_line_2: z.string(),
  subheading: z.string(),
  primary_cta_label: z.string(),
  secondary_cta_label: z.string(),
});

const LeaderboardHeroSchema = HeroBgSchema.extend({
  badge_text: z.string(),
  heading_prefix: z.string().optional(),
  heading_highlight: z.string().optional(),
  heading_line_2: z.string().optional(),
  heading: z.string().optional(),
  subheading: z.string(),
  cta_label: z.string().optional(),
});

const LeaderboardTableSchema = z.object({
  title: z.string(),
  search_placeholder: z.string(),
});

const ContactHeroSchema = HeroBgSchema.extend({
  kicker: z.string(),
  heading_line_1: z.string(),
  heading_line_2: z.string(),
  body: z.string(),
  trusted_by_text: z.string(),
});

const ContactFormSchema = z.object({
  title: z.string(),
  success_title: z.string(),
  success_body: z.string(),
  error_title: z.string(),
  error_body: z.string(),
  submit_label: z.string(),
  submitting_label: z.string(),
});

const PricingSectionSchema = z.object({
  badge_text: z.string().optional(),
  heading: z.string().optional(),
  billing_cycle_labels: z
    .object({
      monthly: z.string().optional(),
      alternate: z.string().optional(),
    })
    .optional(),
  includes_label: z.string().optional(),
  audience_note: z.string().optional(),
  footer_note: z.string().optional(),
  plans: z
    .array(
      z.object({
        title: z.string(),
        price: z.string(),
        description: z.string(),
        btnText: z.string(),
        btnStyle: z.string(),
        highlight: z.boolean(),
        features: z.array(z.string()),
      }),
    )
    .optional(),
});

const TransparencySchema = z.object({
  heading: z.string(),
  subheading: z.string(),
  cta_label: z.string(),
  cta_url: z.string(),
  items: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        tagline: z.string(),
        category: z.string(),
        description: z.string(),
        image: z.string(),
        slug: z.string(),
      }),
    )
    .optional(),
});

const ResearchIntelligenceSchema = z.object({
  kicker: z.string(),
  heading: z.string(),
  subheading: z.string(),
  cta_label: z.string(),
  items: z
    .array(
      z.object({
        title: z.string(),
        desc: z.string(),
      }),
    )
    .optional(),
});

const HIndexSchema = z.object({
  heading: z.string(),
  subheading: z.string(),
  cards: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
      }),
    )
    .optional(),
});

const CmsSchemas: Record<string, z.ZodTypeAny> = {
  "home.hero": HomeHeroSchema,
  "home.trusted_by": z.object({ heading: z.string(), logos: z.array(LogoSchema).optional() }),
  "home.h_index": HIndexSchema,
  "home.transparency": TransparencySchema,
  "home.pricing": PricingSectionSchema,
  "home.research_intelligence": ResearchIntelligenceSchema,
  "home.final_cta": FinalCtaSchema,

  "about.hero": HeroBgSchema.extend({
    badge_text: z.string(),
    heading: z.string(),
    subheading: z.string(),
    cta_label: z.string(),
  }),
  "about.trusted_by": z.object({ heading: z.string(), logos: z.array(LogoSchema).optional() }),
  "about.faq": FaqSchema,
  "about.final_cta": z.object({
    kicker: z.string(),
    heading: z.string(),
    body: z.string(),
    secondary_cta_label: z.string(),
    primary_cta_label: z.string(),
  }),

  "pricing.hero": HeroBgSchema,
  "pricing.pricing": PricingSectionSchema,
  "pricing.tables": z.object({
    overview_title: z.string(),
    addons_title: z.string(),
  }),
  "pricing.faq": FaqSchema,
  "pricing.final_cta": FinalCtaSchema,

  "methodology.hero": HeroBgSchema.extend({
    badge_text: z.string(),
    heading: z.string(),
    subheading: z.string(),
    cta_label: z.string(),
  }),
  "methodology.trusted_by": z.object({ heading: z.string(), logos: z.array(LogoSchema).optional() }),
  "methodology.faq": FaqSchema,
  "methodology.final_cta": FinalCtaSchema,

  "leaderboard.hero": LeaderboardHeroSchema,
  "leaderboard.widget": z.object({ title: z.string() }),
  "leaderboard.faq": FaqSchema,

  "leaderboard-scholars.hero": LeaderboardHeroSchema,
  "leaderboard-scholars.table": LeaderboardTableSchema,
  "leaderboard-scholars.faq": FaqSchema,

  "leaderboard-universities.hero": LeaderboardHeroSchema,
  "leaderboard-universities.table": LeaderboardTableSchema,
  "leaderboard-universities.faq": FaqSchema,

  "leaderboard-doctors.hero": LeaderboardHeroSchema,
  "leaderboard-doctors.table": LeaderboardTableSchema,
  "leaderboard-doctors.faq": FaqSchema,

  "contact.hero": ContactHeroSchema,
  "contact.form": ContactFormSchema,
  "contact.final_cta": FinalCtaSchema,

  "legal.hero": HeroBgSchema.extend({
    privacy_badge: z.string(),
    terms_badge: z.string(),
    privacy_heading: z.string(),
    terms_heading: z.string(),
    privacy_summary: z.string(),
    terms_summary: z.string(),
    privacy_tab_label: z.string(),
    terms_tab_label: z.string(),
    last_updated_prefix: z.string(),
  }),
};

export function getCmsSchema(key: string) {
  return CmsSchemas[key];
}

export function validateCmsPayload(key: string, value: unknown) {
  const schema = CmsSchemas[key];
  if (!schema) {
    return {
      success: false as const,
      message: `Unsupported CMS key: ${key}`,
    };
  }

  const result = schema.safeParse(value);
  if (!result.success) {
    return {
      success: false as const,
      message: result.error.issues
        .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
        .join("; "),
    };
  }

  return {
    success: true as const,
    data: result.data,
  };
}
