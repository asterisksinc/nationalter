# Phase 1: CMS Reverse Engineering And Content Mapping

## Objective

Reverse engineer the current public website into a section-based CMS architecture that matches the existing admin CMS direction and the provided UI pattern.

This phase is analysis only.

No backend implementation is included in this document.

## Scope

- Scanned all public routes under `app/(site)`.
- Reviewed shared public components under `components/site` and `app/(site)/leaderboard/components` and `app/(site)/methodology/components`.
- Reviewed existing admin CMS screen in `app/(admin)/admin-overview/cms/page.tsx`.
- Included global public chrome such as navbar, footer, SEO metadata, and shared CTA blocks.
- Excluded authenticated dashboards and registration flows from CMS scope.
- Treated leaderboard records and blog article bodies as domain content, not generic marketing copy, while still mapping the page chrome around them.

## Current Public Route Inventory

| Route | Current Role | Content Source Type |
| --- | --- | --- |
| `/` | Home / landing page | Mostly hardcoded + shared components |
| `/about` | Brand/about page | Hardcoded |
| `/pricing` | Pricing and plan comparison | Hardcoded |
| `/methodology` | Methodology overview | Hardcoded + shared components |
| `/leaderboard` | Leaderboard hub | Hardcoded chrome + dynamic widget data |
| `/leaderboard/scholars` | Scholars leaderboard | Dynamic table data + hardcoded marketing sections |
| `/leaderboard/universities` | Universities leaderboard | Dynamic table data + hardcoded marketing sections |
| `/leaderboard/doctors` | Doctors leaderboard | Mock data + hardcoded marketing sections |
| `/blog` | Blog listing / resource center | Dynamic article list + hardcoded page chrome |
| `/blog/[slug]` | Blog article detail | Dynamic blog content |
| `/contact` | Contact page | Hardcoded copy + live form |
| `/legal` | Privacy policy and terms | Hardcoded legal arrays |

## Important Reality Check Against The Screenshot

The screenshot shows page buckets such as Landing Page, Introduction, Programs, 1:1 Mentorship, Testimonials, Webinars, Resources, FAQs, and Join Now.

Those do not currently exist as independent public routes in this codebase.

The closest current equivalents are:

- Landing Page -> `/`
- Introduction / About -> `/about`
- Resources -> `/blog`, `ResearchIntelligence`, `ThreeBlocksSection`
- FAQs -> shared `FAQSection` across multiple pages
- Join Now -> shared CTA sections such as `FinalCTA` and `LeaderboardFinalCTA`
- Webinars / Programs / Mentorship / Testimonials -> not implemented as dedicated public pages yet; these would need to be introduced as new CMS-managed sections or future routes

## Global CMS Domains

The CMS should not only manage page bodies. It should also manage the global public experience.

### 1. Site Settings

- site_name
- default SEO title template
- default SEO description
- default open graph image
- desktop hero background asset
- mobile hero background asset
- copyright text
- social links

### 2. Navigation

- header logo asset
- mobile logo asset
- nav links
- leaderboard dropdown items
- auth CTA labels and URLs
- dashboard CTA labels and URLs

### 3. Footer

- footer logo asset
- company links
- leaderboard links
- social icons and URLs
- legal links
- copyright text

### 4. Shared Reusable Section Templates

- hero
- logo marquee / trusted by
- FAQ accordion
- final CTA banner
- leaderboard CTA banner
- pricing cards
- content cards grid
- tabbed content block
- image collage block
- legal document section list

## Page By Page Section Mapping

## Home Page (`/`)

### Current section order

1. Hero
2. Leaderboard widget
3. Trusted by
4. Understanding H-index
5. Transparency section
6. Pricing section
7. Research intelligence
8. Final CTA

### CMS field map

#### Hero Section

