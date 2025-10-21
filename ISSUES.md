# GitHub Issues from Codebase Review

This document contains all the issues identified in the codebase review. You can create these manually or use GitHub's issue import features.

---

## Issue 1: 🚨 Critical: Implement contact form submission handler

**Labels**: `bug`, `priority:high`, `backend`

### Problem
The contact form at `/contact` has `method="POST"` but no backend handler configured. Form submissions will currently fail.

### Files Affected
- `src/pages/contact.astro` (lines 20-96)

### Impact
- **Severity**: High
- Users cannot submit contact forms
- Primary lead generation mechanism is non-functional

### Proposed Solution
Implement one of the following:
1. **Astro API Route**: Create `src/pages/api/contact.ts` endpoint
2. **Netlify Forms**: Add `netlify` attribute to form
3. **Vercel**: Use serverless function
4. **External Service**: Integrate with FormSpree, Basin, or similar

### Acceptance Criteria
- [ ] Form successfully submits data
- [ ] Server-side validation implemented
- [ ] Error handling with user feedback
- [ ] Success/error messages displayed
- [ ] Form data sent to appropriate destination (email/CRM)
- [ ] Spam protection added (honeypot or reCAPTCHA)

### Additional Context
Form currently collects: name, email, company, phone, project-type, budget, timeline, message

---

## Issue 2: 🚨 Critical: Create missing content collection files

**Labels**: `content`, `priority:high`

### Problem
Content collections for `team` and `services` are defined in the schema but have no content files. Pages attempting to fetch these collections display empty results.

### Files Affected
- `src/content/config.ts` (schemas defined at lines 20-33, 35-47)
- `src/content/team/` - directory exists but is empty
- `src/content/services/` - directory exists but is empty

### Pages Impacted
- `src/pages/index.astro` (line 14) - attempts to fetch team
- `src/pages/about.astro` (line 9) - attempts to fetch services and team

### Impact
- **Severity**: High
- Homepage team section is empty
- About page services and team sections are empty
- Content collections architecture is incomplete

### Proposed Solution
Create MDX files for:

#### Team Members
- Add files in `src/content/team/`
- Follow schema: name, role, bio, image, email, linkedin, twitter, expertise, featured
- Example: `john-doe.mdx`

#### Services
- Add files in `src/content/services/`
- Follow schema: title, description, shortDescription, icon, featured, order, relatedCaseStudies, relatedServices
- Example: `product-design.mdx`, `user-experience.mdx`

### Acceptance Criteria
- [ ] At least 3-5 team member files created
- [ ] All service offerings documented (currently hard-coded in ServicesList.astro)
- [ ] Featured flags set appropriately
- [ ] Images added to `public/images/team/`
- [ ] Homepage displays team members
- [ ] About page displays services and team

---

## Issue 3: 📄 Complete legal pages content

**Labels**: `content`, `priority:medium`, `legal`

### Problem
All three legal pages contain placeholder comments instead of actual content.

### Files Affected
- `src/pages/legal/privacy-statement.astro` (line 19)
- `src/pages/legal/equality-and-diversity-policy.astro` (line 19)
- `src/pages/legal/carbon-reduction.astro` (line 19)

All contain: `<!-- content will go here -->`

### Impact
- **Severity**: Medium-High
- Legal compliance issues
- Incomplete user-facing content
- Footer links lead to empty pages

### Proposed Solution
Add complete content for:
1. **Privacy Statement**: GDPR-compliant privacy policy
2. **Equality & Diversity Policy**: Company commitment and practices
3. **Carbon Reduction**: Environmental commitments and initiatives

### Acceptance Criteria
- [ ] Privacy statement complete with all required sections
- [ ] Equality & diversity policy documented
- [ ] Carbon reduction plan documented
- [ ] Legal review completed (if required)
- [ ] All placeholder comments removed

### Resources
Consider using templates or consulting legal counsel for privacy statement.

---

