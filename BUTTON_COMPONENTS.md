# Button Components Library

## Overview

This document outlines the button patterns discovered across the Nationcite project and the reusable components created for future use.

## Discovered Button Patterns

### 1. **Primary Orange CTA Button**

- **Colors**: Orange background (#FF7A00), white text
- **Border Radius**: 11px (rounded-xl) or 8px (rounded-lg)
- **Padding**: px-6 py-2 or px-2 py-1.5
- **Shadow**: `shadow-lg shadow-orange-200`
- **Hover**: bg-[#E66A00], bg-[#ff8c1a], or bg-[#e66e00]
- **Found In**:
  - Home page (Leaderboard button)
  - ResearchIntelligence component
  - LeaderboardFinalCTA component
  - Methodology page
  - ConsultancySection
- **Uses**: Main CTAs, primary action buttons

### 2. **Dark Gray/Black Button**

- **Colors**: Dark gray/black (#1E1E1E) background, white text
- **Border Radius**: 7px (rounded-[7px]) or 8px (rounded-lg)
- **Padding**: px-2 py-1.5 or px-6 py-3
- **Shadow**: `shadow-sm`
- **Hover**: bg-black
- **Found In**:
  - FinalCTA component (Request Institution Dashboard, Claim Your Profile)
  - LeaderboardFinalCTA component
- **Uses**: Secondary CTAs, institution-focused buttons

### 3. **Secondary White Button with Border**

- **Colors**: White background, dark text (#1E1E1E)
- **Border**: border border-gray-300
- **Border Radius**: rounded-xl
- **Padding**: px-4 py-2
- **Hover**: bg-gray-50
- **Found In**:
  - Home page (Methodology button)
- **Uses**: Secondary action, outline-style buttons

### 4. **Pagination/Control Buttons**

- **Colors**: White background with text (#FF7A00) or slate-500
- **Border Radius**: rounded-md or rounded-lg
- **Size**: w-8 h-8 or w-9 h-9 (small square buttons)
- **Shadow**: shadow-sm
- **Found In**:
  - LeaderboardTable pagination
  - Tab controls
- **Uses**: Navigation, pagination, small controls

### 5. **Badge/Tag-style Button**

- **Colors**: Orange background (#FFF5EB), orange text (#FF7A00)
- **Border**: border border-[#FFD6B3]
- **Border Radius**: 8px (rounded-[8px])
- **Padding**: px-4 py-1
- **Size**: text-sm
- **Found In**:
  - FinalCTA component (CTA Section badge)
- **Uses**: Label badges, CTA labels

## Recommended Component Variants

### Button Types

1. **PrimaryButton** - Orange CTA button (already exists)
2. **SecondaryButton** - Dark/black button for secondary actions
3. **OutlineButton** - White with border for tertiary actions
4. **SmallButton** - Pagination and small control buttons
5. **BadgeButton** - Tag/label style buttons

## Button Size Standards

- **Small**: px-4 py-2, text-sm
- **Medium**: px-6 py-3, text-base
- **Large**: px-8 py-3, text-lg

## Border Radius Standards

- **Extra Small**: 6px (rounded-[6px])
- **Small**: 7px-8px (rounded-[7px], rounded-[8px])
- **Medium**: 11px (rounded-xl)
- **Large**: 16px+ (rounded-2xl)

## Implementation Notes

- All buttons use `font-inter` for consistency
- Hover states should include transition-colors or transition-all
- Maintain shadow styles as specified for depth
- Consider accessibility (focus states, proper text contrast)
- All buttons should support onClick handlers and optional href for links