- section_name: `home_hero`
- badge_avatar_images[]
- top_message_text
- top_message_link_label
- top_message_link_url
- hero_heading
- hero_subheading
- primary_cta_label
- primary_cta_url
- secondary_cta_label
- secondary_cta_url
- desktop_background_image
- mobile_background_image

#### Leaderboard Widget Promo

- section_name: `home_leaderboard_widget`
- widget_title
- search_placeholder
- tab_labels[]
- loading_text
- empty_state_text
- error_title
- error_body

Note: leaderboard rows should stay API-driven, not CMS-driven.

#### Trusted By

- section_name: `home_trusted_by`
- heading
- institution_logos[]
  - name
  - image or icon
  - target_url

#### Understanding H-Index

- section_name: `home_understanding_h_index`
- heading
- subheading
- cards[]
  - title
  - description
  - image

#### Transparency Section

- section_name: `home_transparency`
- heading
- subheading
- cta_label
- cta_url
- items[]
  - title
  - tagline
  - category
  - description
  - image
  - slug or detail_url

#### Pricing Preview

- section_name: `home_pricing`
- kicker
- heading
- billing_cycle_labels[]
- plans[]
  - title
  - price
  - billing_suffix
  - description
  - button_label
  - button_url
  - highlight
  - audience_note
  - footer_note
  - features[]

#### Research Intelligence

- section_name: `home_research_intelligence`
- kicker
- heading
- subheading
- cards[]
  - title
  - description
  - image
  - url
- cta_label
- cta_url

#### Final CTA

- section_name: `home_final_cta`
- kicker
- heading
- body
- primary_cta_label
- primary_cta_url
- banner_image

## About Page (`/about`)

### Current section order

1. Hero
2. Two-column image collage
3. Who we are
4. Large feature image block
5. Team grid
6. Reasons / values list
7. FAQ
8. Custom CTA banner with image

### CMS field map

#### Hero

- section_name: `about_hero`
- badge_text
- heading
- subheading
- cta_label
- cta_action

#### Image Collage

- section_name: `about_image_collage`
- left_image
- left_image_alt
- right_image
- right_image_alt

#### Who We Are

- section_name: `about_who_we_are`
- kicker
- heading
- paragraphs[]

#### Feature Image

- section_name: `about_feature_visual`
- image
- alt_text

#### Team Grid

- section_name: `about_team`
- heading
- members[]
  - name
  - role
  - image
  - bio_short

#### Why Researchers Choose Nationcite

- section_name: `about_reasons`
- heading
- subheading
- reasons[]
  - title
  - description
  - icon

#### FAQ

- section_name: `about_faq`
- kicker
- heading
- body
- faq_items[]
  - question
  - answer

#### About CTA Banner

- section_name: `about_cta_banner`
- kicker
- heading
- body
- primary_cta_label
- primary_cta_url
- secondary_cta_label
- secondary_cta_url
- banner_image

## Pricing Page (`/pricing`)

### Current section order

1. Hero pricing cards
2. Overview and pricing comparison table
3. Researcher features table
4. Institution workspace and capacity table
5. Analytics and insights table
6. Support and service table
7. Add-ons table
8. FAQ
9. Final CTA

### CMS field map

#### Hero Pricing Block

- section_name: `pricing_hero`
- inherited from shared pricing section

#### Comparison Tables

- section_name: `pricing_tables`
- tables[]
  - title
  - headers[]
  - rows[]
    - cells[]

#### Pricing FAQ

- section_name: `pricing_faq`
- kicker
- heading
- body
- faq_items[]

#### Pricing CTA

- section_name: `pricing_final_cta`
- inherited from shared final CTA

## Methodology Page (`/methodology`)

### Current section order

1. Hero
2. Trusted by
3. Big card intro
4. Right card narrative
5. Three resource blocks
6. FAQ
7. Final CTA

### CMS field map

#### Hero

- section_name: `methodology_hero`
- badge_text
- heading
- subheading
- cta_label
- cta_url

#### Trusted By

- section_name: `methodology_trusted_by`
- reuse shared logo marquee structure