## Issue 4: ♻️ Refactor: Make ServicesList dynamic from content collection

**Labels**: `refactor`, `priority:medium`, `technical-debt`

### Problem
Services are hard-coded in `ServicesList.astro` instead of being fetched from the services content collection.

### Files Affected
- `src/components/ServicesList.astro` (lines 9-24)

### Current Implementation
```astro
<div class="service-item service-item--fade-5">Product Design</div>
<div class="service-item service-item--fade-4">User Experience</div>
<!-- ... more hard-coded items -->
```

### Impact
- **Severity**: Medium
- Violates DRY principle
- Changes to services require code edits instead of content updates
- Inconsistent with content collection architecture
- Color mappings are hard-coded

### Proposed Solution
1. Fetch services from content collection
2. Map services to display items dynamically
3. Support `order` field for sequencing
4. Preserve fade effect styling
5. Make color mapping configurable

### Acceptance Criteria
- [ ] Component fetches from `getCollection('services')`
- [ ] Services sorted by `order` field
- [ ] Fade effect preserved
- [ ] Current service highlighting works
- [ ] No hard-coded service names
- [ ] Tests added for component

### Dependencies
Requires services content collection to be populated (see Issue #2)

---

## Issue 5: 🎨 Fix hard-coded colors to use CSS variables

**Labels**: `css`, `design-system`, `priority:medium`

### Problem
`ServicesList.astro` uses hard-coded hex colors instead of CSS token variables, breaking design system consistency.

### Files Affected
- `src/components/ServicesList.astro` (lines 44-57)

### Current Implementation
```css
.service-item--fade-5 { color: #e8c352; }
.service-item--fade-4 { color: #d67e4b; }
.service-item--fade-3 { color: #c74043; }
.service-item--fade-2 { color: #bd2f56; }
.service-item--fade-1 { color: #a7326a; }
```

### Impact
- **Severity**: Medium
- Breaks design system consistency
- Theme support incomplete for this component
- Hard to maintain color palette
- Colors don't match design tokens

### Proposed Solution
Update to use CSS variables from `tokens.css`:
```css
.service-item--fade-5 { color: var(--color-yellow-500); }
.service-item--fade-4 { color: var(--color-orange-500); }
.service-item--fade-3 { color: var(--color-red-500); }
.service-item--fade-2 { color: var(--color-burgundy-500); }
.service-item--fade-1 { color: var(--color-coral-500); }
```

### Acceptance Criteria
- [ ] All hard-coded colors replaced with CSS variables
- [ ] Visual appearance unchanged
- [ ] Design tokens documented for this use case
- [ ] Component supports theme variants

### Related
Design system tokens defined in `src/styles/tokens.css`

---

## Issue 6: ♻️ Refactor: ImageGallery hard-coded positioning

**Labels**: `refactor`, `css`, `priority:medium`, `technical-debt`

### Problem
`ImageGallery.astro` uses 30+ lines of hard-coded pixel positions that are difficult to maintain and not truly responsive.

### Files Affected
- `src/components/ImageGallery.astro` (lines 84-177)

### Current Implementation
```css
.image-gallery--a .image-gallery__item--1 {
  left: 0;
  top: 45.61px;
  width: 344.121px;
  height: 362.782px;
}
/* ... 30+ more rules */
```

### Impact
- **Severity**: Medium
- Brittle design - breaks with content changes
- Not responsive (only scales)
- Difficult to maintain
- Violates design system principles
- Hard to add new layout variants

### Proposed Solution
Refactor to use modern CSS layout:
1. **Option A**: CSS Grid with named areas
2. **Option B**: Flexbox with configurable gaps
3. **Option C**: CSS Grid with auto-fit/auto-fill

Benefits:
- Truly responsive
- Easier to maintain
- More flexible
- Better browser support for dynamic content

### Acceptance Criteria
- [ ] Remove all hard-coded pixel positions
- [ ] Use CSS Grid or Flexbox
- [ ] Maintain visual appearance on desktop
- [ ] Improve mobile responsiveness
- [ ] Support dynamic number of images
- [ ] Add documentation for layout variants

### Additional Context
3 layout variants currently exist (a, b, c) - consider if all are needed or if one flexible layout would suffice.

---

## Issue 7: 🛡️ Add error handling and fallback UI

**Labels**: `enhancement`, `error-handling`, `priority:medium`

### Problem
The codebase lacks error handling in several critical areas, leading to poor user experience when things fail.

### Areas Affected

#### 1. Lottie Component
- **File**: `src/components/Lottie.astro` (lines 37-78)
- **Issue**: No error handling if JSON fails to load
- **Impact**: White screen or console errors

#### 2. Content Collection Fetches
- **Files**: Multiple pages fetching collections
- **Issue**: No error boundaries in layouts
- **Impact**: Build failures or empty pages

#### 3. Form Validation
- **File**: `src/pages/contact.astro`
- **Issue**: HTML5 validation only, no JavaScript feedback
- **Impact**: Poor user experience on validation errors

#### 4. Image Loading
- **Files**: Various components with images
- **Issue**: No fallback for missing images
- **Impact**: Broken image icons

### Proposed Solutions

#### Lottie Component
```typescript
try {
  lottie.loadAnimation({...});
} catch (error) {
  // Show fallback image or message
  console.error('Failed to load animation:', error);
}
```

#### Error Boundaries
- Add ErrorBoundary component for layouts
- Graceful degradation for missing content
- Informative error messages in dev mode

#### Form Validation
- Client-side validation with clear feedback
- `role="alert"` for error messages
- Field-level validation
- Accessibility-friendly error display

### Acceptance Criteria
- [ ] Lottie component has try-catch and fallback
- [ ] Form has client-side validation feedback
- [ ] Missing images show placeholder or fallback
- [ ] Error boundaries added to layouts
- [ ] Console errors logged appropriately
- [ ] User-friendly error messages (no stack traces in prod)

### Impact
- **Severity**: Medium
- Better user experience
- Easier debugging
- More robust application

---

## Issue 8: 🧪 Add testing infrastructure and tests

**Labels**: `testing`, `priority:medium`, `infrastructure`

### Problem
The project has no testing infrastructure, making it difficult to verify component behavior and prevent regressions.

### Current State
- No test files or directories
- No testing libraries in `package.json`
- No test configuration
- No CI/CD test runs

### Impact
- **Severity**: Medium
- Component behavior not verified
- Easy to introduce regressions
- No confidence in refactoring
- Manual testing required for all changes

### Proposed Solution

#### Phase 1: Unit Testing
**Library**: Vitest (recommended for Astro)

**Setup**:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

**Initial Tests**:
- [ ] Button component variants
- [ ] CaseStudyCard rendering
- [ ] Section component variants
- [ ] MediaBlock type switching
- [ ] Content collection queries

#### Phase 2: E2E Testing
**Library**: Playwright

**Setup**:
```bash
npm install -D @playwright/test
```

**Initial Tests**:
- [ ] Homepage loads and displays content
- [ ] Navigation works (all pages)
- [ ] Contact form validation
- [ ] Case study navigation
- [ ] Mobile menu functionality

#### Phase 3: CI/CD Integration
- [ ] GitHub Actions workflow for tests
- [ ] Pre-commit hooks with tests
- [ ] Coverage reporting

### Acceptance Criteria
- [ ] Vitest configured and working
- [ ] At least 10 unit tests written
- [ ] Playwright configured
- [ ] At least 5 E2E tests written
- [ ] Tests run in CI/CD
- [ ] Coverage threshold set (target: 60%+)
- [ ] Test documentation in README

### File Structure
```
src/
  __tests__/
    components/
      Button.test.ts
      CaseStudyCard.test.ts
    pages/
      index.test.ts
tests/
  e2e/
    navigation.spec.ts
    contact-form.spec.ts
```

### Resources
- [Astro Testing Guide](https://docs.astro.build/en/guides/testing/)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)

---

## Issue 9: ♿ Accessibility improvements

**Labels**: `accessibility`, `priority:medium`, `a11y`

### Problem
While the codebase has good accessibility foundations, there are several gaps that need addressing for WCAG 2.1 AA compliance.

### Issues Identified

#### 1. Hero SVG Lacks Description
- **File**: `src/components/Hero.astro`
- **Issue**: SVG gradient lacks `<title>` or `aria-label`
- **Fix**: Add descriptive title for screen readers

#### 2. ImageGallery Positioned Images
- **File**: `src/components/ImageGallery.astro`
- **Issue**: No semantic alt text strategy for positioned images
- **Fix**: Add meaningful alt text or `aria-label`

#### 3. Form Error Messages
- **File**: `src/pages/contact.astro`
- **Issue**: No `role="alert"` for error messages
- **Fix**: Add ARIA live regions for validation feedback

#### 4. Button Icon Always Rendered
- **File**: `src/components/Button.astro`
- **Issue**: Icon always present, may confuse screen reader users
- **Fix**: Make icon optional, add `aria-hidden="true"`

#### 5. Focus Management
- **File**: `src/components/Navbar.astro`
- **Issue**: Mobile menu could improve focus trap
- **Fix**: Add focus trap when menu is open

#### 6. Skip to Content Link
- **All Pages**: Missing skip navigation link
- **Fix**: Add skip link in BaseLayout

### Proposed Solutions

#### Skip Link
```astro
<a href="#main-content" class="skip-link">Skip to main content</a>
<main id="main-content">...</main>
```

#### SVG Accessibility
```astro
<svg aria-labelledby="hero-graphic-title">
  <title id="hero-graphic-title">Decorative gradient background</title>
  ...
</svg>
```

#### Form ARIA Live Region
```astro
<div role="alert" aria-live="assertive" class="error-message">
  {errorMessage}
</div>
```

### Acceptance Criteria
- [ ] All images have meaningful alt text
- [ ] SVGs have titles or aria-labels
- [ ] Form errors announced to screen readers
- [ ] Focus management works in mobile menu
- [ ] Skip to content link added
- [ ] Keyboard navigation tested
- [ ] Screen reader tested (NVDA/JAWS/VoiceOver)
- [ ] Color contrast verified (WCAG AA)
- [ ] Lighthouse accessibility score 90+

### Testing Tools
- axe DevTools browser extension
- Lighthouse audit
- WAVE browser extension
- Screen reader testing

### Resources
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Astro Accessibility Guide](https://docs.astro.build/en/guides/accessibility/)

---

## Issue 10: ⚡ Image optimization and performance improvements

**Labels**: `performance`, `optimization`, `priority:low`

### Problem
Case study images are large, unoptimized PNG files. The build configuration lacks optimization settings.

### Current State
- Large PNG files in `public/images/case-studies/`
- No image optimization in build
- No responsive image sizes
- Minimal `astro.config.mjs` configuration

### Impact
- **Severity**: Medium
- Slower page loads
- Higher bandwidth usage
- Poor mobile performance
- Lower Lighthouse scores

### Proposed Solutions

#### 1. Use Astro Image Component
Replace standard `<img>` tags with Astro's `<Image>` component:

```astro
import { Image } from 'astro:assets';
import heroImage from '../images/case-studies/hero.png';

<Image src={heroImage} alt="..." />
```

Benefits:
- Automatic optimization
- Multiple format support (WebP, AVIF)
- Responsive srcset generation
- Lazy loading

#### 2. Configure Image Optimization
Update `astro.config.mjs`:
```javascript
export default defineConfig({
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  integrations: [mdx(), react(), icon()],
});
```

#### 3. Optimize Existing Images
- Convert large PNGs to WebP/AVIF
- Create multiple size variants
- Compress images (target: <200KB per image)

#### 4. Add Build Optimizations
```javascript
export default defineConfig({
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssCodeSplit: true,
      minify: 'terser',
    }
  }
});
```

### Files to Update
- [ ] `src/components/MediaBlock.astro` - use Image component
- [ ] `src/components/CaseStudyCard.astro` - use Image component
- [ ] `src/components/Hero.astro` - optimize SVG
- [ ] `astro.config.mjs` - add optimization config
- [ ] All MDX files - update image imports

### Acceptance Criteria
- [ ] Astro Image component implemented
- [ ] All large images optimized (<200KB)
- [ ] WebP/AVIF formats generated
- [ ] Responsive image sizes configured
- [ ] Lazy loading working
- [ ] Lighthouse performance score 90+
- [ ] Page load time reduced by 30%+

### Additional Optimizations
- [ ] Add compression (gzip/brotli)
- [ ] Configure caching headers
- [ ] Optimize font loading
- [ ] Bundle size analysis
- [ ] Critical CSS inlining

### Resources
- [Astro Images Guide](https://docs.astro.build/en/guides/images/)
- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)

---

## Issue 11: 📚 Add inline documentation and JSDoc comments

**Labels**: `documentation`, `priority:low`, `developer-experience`

### Problem
Components lack inline documentation and JSDoc comments, making it difficult for new developers to understand complex logic.

### Current State
- No JSDoc comments in components
- Complex logic undocumented (e.g., ImageGallery positioning)
- No usage examples for components
- Only external documentation in CLAUDE.md

### Impact
- **Severity**: Low
- Harder onboarding for new developers
- Unclear component APIs
- No IDE autocomplete hints
- Maintenance difficulty

### Proposed Solution

#### Add JSDoc to All Components
```typescript
/**
 * A flexible media block component that supports images, videos, Lottie animations, and Rive files.
 *
 * @component
 * @example
 * ```astro
 * <MediaBlock
 *   type="image"
 *   src="/images/example.jpg"
 *   alt="Example image"
 *   layout="full"
 * />
 * ```
 */
interface Props {
  /** Type of media to display */
  type: 'image' | 'video' | 'lottie' | 'rive';
  /** Source path for the media file */
  src: string;
  /** Layout variant - full width, contained, or wide */
  layout?: 'full' | 'contained' | 'wide';
  /** Optional caption text */
  caption?: string;
  /** Alt text for images (required for accessibility) */
  alt?: string;
}
```

### Files Needing Documentation

#### High Priority
- [ ] `src/components/MediaBlock.astro` - complex type handling
- [ ] `src/components/ImageGallery.astro` - layout positioning logic
- [ ] `src/components/Lottie.astro` - initialization logic
- [ ] `src/components/Section.astro` - variant system
- [ ] `src/layouts/CaseStudyLayout.astro` - navigation logic

#### Medium Priority
- [ ] `src/components/Button.astro`
- [ ] `src/components/CaseStudyCard.astro`
- [ ] `src/components/MediaGrid.astro`
- [ ] `src/components/ServicesList.astro`
- [ ] `src/components/Navbar.astro` - mobile menu logic

#### Low Priority
- [ ] `src/components/Hero.astro`
- [ ] `src/components/Footer.astro`
- [ ] `src/components/Logo.astro`
- [ ] `src/components/TextBlock.astro`

### Documentation Standards

#### Component Documentation Should Include
1. **Description**: What the component does
2. **Props**: Type, description, default value
3. **Examples**: Common usage patterns
4. **Notes**: Important implementation details
5. **Related**: Links to related components

#### Complex Logic Documentation
- Add inline comments explaining "why" not "what"
- Document magic numbers and calculations
- Explain workarounds and browser hacks

### Acceptance Criteria
- [ ] All components have JSDoc comments
- [ ] All props documented with types and descriptions
- [ ] Usage examples provided for complex components
- [ ] Complex logic has inline explanatory comments
- [ ] README updated with component documentation link

### Additional Benefits
- Better IDE autocomplete
- Automatic documentation generation potential
- Easier code reviews
- Better maintainability

### Tools
Consider adding:
- TypeDoc for automatic documentation generation
- Storybook for component documentation and testing

---

## Issue 12: 🔧 Set up development tooling (linting, formatting, pre-commit hooks)

**Labels**: `tooling`, `developer-experience`, `priority:low`

### Problem
The project lacks development tooling for code quality and consistency.

### Current State
- No ESLint configuration
- No Prettier configuration
- No pre-commit hooks
- No linting scripts in package.json
- No formatting scripts

### Impact
- **Severity**: Low
- Inconsistent code style
- No automatic error detection
- Harder to maintain code quality
- Manual formatting required

### Proposed Solution

#### 1. Add ESLint
```bash
npm install -D eslint eslint-plugin-astro @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

**Configuration** (`.eslintrc.cjs`):
```javascript
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:astro/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};
```

#### 2. Add Prettier
```bash
npm install -D prettier prettier-plugin-astro
```

**Configuration** (`.prettierrc.json`):
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "plugins": ["prettier-plugin-astro"]
}
```

#### 3. Add Husky for Pre-commit Hooks
```bash
npm install -D husky lint-staged
npx husky init
```

**Configuration** (`.husky/pre-commit`):
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

**lint-staged config** (package.json):
```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,astro}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,css}": [
      "prettier --write"
    ]
  }
}
```

#### 4. Update package.json Scripts
```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.ts,.astro",
    "lint:fix": "eslint . --ext .js,.ts,.astro --fix",
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,astro,json,md,css}\"",
    "format:check": "prettier --check \"**/*.{js,jsx,ts,tsx,astro,json,md,css}\""
  }
}
```

### Acceptance Criteria
- [ ] ESLint configured and working
- [ ] Prettier configured and working
- [ ] Husky pre-commit hooks set up
- [ ] lint-staged configured
- [ ] All existing code passes linting
- [ ] All existing code formatted consistently
- [ ] Scripts added to package.json
- [ ] Documentation updated in README
- [ ] CI/CD runs linting checks

### Additional Tools to Consider
- [ ] Stylelint for CSS
- [ ] CommitLint for commit message standards
- [ ] Markdownlint for markdown files

### Configuration Files to Create
- [ ] `.eslintrc.cjs`
- [ ] `.prettierrc.json`
- [ ] `.prettierignore`
- [ ] `.husky/pre-commit`
- [ ] `.lintstagedrc.json`

### Resources
- [ESLint Astro Plugin](https://github.com/ota-meshi/eslint-plugin-astro)
- [Prettier Astro Plugin](https://github.com/withastro/prettier-plugin-astro)
- [Husky Documentation](https://typicode.github.io/husky/)

---

## Summary

**Total Issues**: 12

### By Priority
- **High**: 2 issues (Contact form, Missing content collections)
- **Medium**: 7 issues (Legal pages, ServicesList refactor, CSS variables, ImageGallery, Error handling, Testing, Accessibility)
- **Low**: 3 issues (Image optimization, Documentation, Tooling)

### By Category
- **Critical/Bugs**: 2
- **Content**: 2
- **Refactoring**: 2
- **Enhancement**: 5
- **Infrastructure**: 3

### Recommended Order
1. Issue #1 - Contact form handler (blocks lead generation)
2. Issue #2 - Content collections (blocks homepage/about functionality)
3. Issue #3 - Legal pages (compliance)
4. Issue #5 - CSS variables (quick fix, design system compliance)
5. Issue #7 - Error handling (user experience)
6. Issue #4 - ServicesList refactor (after Issue #2)
7. Issue #9 - Accessibility (compliance)
8. Issue #8 - Testing (prevents regressions)
9. Issue #6 - ImageGallery refactor (tech debt)
10. Issue #10 - Image optimization (performance)
11. Issue #12 - Dev tooling (code quality)
12. Issue #11 - Documentation (long-term maintainability)
