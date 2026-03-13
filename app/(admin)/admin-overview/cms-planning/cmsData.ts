/* ─── CMS Planning Data ─── */
/* Every page → section → field from the reverse engineering doc */

export type FieldType = "text" | "textarea" | "image" | "url" | "repeatable";

export interface CMSField {
    key: string;
    label: string;
    type: FieldType;
    placeholder?: string;
    subFields?: CMSField[];
}

export interface CMSSection {
    key: string;
    title: string;
    fields: CMSField[];
}

export interface CMSPage {
    key: string;
    title: string;
    sections: CMSSection[];
}

/* ─── helpers ─── */
const txt = (key: string, label: string, placeholder = ""): CMSField => ({ key, label, type: "text", placeholder });
const ta = (key: string, label: string, placeholder = ""): CMSField => ({ key, label, type: "textarea", placeholder });
const img = (key: string, label: string): CMSField => ({ key, label, type: "image" });
const url = (key: string, label: string, placeholder = ""): CMSField => ({ key, label, type: "url", placeholder });
const rep = (key: string, label: string, subFields: CMSField[]): CMSField => ({ key, label, type: "repeatable", subFields });

/* ═══════════════════════════════════════════════════ */
export const CMS_PAGES: CMSPage[] = [
    /* ── 1. Global Settings ── */
    {
        key: "global", title: "Global Settings",
        sections: [
            {
                key: "site_settings", title: "Site Settings",
                fields: [
                    txt("site_name", "Site Name", "NationCite"),
                    txt("seo_title_template", "Default SEO Title Template", "%page% | NationCite"),
                    ta("seo_description", "Default SEO Description", "Default meta description…"),
                    img("og_image", "Default Open Graph Image"),
                    img("desktop_hero_bg", "Desktop Hero Background"),
                    img("mobile_hero_bg", "Mobile Hero Background"),
                    txt("copyright", "Copyright Text", "© 2025 NationCite"),
                    rep("social_links", "Social Links", [
                        txt("platform", "Platform", "Twitter"), url("url", "URL", "https://…"),
                    ]),
                ],
            },
            {
                key: "navigation", title: "Navigation",
                fields: [
                    img("header_logo", "Header Logo"),
                    img("mobile_logo", "Mobile Logo"),
                    rep("nav_links", "Nav Links", [
                        txt("label", "Label", "About"), url("url", "URL", "/about"),
                    ]),
                    rep("leaderboard_dropdown", "Leaderboard Dropdown Items", [
                        txt("label", "Label", "Scholars"), url("url", "URL", "/leaderboard/scholars"),
                    ]),
                    txt("auth_cta_label", "Auth CTA Label", "Sign In"),
                    url("auth_cta_url", "Auth CTA URL", "/login"),
                    txt("dashboard_cta_label", "Dashboard CTA Label", "Dashboard"),
                    url("dashboard_cta_url", "Dashboard CTA URL", "/dashboard"),
                ],
            },
            {
                key: "footer", title: "Footer",
                fields: [
                    img("footer_logo", "Footer Logo"),
                    rep("company_links", "Company Links", [
                        txt("label", "Label", "About"), url("url", "URL", "/about"),
                    ]),
                    rep("leaderboard_links", "Leaderboard Links", [
                        txt("label", "Label", "Scholars"), url("url", "URL", "/leaderboard/scholars"),
                    ]),
                    rep("social_icons", "Social Icons & URLs", [
                        txt("platform", "Platform", "Twitter"), url("url", "URL", "https://…"), img("icon", "Icon"),
                    ]),
                    rep("legal_links", "Legal Links", [
                        txt("label", "Label", "Privacy Policy"), url("url", "URL", "/legal"),
                    ]),
                    txt("copyright", "Copyright Text", "© 2025 NationCite"),
                ],
            },
        ],
    },

    /* ── 2. Home Page ── */
    {
        key: "home", title: "Home Page",
        sections: [
            {
                key: "home_hero", title: "Hero Section",
                fields: [
                    rep("badge_avatars", "Badge Avatar Images", [img("image", "Avatar")]),
                    txt("top_message_text", "Top Message Text", "150+ Students Enrolled"),
                    txt("top_message_link_label", "Top Message Link Label", "Learn More"),
                    url("top_message_link_url", "Top Message Link URL", "/about"),
                    txt("heading", "Heading", "Your Ultimate Academic Mentorship…"),
                    ta("subheading", "Subheading", "Unlock Your Potential with…"),
                    txt("primary_cta_label", "Primary CTA Label", "Get Started"),
                    url("primary_cta_url", "Primary CTA URL", "/register"),
                    txt("secondary_cta_label", "Secondary CTA Label", "Learn More"),
                    url("secondary_cta_url", "Secondary CTA URL", "/about"),
                    img("desktop_bg", "Desktop Background Image"),
                    img("mobile_bg", "Mobile Background Image"),
                ],
            },
            {
                key: "home_leaderboard_widget", title: "Leaderboard Widget",
                fields: [
                    txt("widget_title", "Widget Title", "Scholar Leaderboard"),
                    txt("search_placeholder", "Search Placeholder", "Search scholars…"),
                    rep("tab_labels", "Tab Labels", [txt("label", "Label", "Scholars")]),
                    txt("loading_text", "Loading Text", "Loading…"),
                    txt("empty_state_text", "Empty State Text", "No results found"),
                    txt("error_title", "Error Title", "Something went wrong"),
                    ta("error_body", "Error Body", "Please try again later"),
                ],
            },
            {
                key: "home_trusted_by", title: "Trusted By",
                fields: [
                    txt("heading", "Heading", "Trusted By Leading Institutions"),
                    rep("logos", "Institution Logos", [
                        txt("name", "Name", "MIT"), img("image", "Logo"), url("url", "URL", "https://…"),
                    ]),
                ],
            },
            {
                key: "home_h_index", title: "Understanding H-Index",
                fields: [
                    txt("heading", "Heading", "Understanding the H-Index"),
                    ta("subheading", "Subheading", "The H-index measures…"),
                    rep("cards", "Cards", [
                        txt("title", "Title", "What is H-Index?"),
                        ta("description", "Description", "The H-index is…"),
                        img("image", "Image"),
                    ]),
                ],
            },
            {
                key: "home_transparency", title: "Transparency Section",
                fields: [
                    txt("heading", "Heading", "Transparency & Trust"),
                    ta("subheading", "Subheading"),
                    txt("cta_label", "CTA Label", "View All"),
                    url("cta_url", "CTA URL"),
                    rep("items", "Transparency Items", [
                        txt("title", "Title"), txt("tagline", "Tagline"), txt("category", "Category"),
                        ta("description", "Description"), img("image", "Image"), url("detail_url", "Detail URL"),
                    ]),
                ],
            },
            {
                key: "home_pricing", title: "Pricing Preview",
                fields: [
                    txt("kicker", "Kicker", "Pricing"),
                    txt("heading", "Heading", "Choose Your Plan"),
                    rep("billing_labels", "Billing Cycle Labels", [txt("label", "Label", "Monthly")]),
                    rep("plans", "Plans", [
                        txt("title", "Title", "Free"), txt("price", "Price", "$0"),
                        txt("billing_suffix", "Billing Suffix", "/month"),
                        ta("description", "Description"), txt("button_label", "Button Label", "Get Started"),
                        url("button_url", "Button URL"), txt("highlight", "Highlight Badge", "Popular"),
                        txt("audience_note", "Audience Note"), txt("footer_note", "Footer Note"),
                        ta("features", "Features (one per line)"),
                    ]),
                ],
            },
            {
                key: "home_research_intelligence", title: "Research Intelligence",
                fields: [
                    txt("kicker", "Kicker"), txt("heading", "Heading"), ta("subheading", "Subheading"),
                    rep("cards", "Resource Cards", [
                        txt("title", "Title"), ta("description", "Description"), img("image", "Image"), url("url", "URL"),
                    ]),
                    txt("cta_label", "CTA Label"), url("cta_url", "CTA URL"),
                ],
            },
            {
                key: "home_final_cta", title: "Final CTA",
                fields: [
                    txt("kicker", "Kicker"), txt("heading", "Heading"), ta("body", "Body"),
                    txt("primary_cta_label", "Primary CTA Label"), url("primary_cta_url", "Primary CTA URL"),
                    img("banner_image", "Banner Image"),
                ],
            },
        ],
    },

    /* ── 3. About ── */
    {
        key: "about", title: "About Page",
        sections: [
            {
                key: "about_hero", title: "Hero",
                fields: [
                    txt("badge_text", "Badge Text"), txt("heading", "Heading"), ta("subheading", "Subheading"),
                    txt("cta_label", "CTA Label"), url("cta_action", "CTA Action"),
                ],
            },
            {
                key: "about_image_collage", title: "Image Collage",
                fields: [
                    img("left_image", "Left Image"), txt("left_image_alt", "Left Alt Text"),
                    img("right_image", "Right Image"), txt("right_image_alt", "Right Alt Text"),
                ],
            },
            {
                key: "about_who_we_are", title: "Who We Are",
                fields: [
                    txt("kicker", "Kicker"), txt("heading", "Heading"),
                    rep("paragraphs", "Paragraphs", [ta("text", "Paragraph Text")]),
                ],
            },
            {
                key: "about_feature_visual", title: "Feature Visual",
                fields: [img("image", "Feature Image"), txt("alt_text", "Alt Text")],
            },
            {
                key: "about_team", title: "Team Grid",
                fields: [
                    txt("heading", "Heading"),
                    rep("members", "Team Members", [
                        txt("name", "Name"), txt("role", "Role"), img("image", "Photo"), ta("bio_short", "Short Bio"),
                    ]),
                ],
            },
            {
                key: "about_reasons", title: "Reasons / Values",
                fields: [
                    txt("heading", "Heading"), ta("subheading", "Subheading"),
                    rep("reasons", "Reasons", [
                        txt("title", "Title"), ta("description", "Description"), img("icon", "Icon"),
                    ]),
                ],
            },
            {
                key: "about_faq", title: "FAQ",
                fields: [
                    txt("kicker", "Kicker"), txt("heading", "Heading"), ta("body", "Body"),
                    rep("faq_items", "FAQ Items", [txt("question", "Question"), ta("answer", "Answer")]),
                ],
            },
            {
                key: "about_cta_banner", title: "CTA Banner",
                fields: [
                    txt("kicker", "Kicker"), txt("heading", "Heading"), ta("body", "Body"),
                    txt("primary_cta_label", "Primary CTA Label"), url("primary_cta_url", "Primary CTA URL"),
                    txt("secondary_cta_label", "Secondary CTA Label"), url("secondary_cta_url", "Secondary CTA URL"),
                    img("banner_image", "Banner Image"),
                ],
            },
        ],
    },

    /* ── 4. Pricing ── */
    {
        key: "pricing", title: "Pricing Page",
        sections: [
            {
                key: "pricing_hero", title: "Hero Pricing Block",
                fields: [
                    txt("kicker", "Kicker"), txt("heading", "Heading"),
                    rep("billing_labels", "Billing Cycle Labels", [txt("label", "Label")]),
                    rep("plans", "Plans", [
                        txt("title", "Title"), txt("price", "Price"), txt("billing_suffix", "Suffix"),
                        ta("description", "Description"), txt("button_label", "Button Label"),
                        url("button_url", "Button URL"), txt("highlight", "Highlight"), ta("features", "Features"),
                    ]),
                ],
            },
            {
                key: "pricing_tables", title: "Comparison Tables",
                fields: [
                    rep("tables", "Tables", [
                        txt("title", "Table Title"),
                        ta("headers", "Column Headers (comma-separated)"),
                        ta("rows", "Table Rows (one row per line, cells comma-separated)"),
                    ]),
                ],
            },
            {
                key: "pricing_faq", title: "FAQ",
                fields: [
                    txt("kicker", "Kicker"), txt("heading", "Heading"), ta("body", "Body"),
                    rep("faq_items", "FAQ Items", [txt("question", "Question"), ta("answer", "Answer")]),
                ],
            },
            {
                key: "pricing_final_cta", title: "Final CTA",
                fields: [
                    txt("kicker", "Kicker"), txt("heading", "Heading"), ta("body", "Body"),
                    txt("cta_label", "CTA Label"), url("cta_url", "CTA URL"), img("banner_image", "Banner Image"),
                ],
            },
        ],
    },

    /* ── 5. Methodology ── */
    {
        key: "methodology", title: "Methodology Page",
        sections: [
            {
                key: "methodology_hero", title: "Hero",
                fields: [
                    txt("badge_text", "Badge Text"), txt("heading", "Heading"), ta("subheading", "Subheading"),
                    txt("cta_label", "CTA Label"), url("cta_url", "CTA URL"),
                ],
            },
            {
                key: "methodology_trusted_by", title: "Trusted By",
                fields: [
                    txt("heading", "Heading"),
                    rep("logos", "Logos", [txt("name", "Name"), img("image", "Logo"), url("url", "URL")]),
                ],
            },
            {
                key: "methodology_big_card", title: "Big Card",
                fields: [
                    txt("kicker", "Kicker"), txt("heading", "Heading"),
                    rep("paragraphs", "Paragraphs", [ta("text", "Paragraph")]), img("image", "Image"),
                ],
            },
            {
                key: "methodology_narrative", title: "Narrative Split",
                fields: [
                    txt("kicker", "Kicker"), txt("heading", "Heading"),
                    rep("paragraphs", "Paragraphs", [ta("text", "Paragraph")]),
                ],
            },
            {
                key: "methodology_resources", title: "Resource Blocks",
                fields: [
                    txt("heading", "Heading"), ta("subheading", "Subheading"),
                    rep("cards", "Resource Cards", [
                        txt("title", "Title"), ta("description", "Description"), img("image", "Image"),
                        txt("link_label", "Link Label"), url("link_url", "Link URL"),
                    ]),
                    txt("cta_label", "CTA Label"), url("cta_url", "CTA URL"),
                ],
            },
            {
                key: "methodology_faq", title: "FAQ",
                fields: [
                    txt("kicker", "Kicker"), txt("heading", "Heading"), ta("body", "Body"),
                    rep("faq_items", "FAQ Items", [txt("question", "Question"), ta("answer", "Answer")]),
                ],
            },
            {
                key: "methodology_final_cta", title: "Final CTA",
                fields: [
                    txt("kicker", "Kicker"), txt("heading", "Heading"), ta("body", "Body"),
                    txt("cta_label", "CTA Label"), url("cta_url", "CTA URL"), img("banner_image", "Banner Image"),
                ],
            },
        ],
    },

    /* ── 6. Leaderboard Hub ── */
    {
        key: "leaderboard_hub", title: "Leaderboard Hub",
        sections: [
            {
                key: "lb_hub_hero", title: "Hero",
                fields: [
                    txt("badge_text", "Badge Text"), txt("heading", "Heading"), ta("subheading", "Subheading"),
                ],
            },
            {
                key: "lb_hub_widget", title: "Widget Chrome",
                fields: [
                    txt("title", "Title"), txt("search_placeholder", "Search Placeholder"),
                    rep("tab_labels", "Tab Labels", [txt("label", "Label")]),
                    txt("loading_text", "Loading Text"), txt("error_text", "Error Text"),
                ],
            },
            {
                key: "lb_hub_three_cards", title: "Three Cards",
                fields: [
                    txt("heading", "Heading"), ta("subheading", "Subheading"),
                    rep("cards", "Cards", [
                        txt("title", "Title"), ta("description", "Description"), img("image", "Image"),
                    ]),
                ],
            },
            {
                key: "lb_hub_consultancy", title: "Consultancy",
                fields: [
                    txt("kicker", "Kicker"), txt("heading", "Heading"), ta("body", "Body"),
                    rep("features", "Features", [txt("text", "Feature Text")]),
                    txt("cta_label", "CTA Label"), url("cta_url", "CTA URL"),
                ],
            },
            {
                key: "lb_hub_three_blocks", title: "Three Blocks",
                fields: [
                    txt("heading", "Heading"), ta("subheading", "Subheading"),
                    rep("cards", "Cards", [
                        txt("title", "Title"), ta("description", "Description"), img("image", "Image"),
                        txt("link_label", "Link Label"), url("link_url", "Link URL"),
                    ]),
                    txt("cta_label", "CTA Label"), url("cta_url", "CTA URL"),
                ],
            },
            {
                key: "lb_hub_faq", title: "FAQ",
                fields: [
                    txt("kicker", "Kicker"), txt("heading", "Heading"), ta("body", "Body"),
                    rep("faq_items", "FAQ Items", [txt("question", "Question"), ta("answer", "Answer")]),
                ],
            },
            {
                key: "lb_hub_final_cta", title: "Final CTA",
                fields: [
                    txt("heading", "Heading"),
                    txt("primary_cta_label", "Primary CTA Label"), url("primary_cta_url", "Primary CTA URL"),
                    txt("secondary_cta_label", "Secondary CTA Label"), url("secondary_cta_url", "Secondary CTA URL"),
                    img("background_image", "Background Image"),
                ],
            },
        ],
    },

    /* ── 7. Leaderboard Detail (template) ── */
    {
        key: "leaderboard_detail", title: "Leaderboard Detail",
        sections: [
            {
                key: "lb_detail_hero", title: "Hero",
                fields: [
                    txt("badge_text", "Badge Text"), txt("heading", "Heading"), ta("subheading", "Subheading"),
                    txt("cta_label", "CTA Label"), url("cta_url", "CTA URL"),
                ],
            },
            {
                key: "lb_detail_table", title: "Table Chrome",
                fields: [
                    txt("table_title", "Table Title"), txt("search_placeholder", "Search Placeholder"),
                    txt("loading_text", "Loading Text"), txt("error_title", "Error Title"),
                    ta("error_body", "Error Body"), txt("retry_label", "Retry Label"),
                ],
            },
            {
                key: "lb_detail_three_cards", title: "Three Cards",
                fields: [
                    txt("heading", "Heading"), ta("subheading", "Subheading"),
                    rep("cards", "Cards", [
                        txt("title", "Title"), ta("description", "Description"), img("image", "Image"),
                    ]),
                ],
            },
            {
                key: "lb_detail_tab_toggle", title: "Tab Content Toggle",
                fields: [
                    txt("badge_text", "Badge Text"), txt("title", "Title"),
                    txt("cta_label", "CTA Label"), url("cta_url", "CTA URL"),
                    rep("tabs", "Tabs", [
                        txt("label", "Tab Label"), txt("title", "Tab Title"), ta("body", "Tab Body"),
                        img("image", "Tab Image"), img("icon", "Tab Icon"),
                    ]),
                ],
            },
            {
                key: "lb_detail_three_blocks", title: "Three Blocks",
                fields: [
                    txt("heading", "Heading"), ta("subheading", "Subheading"),
                    rep("cards", "Cards", [
                        txt("title", "Title"), ta("description", "Description"), img("image", "Image"),
                        txt("link_label", "Link Label"), url("link_url", "Link URL"),
                    ]),
                    txt("cta_label", "CTA Label"), url("cta_url", "CTA URL"),
                ],
            },
            {
                key: "lb_detail_faq", title: "FAQ",
                fields: [
                    txt("kicker", "Kicker"), txt("heading", "Heading"), ta("body", "Body"),
                    rep("faq_items", "FAQ Items", [txt("question", "Question"), ta("answer", "Answer")]),
                ],
            },
            {
                key: "lb_detail_final_cta", title: "Final CTA",
                fields: [
                    txt("heading", "Heading"),
                    txt("primary_cta_label", "Primary CTA Label"), url("primary_cta_url", "Primary CTA URL"),
                    txt("secondary_cta_label", "Secondary CTA Label"), url("secondary_cta_url", "Secondary CTA URL"),
                    img("background_image", "Background Image"),
                ],
            },
        ],
    },

    /* ── 8. Blog Listing ── */
    {
        key: "blog_listing", title: "Blog Listing",
        sections: [
            {
                key: "blog_hero", title: "Hero",
                fields: [
                    txt("badge_text", "Badge Text"), txt("heading", "Heading"), ta("subheading", "Subheading"),
                ],
            },
            {
                key: "blog_controls", title: "Search & Sort Controls",
                fields: [
                    txt("search_placeholder", "Search Placeholder"),
                    rep("sort_options", "Sort Options", [txt("label", "Label"), txt("value", "Value")]),
                    txt("loading_text", "Loading Text"), txt("empty_state_text", "Empty State Text"),
                    txt("empty_filtered_text", "Empty Filtered State Text"),
                ],
            },
            {
                key: "blog_grid", title: "Article Grid Chrome",
                fields: [
                    txt("read_more_label", "Read More Label", "Read More"),
                    img("fallback_cover", "Fallback Cover Image"),
                ],
            },
            {
                key: "blog_faq", title: "FAQ",
                fields: [
                    txt("kicker", "Kicker"), txt("heading", "Heading"), ta("body", "Body"),
                    rep("faq_items", "FAQ Items", [txt("question", "Question"), ta("answer", "Answer")]),
                ],
            },
            {
                key: "blog_final_cta", title: "Final CTA",
                fields: [
                    txt("kicker", "Kicker"), txt("heading", "Heading"), ta("body", "Body"),
                    txt("cta_label", "CTA Label"), url("cta_url", "CTA URL"), img("banner_image", "Banner Image"),
                ],
            },
        ],
    },

    /* ── 9. Blog Detail ── */
    {
        key: "blog_detail", title: "Blog Detail (Article Model)",
        sections: [
            {
                key: "blog_article", title: "Article Fields",
                fields: [
                    txt("badge_text", "Badge Text"), txt("back_link_label", "Back Link Label", "← Back to Blog"),
                    txt("article_title", "Article Title"), ta("article_intro", "Article Intro"),
                    img("cover_image", "Cover Image"), txt("author_name", "Author Name"), txt("publish_date", "Publish Date"),
                    rep("sections", "Content Sections", [
                        txt("heading", "Section Heading"), ta("text", "Section Text"), img("image", "Section Image"),
                    ]),
                    ta("conclusion", "Conclusion"),
                ],
            },
        ],
    },

    /* ── 10. Contact ── */
    {
        key: "contact", title: "Contact Page",
        sections: [
            {
                key: "contact_hero", title: "Hero Copy",
                fields: [
                    txt("kicker", "Kicker"), txt("heading", "Heading"), ta("body", "Body"),
                    txt("trust_statement", "Trust Statement"),
                    rep("logos", "Trust Logos", [txt("name", "Name"), img("image", "Logo"), url("url", "URL")]),
                ],
            },
            {
                key: "contact_form", title: "Form Configuration",
                fields: [
                    txt("form_title", "Form Title"), ta("field_labels", "Field Labels (one per line)"),
                    ta("placeholders", "Placeholders (one per line)"),
                    rep("inquiry_types", "Inquiry Types", [txt("label", "Label")]),
                    txt("success_title", "Success Title"), ta("success_body", "Success Body"),
                    txt("error_title", "Error Title"), ta("error_body", "Error Body"),
                    txt("submit_label", "Submit Label", "Send Message"),
                    txt("submitting_label", "Submitting Label", "Sending…"),
                ],
            },
            {
                key: "contact_final_cta", title: "Final CTA",
                fields: [
                    txt("kicker", "Kicker"), txt("heading", "Heading"), ta("body", "Body"),
                    txt("cta_label", "CTA Label"), url("cta_url", "CTA URL"), img("banner_image", "Banner Image"),
                ],
            },
        ],
    },

    /* ── 11. Legal ── */
    {
        key: "legal", title: "Legal Page",
        sections: [
            {
                key: "legal_hero", title: "Hero",
                fields: [
                    txt("privacy_badge_text", "Privacy Badge Text"), txt("terms_badge_text", "Terms Badge Text"),
                    txt("privacy_heading", "Privacy Heading"), txt("terms_heading", "Terms Heading"),
                    ta("privacy_summary", "Privacy Summary"), ta("terms_summary", "Terms Summary"),
                    rep("tab_labels", "Tab Labels", [txt("label", "Label")]),
                ],
            },
            {
                key: "legal_documents", title: "Legal Documents",
                fields: [
                    txt("privacy_last_updated", "Privacy Last Updated"),
                    txt("terms_last_updated", "Terms Last Updated"),
                    rep("privacy_sections", "Privacy Sections", [
                        txt("title", "Section Title"), ta("paragraphs", "Paragraphs"),
                    ]),
                    rep("terms_sections", "Terms Sections", [
                        txt("title", "Section Title"), ta("paragraphs", "Paragraphs"),
                    ]),
                ],
            },
            {
                key: "legal_contact", title: "Contact Block",
                fields: [
                    txt("heading", "Heading"), ta("body", "Body"),
                    txt("cta_label", "CTA Label"), url("cta_url", "CTA URL"),
                ],
            },
        ],
    },
];
