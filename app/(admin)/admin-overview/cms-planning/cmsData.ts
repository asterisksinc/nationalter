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
const img = (key: string, label: string, placeholder = ""): CMSField => ({ key, label, type: "image", placeholder });
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
                    txt("top_message", "Top Message Text", "1,928,384+ Indian Researchers"),
                    txt("heading_line_1", "Heading Line 1", "India's H-Index"),
                    txt("heading_line_2", "Heading Line 2", "Leaderboard Portal"),
                    ta("subheading", "Subheading", "Unlock Your Potential with…"),
                    txt("primary_cta_label", "Primary CTA Label", "Claim My Profile"),
                    txt("secondary_cta_label", "Secondary CTA Label", "Search Directory"),
                    img("desktop_background_image", "Desktop Background Image"),
                    img("mobile_background_image", "Mobile Background Image"),
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
                        txt("id", "ID"), txt("title", "Title"), txt("tagline", "Tagline"), txt("category", "Category"),
                        ta("description", "Description"), img("image", "Image"), txt("slug", "Slug"),
                    ]),
                ],
            },
            {
                key: "home_pricing", title: "Pricing Preview",
                fields: [
                    txt("badge_text", "Badge Text", "Membership"),
                    txt("heading", "Heading", "Choose Your Plan"),
                    rep("billing_cycle_labels", "Billing Cycle Labels", [
                        txt("monthly", "Monthly Label", "Monthly"),
                        txt("alternate", "Alternate Label", "Switch"),
                    ]),
                    txt("includes_label", "Includes Label", "What's Included"),
                    txt("audience_note", "Audience Note"),
                    txt("footer_note", "Footer Note"),
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
                    txt("primary_cta_label", "Primary CTA Label"),
                    img("banner_image", "Banner Image"),
                    txt("banner_alt", "Banner Alt Text", "Nationcite CTA Section"),
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
                    txt("kicker", "Kicker"), txt("title", "Title"), ta("body", "Body"),
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
                    txt("badge_text", "Badge Text"), txt("heading", "Heading"),
                    rep("billing_cycle_labels", "Billing Cycle Labels", [
                        txt("monthly", "Monthly Label"),
                        txt("alternate", "Alternate Label"),
                    ]),
                    txt("includes_label", "Includes Label"),
                    txt("audience_note", "Audience Note"),
                    txt("footer_note", "Footer Note"),
                ],
            },
            {
                key: "pricing_tables", title: "Comparison Tables",
                fields: [
                    txt("overview_title", "Overview Title"),
                    txt("addons_title", "Addons Title"),
                ],
            },
            {
                key: "pricing_faq", title: "FAQ",
                fields: [
                    txt("kicker", "Kicker"), txt("title", "Title"), ta("body", "Body"),
                ],
            },
            {
                key: "pricing_final_cta", title: "Final CTA",
                fields: [
                    txt("kicker", "Kicker"), txt("heading", "Heading"), ta("body", "Body"),
                    txt("primary_cta_label", "Primary CTA Label"), img("banner_image", "Banner Image"),
                    txt("banner_alt", "Banner Alt Text", "Nationcite CTA Section"),
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
                    txt("kicker", "Kicker"), txt("title", "Title"), ta("body", "Body"),
                ],
            },
            {
                key: "methodology_final_cta", title: "Final CTA",
                fields: [
                    txt("kicker", "Kicker"), txt("heading", "Heading"), ta("body", "Body"),
                    txt("primary_cta_label", "Primary CTA Label"), img("banner_image", "Banner Image"),
                    txt("banner_alt", "Banner Alt Text", "Nationcite CTA Section"),
                ],
            },
        ],
    },

    
    

    /* ── 7. Leaderboard Detail (template) ── */
    {
        key: "leaderboard_scholars", title: "Leaderboard Scholars",
        sections: [
            {
                key: "lb_scholars_hero", title: "Hero",
                fields: [
                    txt("badge_text", "Badge Text"), txt("heading", "Heading"), ta("subheading", "Subheading"),
                    txt("cta_label", "CTA Label"), url("cta_url", "CTA URL"),
                ],
            },
            {
                key: "lb_scholars_table", title: "Table Chrome",
                fields: [
                    txt("title", "Table Title"), txt("search_placeholder", "Search Placeholder"),
                    txt("loading_text", "Loading Text"), txt("error_title", "Error Title"),
                    ta("error_body", "Error Body"), txt("retry_label", "Retry Label"),
                ],
            },
            {
                key: "lb_scholars_three_cards", title: "Three Cards",
                fields: [
                    txt("heading", "Heading"), ta("subheading", "Subheading"),
                    rep("cards", "Cards", [
                        txt("title", "Title"), ta("description", "Description"), img("image", "Image"),
                    ]),
                ],
            },
            {
                key: "lb_scholars_tab_toggle", title: "Tab Content Toggle",
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
                key: "lb_scholars_three_blocks", title: "Three Blocks",
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
                key: "lb_scholars_faq", title: "FAQ",
                fields: [
                    txt("kicker", "Kicker"), txt("title", "Heading"), ta("body", "Body"),
                    rep("faq_items", "FAQ Items", [txt("question", "Question"), ta("answer", "Answer")]),
                ],
            },
            {
                key: "lb_scholars_final_cta", title: "Final CTA",
                fields: [
                    txt("heading", "Heading"),
                    txt("primary_cta_label", "Primary CTA Label"), url("primary_cta_url", "Primary CTA URL"),
                    txt("secondary_cta_label", "Secondary CTA Label"), url("secondary_cta_url", "Secondary CTA URL"),
                    img("background_image", "Background Image"),
                ],
            },
        ],
    },
    {
        key: "leaderboard_universities", title: "Leaderboard Universities",
        sections: [
            {
                key: "lb_universities_hero", title: "Hero",
                fields: [
                    txt("badge_text", "Badge Text"), txt("heading", "Heading"), ta("subheading", "Subheading"),
                    txt("cta_label", "CTA Label"), url("cta_url", "CTA URL"),
                ],
            },
            {
                key: "lb_universities_table", title: "Table Chrome",
                fields: [
                    txt("title", "Table Title"), txt("search_placeholder", "Search Placeholder"),
                    txt("loading_text", "Loading Text"), txt("error_title", "Error Title"),
                    ta("error_body", "Error Body"), txt("retry_label", "Retry Label"),
                ],
            },
            {
                key: "lb_universities_three_cards", title: "Three Cards",
                fields: [
                    txt("heading", "Heading"), ta("subheading", "Subheading"),
                    rep("cards", "Cards", [
                        txt("title", "Title"), ta("description", "Description"), img("image", "Image"),
                    ]),
                ],
            },
            {
                key: "lb_universities_tab_toggle", title: "Tab Content Toggle",
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
                key: "lb_universities_three_blocks", title: "Three Blocks",
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
                key: "lb_universities_faq", title: "FAQ",
                fields: [
                    txt("kicker", "Kicker"), txt("title", "Heading"), ta("body", "Body"),
                    rep("faq_items", "FAQ Items", [txt("question", "Question"), ta("answer", "Answer")]),
                ],
            },
            {
                key: "lb_universities_final_cta", title: "Final CTA",
                fields: [
                    txt("heading", "Heading"),
                    txt("primary_cta_label", "Primary CTA Label"), url("primary_cta_url", "Primary CTA URL"),
                    txt("secondary_cta_label", "Secondary CTA Label"), url("secondary_cta_url", "Secondary CTA URL"),
                    img("background_image", "Background Image"),
                ],
            },
        ],
    },
    {
        key: "leaderboard_doctors", title: "Leaderboard Doctors",
        sections: [
            {
                key: "lb_doctors_hero", title: "Hero",
                fields: [
                    txt("badge_text", "Badge Text"), txt("heading", "Heading"), ta("subheading", "Subheading"),
                    txt("cta_label", "CTA Label"), url("cta_url", "CTA URL"),
                ],
            },
            {
                key: "lb_doctors_table", title: "Table Chrome",
                fields: [
                    txt("title", "Table Title"), txt("search_placeholder", "Search Placeholder"),
                    txt("loading_text", "Loading Text"), txt("error_title", "Error Title"),
                    ta("error_body", "Error Body"), txt("retry_label", "Retry Label"),
                ],
            },
            {
                key: "lb_doctors_three_cards", title: "Three Cards",
                fields: [
                    txt("heading", "Heading"), ta("subheading", "Subheading"),
                    rep("cards", "Cards", [
                        txt("title", "Title"), ta("description", "Description"), img("image", "Image"),
                    ]),
                ],
            },
            {
                key: "lb_doctors_tab_toggle", title: "Tab Content Toggle",
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
                key: "lb_doctors_three_blocks", title: "Three Blocks",
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
                key: "lb_doctors_faq", title: "FAQ",
                fields: [
                    txt("kicker", "Kicker"), txt("title", "Heading"), ta("body", "Body"),
                    rep("faq_items", "FAQ Items", [txt("question", "Question"), ta("answer", "Answer")]),
                ],
            },
            {
                key: "lb_doctors_final_cta", title: "Final CTA",
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
                    txt("badge_text", "Badge Text"),
                    txt("heading_line_1", "Heading Line 1"),
                    txt("heading_line_2", "Heading Line 2"),
                    ta("subheading", "Subheading"),
                ],
            },
            {
                key: "blog_controls", title: "Search & Sort Controls",
                fields: [
                    txt("search_placeholder", "Search Placeholder"),
                    txt("loading_text", "Loading Text"), txt("empty_text", "Empty State Text"),
                    txt("empty_filtered_text", "Empty Filtered State Text"),
                ],
            },
            {
                key: "blog_grid", title: "Article Grid Chrome",
                fields: [
                    txt("read_more_label", "Read More Label", "Read More"),
                ],
            },
            {
                key: "blog_faq", title: "FAQ",
                fields: [
                    txt("kicker", "Kicker"), txt("title", "Title"), ta("body", "Body"),
                    rep("faq_items", "FAQ Items", [txt("question", "Question"), ta("answer", "Answer")]),
                ],
            },
            {
                key: "blog_final_cta", title: "Final CTA",
                fields: [
                    txt("kicker", "Kicker"), txt("heading", "Heading"), ta("body", "Body"),
                    txt("primary_cta_label", "Primary CTA Label"), img("banner_image", "Banner Image"),
                    txt("banner_alt", "Banner Alt Text", "Nationcite CTA Section"),
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
                    txt("kicker", "Kicker"),
                    txt("heading_line_1", "Heading Line 1"),
                    txt("heading_line_2", "Heading Line 2"),
                    ta("body", "Body"),
                    txt("trusted_by_text", "Trusted By Text"),
                ],
            },
            {
                key: "contact_form", title: "Form Configuration",
                fields: [
                    txt("title", "Form Title"),
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
                    txt("primary_cta_label", "Primary CTA Label"), img("banner_image", "Banner Image"),
                    txt("banner_alt", "Banner Alt Text", "Nationcite CTA Section"),
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
                    txt("privacy_badge", "Privacy Badge Text"), txt("terms_badge", "Terms Badge Text"),
                    txt("privacy_heading", "Privacy Heading"), txt("terms_heading", "Terms Heading"),
                    ta("privacy_summary", "Privacy Summary"), ta("terms_summary", "Terms Summary"),
                    txt("privacy_tab_label", "Privacy Tab Label"),
                    txt("terms_tab_label", "Terms Tab Label"),
                    txt("last_updated_prefix", "Last Updated Prefix"),
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
