# Mobile Typography Hierarchy Guide

## Overview

This document defines the **5-level mobile typography hierarchy** for NationCite. The hierarchy ensures consistent, readable typography across all pages and sections on mobile screens, preventing competing text sizes and maintaining clear visual hierarchy.

**Key Principle:** Mobile-first approach — define baseline sizes for mobile (`text-*`), then scale up for larger screens (`sm:`, `md:`, `lg:`).

---

## Typography Hierarchy Levels

### Level 1 – Primary Section Title

**Purpose:** Most prominent text in a section (e.g., "Understanding the H-Index")

**When to use:**

- Main section headings
- Page hero titles
- Large, prominent page titles

**Mobile Sizes:**

- `text-2xl` = **24px**
- `text-3xl` = **30px**
- `text-4xl` = **36px**
- `text-5xl` = **48px**

**Tailwind CSS (Example):**

```tsx
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1E1E1E]">
  Section Title
</h1>
```

**Notes:**

- Usually remains unchanged (global/section-level)
- Keep existing styling for h1–h6 tags
- Font weight: `font-bold` or `font-semibold`

---

### Level 3 – Component / Card Title

**Purpose:** Titles inside cards, accordions, expandable rows, feature blocks

**When to use:**

- Card titles (inside card components)
- Accordion question/title text
- Feature block titles
- Sub-section headings within components

**Mobile Sizes:**

- `text-base` = **16px** (baseline for L3)
- `text-lg` = **18px**

**Tailwind CSS (Example):**

```tsx
<h5 className="text-base sm:text-base md:text-lg font-semibold text-[#1E1E1E] leading-snug mb-3">
  Card Title
</h5>
```

**Tailwind Components:**

```
text-base sm:text-base md:text-lg
font-semibold (or font-medium)
leading-snug
mb-2 (or mb-3)
text-[#1E1E1E] (dark text for readability)
```

**Notes:**

- Mobile baseline: `text-base` (16px) — makes it clearly smaller than Level 1
- Always `font-semibold` for emphasis
- Use `leading-snug` for tight spacing
- Never use `text-xs` or `text-sm` for card titles on mobile

---

### Level 4 – Description / Body Text

**Purpose:** Paragraphs explaining titles, section descriptions, body content

**When to use:**

- Section description paragraphs
- Card body text
- Explanatory paragraphs
- FAQ answer text
- Blog body text

**Mobile Sizes:**

- `text-sm` = **14px** (baseline for L4)
- `text-base` = **16px** (on larger screens)

**Tailwind CSS (Example):**

```tsx
<p className="text-sm sm:text-base md:text-base text-[#5C5C5C] leading-relaxed mb-4">
  This is a description paragraph that explains the card title.
</p>
```

**Tailwind Components:**

```
text-sm sm:text-base (or sm:text-sm md:text-base)
leading-relaxed
text-[#5C5C5C] (or text-gray-600)
mb-3 (or mb-4)
```

**Notes:**