#### Big Card

- section_name: `methodology_big_card`
- kicker
- heading
- paragraphs[]
- image

#### Narrative Split Section

- section_name: `methodology_narrative`
- kicker
- heading
- paragraphs[]

#### Resource Blocks

- section_name: `methodology_resources`
- heading
- subheading
- cards[]
  - title
  - description
  - image
  - link_label
  - link_url
- cta_label
- cta_url

#### FAQ

- section_name: `methodology_faq`
- reuse shared FAQ structure

#### Final CTA

- section_name: `methodology_final_cta`
- reuse shared final CTA structure

## Leaderboard Hub (`/leaderboard`)

### Current section order

1. Hero
2. Leaderboard widget
3. Three cards section
4. Consultancy section
5. Three blocks section
6. FAQ
7. Leaderboard final CTA

### CMS field map

#### Hero

- section_name: `leaderboard_hub_hero`
- badge_text
- heading
- subheading

#### Widget Chrome

- section_name: `leaderboard_hub_widget`
- title
- search_placeholder
- tab_labels[]
- loading_text
- error_text

#### Three Cards Section

- section_name: `leaderboard_hub_three_cards`
- heading
- subheading
- cards[]
  - title
  - description
  - image

#### Consultancy Section

- section_name: `leaderboard_hub_consultancy`
- kicker
- heading
- body
- features[]
- cta_label
- cta_url

#### Three Blocks Section

- section_name: `leaderboard_hub_resources`
- heading
- subheading
- cards[]
  - title
  - description
  - image
  - link_label
  - link_url
- cta_label
- cta_url

#### FAQ

- section_name: `leaderboard_hub_faq`
- reuse shared FAQ structure

#### Final CTA

- section_name: `leaderboard_hub_final_cta`
- heading
- primary_cta_label
- primary_cta_url
- secondary_cta_label
- secondary_cta_url
- background_image

## Leaderboard Detail Templates (`/leaderboard/scholars`, `/leaderboard/universities`, `/leaderboard/doctors`)

These three routes should use one CMS template with page-level overrides.

### Current section order

1. Hero
2. Search + leaderboard table
3. Three cards section
4. Tab content toggle
5. Three blocks section
6. FAQ
7. Final CTA

### CMS field map

#### Hero

- section_name: `leaderboard_detail_hero`
- badge_text
- heading
- subheading
- cta_label
- cta_url

#### Table Chrome

- section_name: `leaderboard_detail_table`
- table_title
- search_placeholder
- loading_text
- error_title
- error_body
- retry_label

Note: table rows remain domain data.

#### Three Cards

- section_name: `leaderboard_detail_three_cards`
- reuse shared cards grid structure

#### Tab Content Toggle

- section_name: `leaderboard_detail_tab_toggle`
- badge_text
- title
- cta_label
- cta_url
- tabs[]
  - label
  - title
  - body
  - image
  - icon

#### Three Blocks

- section_name: `leaderboard_detail_three_blocks`
- reuse shared resource block structure

#### FAQ

- section_name: `leaderboard_detail_faq`
- reuse shared FAQ structure

#### Final CTA

- section_name: `leaderboard_detail_final_cta`
- reuse shared leaderboard final CTA structure

### Route-specific overrides

- scholars: current table is live from `/api/scholars`
- universities: current table is live from `/api/orgs`
- doctors: current table is mock and should later move to an API or data source

## Blog Listing (`/blog`)

### Current section order

1. Hero
2. Search and sort controls
3. Blog/article grid
4. FAQ
5. Final CTA

### CMS field map

#### Hero

- section_name: `blog_index_hero`
- badge_text
- heading
- subheading

#### Search And Sort Chrome

- section_name: `blog_index_controls`
- search_placeholder
- sort_options[]
- loading_text
- empty_state_text
- empty_filtered_state_text

#### Article Grid

- section_name: `blog_index_grid`
- card_read_more_label
- fallback_cover_image