- Mobile baseline: `text-sm` (14px) — clearly smaller than L3 card titles
- Must be smaller on mobile than card titles to avoid visual hierarchy conflict
- Never use `text-base` as baseline on mobile for body text if cards are `text-base`
- Always use `leading-relaxed` for comfortable reading
- Color should be slightly muted (gray-600 or #5C5C5C)

---

### Level 5 – Supporting / Meta Text

**Purpose:** Helper text, captions, timestamps, badges, secondary explanations

**When to use:**

- Badge labels and helper text
- Timestamps and dates
- "Read More" links
- Small helper or caption text
- Form labels (optional)
- Breadcrumbs

**Mobile Sizes:**

- `text-xs` = **12px** (baseline for L5)

**Tailwind CSS (Example):**

```tsx
<span className="text-xs sm:text-xs md:text-sm font-medium text-[#6B6B6B]">
  Helper text or badge label
</span>
```

**Tailwind Components:**

```
text-xs sm:text-xs md:text-sm
font-medium (optional, for badges)
text-[#6B6B6B] (or text-gray-400)
```

**Notes:**

- Mobile baseline: `text-xs` (12px)
- Lightest color (gray-400 or #6B6B6B)
- Use `font-medium` only if badge or label (not for plain helper text)
- Only use for truly secondary information

---

## Hierarchy Summary (Mobile View)

| Level  | Purpose               | Font Size | Tailwind                            | Example                        |
| ------ | --------------------- | --------- | ----------------------------------- | ------------------------------ |
| **L1** | Section title         | 24–48px   | `text-2xl–5xl`                      | "Understanding the H-Index"    |
| **L3** | Card/component title  | **16px**  | `text-base sm:text-base md:text-lg` | Card title inside component    |
| **L4** | Body/description text | **14px**  | `text-sm sm:text-base md:text-base` | Paragraph, section description |
| **L5** | Meta/supporting text  | **12px**  | `text-xs sm:text-xs md:text-sm`     | Badge label, timestamp, helper |

---

## Common Mistakes to Avoid

❌ **WRONG:** Section description larger than or equal to card title on mobile

```tsx
// BAD: Section description uses text-base while card title also uses text-base
<p className="text-base sm:text-lg">Section Description</p>
<h5 className="text-base">Card Title</h5>
```

✅ **RIGHT:** Section description smaller than card title on mobile

```tsx
// GOOD: Section description is text-sm, card title is text-base
<p className="text-sm sm:text-base">Section Description</p>
<h5 className="text-base sm:text-base md:text-lg">Card Title</h5>
```

---

❌ **WRONG:** Using `p1`, `p2`, `p3` classes without explicit sizes

```tsx
<p className="p1 text-gray-600">Description</p> // p1 might override mobile sizing
```

✅ **RIGHT:** Use explicit Tailwind classes

```tsx
<p className="text-sm sm:text-base text-gray-600 leading-relaxed">
  Description
</p>
```

---

❌ **WRONG:** Card body text too small on mobile

```tsx
<p className="text-xs sm:text-sm">Card body text</p> // text-xs is for meta/badges, not body
```

✅ **RIGHT:** Card body uses Level 4 sizing

```tsx
<p className="text-sm sm:text-base md:text-base">Card body text</p>
```

---

## Full Page Example

```tsx
export default function ExamplePage() {
  return (
    <section className="w-full py-12 md:py-16 px-4 md:px-[120px]">
      <div className="max-w-7xl mx-auto">
        {/* Level 1: Section Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-[#1E1E1E] text-center mb-4">
          Understanding the H-Index
        </h3>

        {/* Level 4: Section Description (smaller on mobile) */}
        <p className="text-sm sm:text-base text-[#5C5C5C] text-center max-w-2xl mx-auto leading-relaxed mb-8">
          The H-Index is more than a number. It reflects consistency, influence,
          and academic credibility. Here&apos;s what it truly represents and why
          it matters.
        </p>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card Component */}
          <div className="bg-white rounded-md sm:rounded-lg border border-gray-200 p-6">
            {/* Level 3: Card Title */}
            <h5 className="text-base sm:text-base md:text-lg font-semibold text-[#1E1E1E] leading-snug mb-3">
              What is the H-Index?
            </h5>

            {/* Level 4: Card Body */}
            <p className="text-sm sm:text-sm md:text-base text-[#5C5C5C] leading-relaxed mb-4">
              It measures both productivity and impact by balancing total
              publications with citation performance.
            </p>

            {/* Level 5: Meta/Helper */}
            <span className="text-xs sm:text-xs md:text-sm font-medium text-[#6B6B6B]">
              Learn more →
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## Spacing & Leading Recommendations

| Level  | Line Height                       | Margin Bottom  | Notes                        |
| ------ | --------------------------------- | -------------- | ---------------------------- |
| **L1** | `leading-tight` or `leading-snug` | `mb-4 md:mb-6` | Tight spacing for prominence |
| **L3** | `leading-snug`                    | `mb-2 md:mb-3` | Compact, clear               |
| **L4** | `leading-relaxed`                 | `mb-3 md:mb-4` | Comfortable reading          |
| **L5** | default                           | `mb-1 md:mb-2` | Minimal spacing              |

---

## Color Recommendations

| Level  | Color Class                         | Hex Value | Usage                  |
| ------ | ----------------------------------- | --------- | ---------------------- |
| **L1** | `text-[#1E1E1E]`                    | #1E1E1E   | Dark, maximum contrast |
| **L3** | `text-[#1E1E1E]`                    | #1E1E1E   | Dark, readable         |
| **L4** | `text-[#5C5C5C]` or `text-gray-600` | #5C5C5C   | Medium gray            |
| **L5** | `text-[#6B6B6B]` or `text-gray-400` | #6B6B6B   | Light gray             |

---

## Mobile Breakpoints Used

- **Mobile (default):** No prefix (e.g., `text-sm`)
- **Small (640px+):** `sm:text-base`
- **Medium (768px+):** `md:text-lg`
- **Large (1024px+):** `lg:text-xl`

**Pattern:** Define mobile baseline, then scale up at each breakpoint.

```tsx
// Example progression
className = "text-sm sm:text-sm md:text-base lg:text-base";
//         ^^^^^^ mobile (14px)
//                      ^^^^^ sm (14px)
//                                 ^^^^^^^^^^ md (16px)
//                                                    ^^^^^^^ lg (16px)
```

---

## Implementation Checklist

When building a new section or component:

- [ ] **L1 (Section Title):** Use existing heading styles; don't modify
- [ ] **L4 (Section Description):** Always `text-sm sm:text-base` on mobile
- [ ] **L3 (Card Titles):** Always `text-base` on mobile, never smaller
- [ ] **L4 (Card Body):** Always `text-sm sm:text-base` on mobile
- [ ] **L5 (Meta/Badges):** Always `text-xs` on mobile
- [ ] Use `leading-relaxed` for all body text (L4)
- [ ] Use `leading-snug` for all titles (L1, L3)
- [ ] Remove `p1`, `p2`, `p3` classes; use explicit Tailwind
- [ ] Test on actual mobile device to verify hierarchy is clear

---

## FAQs

**Q: Why not use `text-base` for section descriptions on mobile?**
A: If card titles are also `text-base`, they won't be visually distinct. By using `text-sm` for descriptions, card titles stand out as more important.

**Q: Can I use `text-lg` on mobile?**
A: Only for Level 1 (section titles). For L3 and below, use the sizes defined above to maintain consistency.

**Q: What if the design looks too small on mobile?**
A: Increase the `sm:` and `md:` sizes, not the mobile baseline. The mobile baseline must maintain hierarchy.

**Q: Should I use `font-medium` or `font-semibold` for L3?**
A: Prefer `font-semibold` for clarity. Use `font-medium` only if the design specifically calls for lighter weight.

---

**Last Updated:** January 2, 2026  
**Author:** Design System / Typography Team