Note: blog cards themselves are already content-managed by the existing blogs domain.

#### FAQ

- section_name: `blog_index_faq`
- reuse shared FAQ structure

#### Final CTA

- section_name: `blog_index_final_cta`
- reuse shared final CTA structure

## Blog Detail (`/blog/[slug]`)

### Current section order

1. Hero
2. Cover image
3. Intro text
4. Repeatable content sections
5. Conclusion
6. Back link

### CMS field map

This is already close to a CMS article model.

- article_title
- article_intro
- cover_image
- author_name
- publish_date
- sections[]
  - heading
  - text
  - image
- conclusion

Additional page chrome that should move to CMS settings:

- badge_text
- back_link_label
- article_hero_excerpt_length behavior if desired

## Contact Page (`/contact`)

### Current section order

1. Hero / left content column
2. Trusted logos strip
3. Contact form panel
4. Final CTA

### CMS field map

#### Hero Copy

- section_name: `contact_hero`
- kicker
- heading
- body
- trust_statement
- logos[]
  - name
  - image
  - url

#### Contact Form Configuration

- section_name: `contact_form`
- form_title
- field_labels
- placeholders
- inquiry_types[]
- success_title
- success_body
- error_title
- error_body
- submit_label
- submitting_label

Note: field submission handling remains application logic, not CMS.

#### Final CTA

- section_name: `contact_final_cta`
- reuse shared final CTA structure

## Legal Page (`/legal`)

### Current section order

1. Hero
2. Tab switcher
3. Last updated text
4. Table of contents
5. Legal sections list
6. Contact block

### CMS field map

This page should be treated as a specialized legal-content domain inside CMS.

#### Hero

- section_name: `legal_hero`
- privacy_badge_text
- terms_badge_text
- privacy_heading
- terms_heading
- privacy_summary
- terms_summary
- tab_labels[]

#### Legal Documents

- section_name: `legal_documents`
- privacy_last_updated
- terms_last_updated
- privacy_sections[]
  - title
  - paragraphs[]
- terms_sections[]
  - title
  - paragraphs[]

#### Legal Contact Block

- section_name: `legal_contact`
- heading
- body
- cta_label
- cta_url

## Proposed CMS Hierarchy

```text
CMS
├ Global
│ ├ Site Settings
│ ├ SEO Defaults
│ ├ Navigation
│ ├ Footer
│ └ Shared Assets
├ Home
│ ├ Hero
│ ├ Leaderboard Widget
│ ├ Trusted By
│ ├ Understanding H-Index
│ ├ Transparency
│ ├ Pricing Preview
│ ├ Research Intelligence
│ └ Final CTA
├ About
│ ├ Hero
│ ├ Image Collage
│ ├ Who We Are
│ ├ Feature Visual
│ ├ Team Grid
│ ├ Reasons List
│ ├ FAQ
│ └ CTA Banner
├ Pricing
│ ├ Hero Pricing
│ ├ Comparison Tables
│ ├ FAQ
│ └ Final CTA
├ Methodology
│ ├ Hero
│ ├ Trusted By
│ ├ Big Card
│ ├ Narrative Split
│ ├ Resource Blocks
│ ├ FAQ
│ └ Final CTA
├ Leaderboards
│ ├ Hub
│ │ ├ Hero
│ │ ├ Widget
│ │ ├ Three Cards
│ │ ├ Consultancy
│ │ ├ Three Blocks
│ │ ├ FAQ
│ │ └ Final CTA
│ ├ Scholars Template
│ ├ Universities Template
│ └ Doctors Template
├ Blog
│ ├ Listing Hero
│ ├ Listing Controls
│ ├ Grid Chrome
│ ├ FAQ
│ ├ Final CTA
│ └ Article Model
├ Contact
│ ├ Hero Copy
│ ├ Logos
│ ├ Form Configuration
│ └ Final CTA
└ Legal
  ├ Hero
  ├ Tabs
  ├ Privacy Document
  ├ Terms Document
  └ Contact Block
```

## Hardcoded Content That Must Move Into CMS

### Text content

- All page hero headings, subheadings, badge labels, CTA labels, and button text
- All SEO titles, descriptions, and keywords currently declared in page files
- All FAQ questions and answers
- All pricing plan titles, descriptions, feature lists, and table rows
- All transparency, methodology, about-page, and leaderboard marketing copy
- All contact form labels, placeholders, and success/error copy
- All footer link labels and copyright text
- All legal document paragraphs and section titles

### Images and media

- Site hero backgrounds
- Home and about page image placeholders and banner assets
- CTA banner image
- Trusted-by logos
- Team member images
- Transparency card images
- Resource card images
- Blog fallback image
- Any icons that should be brand-controlled instead of hardcoded

### Layout-configurable blocks

- Section order per page
- Visibility toggles per section
- Card counts and repeatable list items
- Tab labels and tab content blocks
- Comparison tables and matrix rows

## Components And Files That Need To Become Dynamic

## Existing admin CMS

- `app/(admin)/admin-overview/cms/page.tsx`
  - currently manages blogs only
  - must be expanded into page -> section -> field editing
  - should support page selection dropdown and section navigation like the screenshot

## Global layout and chrome

- `app/(site)/layout.tsx`
- `components/layout/Navbar.tsx`
- `components/layout/Footer.tsx`

## Page shells with hardcoded copy

- `app/(site)/page.tsx`
- `app/(site)/about/page.tsx`
- `app/(site)/pricing/page.tsx`
- `app/(site)/methodology/page.tsx`
- `app/(site)/leaderboard/page.tsx`
- `app/(site)/leaderboard/scholars/page.tsx`
- `app/(site)/leaderboard/universities/page.tsx`
- `app/(site)/leaderboard/doctors/page.tsx`
- `app/(site)/contact/page.tsx`
- `app/(site)/legal/page.tsx`
- `app/(site)/blog/page.tsx`

## Shared site components with embedded content arrays

- `components/site/SiteHero.tsx`
- `components/site/TrustedBy.tsx`
- `components/site/UnderstandingHIndex.tsx`
- `components/site/TransparencySection.tsx`
- `components/site/PricingSection.tsx`
- `components/site/ResearchIntelligence.tsx`
- `components/site/FinalCTA.tsx`
- `components/site/FAQSection.tsx`
- `components/site/LeaderboardWidget.tsx`
- `components/site/LeaderboardTable.tsx`

## Leaderboard-specific marketing sections

- `app/(site)/leaderboard/components/ThreeCardsSection.tsx`
- `app/(site)/leaderboard/components/ConsultancySection.tsx`
- `app/(site)/leaderboard/components/ThreeBlocksSection.tsx`
- `app/(site)/leaderboard/components/LeaderboardFinalCTA.tsx`
- `app/(site)/leaderboard/components/TabContentToggle.tsx`

## Methodology-specific sections

- `app/(site)/methodology/components/Thebigcard.tsx`
- `app/(site)/methodology/components/Rightcard.tsx`

## Already partially dynamic and should remain domain-driven

- `app/(site)/blog/[slug]/page.tsx`
  - article content already structured
  - page wrapper strings can still move to CMS settings

## Reusable Component Strategy

The CMS should not create a unique React component for every page.

It should drive a reusable library of section components.

Recommended reusable section types:

- `hero`
- `logo_marquee`
- `cards_grid`
- `feature_list`
- `faq`
- `cta_banner`
- `comparison_table`
- `tabbed_content`
- `image_split`
- `rich_text_block`
- `leaderboard_shell`
- `legal_document`

## Estimated Backend APIs Required Later

These are not to be implemented in Phase 1, but they define the backend scope.

### Public read APIs

- `GET /api/cms/site-settings`
- `GET /api/cms/navigation`
- `GET /api/cms/footer`
- `GET /api/cms/page/:slug`
- `GET /api/cms/page/:slug/preview`
- `GET /api/cms/shared-sections/:key`

### Admin CMS APIs

- `GET /api/admin/cms/pages`
- `GET /api/admin/cms/pages/:id`
- `POST /api/admin/cms/pages`
- `PUT /api/admin/cms/pages/:id`
- `DELETE /api/admin/cms/pages/:id`
- `POST /api/admin/cms/pages/:id/publish`
- `POST /api/admin/cms/pages/:id/unpublish`
- `POST /api/admin/cms/sections`
- `PUT /api/admin/cms/sections/:id`
- `DELETE /api/admin/cms/sections/:id`
- `POST /api/admin/cms/assets/upload`
- `GET /api/admin/cms/assets`

### Domain content that should stay separate

- blogs API remains separate or is integrated later as a specialized CMS content type
- leaderboard ranking APIs remain separate from CMS
- contact submission API remains separate from CMS content APIs

## Database Tables Needed For CMS

This should fit the current Prisma-based project.

### Core tables

#### `cms_pages`

- id
- slug
- title
- page_type
- status
- seo_title
- seo_description
- seo_keywords
- og_title
- og_description
- og_image_asset_id
- created_at
- updated_at
- published_at

#### `cms_sections`

- id
- page_id
- section_key
- section_type
- title
- sort_order
- is_visible
- settings_json
- created_at
- updated_at

#### `cms_section_items`

- id
- section_id
- item_key
- sort_order
- content_json
- created_at
- updated_at

#### `cms_assets`

- id
- file_name
- file_url
- alt_text
- mime_type
- width
- height
- file_size
- created_at

#### `cms_site_settings`

- id
- setting_key
- setting_value_json
- updated_at

### Recommended workflow tables

#### `cms_revisions`

- id
- page_id
- revision_number
- snapshot_json
- created_by
- created_at

#### `cms_navigation_items`

- id
- location
- label
- url
- parent_id
- sort_order
- metadata_json

#### `cms_redirects`

- id
- from_path
- to_path
- is_permanent

## Recommended Data Modeling Rule

Use a section-based page builder with typed section templates.

Avoid a fully generic key-value CMS.

Reason:

- this codebase already has recognizable section patterns
- the admin UI screenshot is section-oriented
- typed sections will keep frontend rendering predictable
- Prisma queries stay simpler than a deeply abstract EAV model

Recommended approach:

- page metadata in `cms_pages`
- section order and visibility in `cms_sections`
- repeatable cards, FAQs, tabs, table rows, and logos in `cms_section_items`
- flexible per-section options in JSON columns

## Implementation Priorities For Phase 2 And Beyond

### Priority 1

- global navigation and footer
- home page
- about page
- pricing page
- final CTA and FAQ shared components

### Priority 2

- methodology page
- leaderboard hub and leaderboard detail templates
- contact page content configuration

### Priority 3

- legal page migration
- unify blog listing chrome with CMS settings
- optionally migrate blog articles into the broader CMS model

## Key Findings

- The existing admin CMS is not a site CMS yet. It is a blog manager only.
- Most public marketing content is hardcoded inside page files and shared components.
- Many shared components contain embedded arrays that should become repeatable CMS lists.
- SEO metadata is hardcoded per page and should be included in CMS scope.
- Leaderboard records are application data, but the surrounding page copy and section layout should be CMS-controlled.
- Several public sections still contain placeholder or lorem ipsum content. Those should still be modeled in CMS so they can be replaced without code edits.

## Deliverable Summary

This analysis produces:

- complete public route inventory
- section-by-section content mapping
- proposed CMS hierarchy aligned to the current admin UX direction
- list of frontend files that must become dynamic
- estimated future APIs
- proposed CMS database tables

This is sufficient to begin Phase 2 backend and admin planning without guessing the public content surface area.