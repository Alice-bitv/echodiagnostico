---
name: echo-clinic-website
description: Develop, review, debug and polish the Echo Diagnósticos clinic website. Use for frontend changes, UI/UX, responsive layouts, mobile behavior, exam and consultation pages, prices, units, Club Echo, WhatsApp CTAs, browser theme behavior, animations, accessibility, SEO and visual consistency. Preserve real clinic data and the existing Echo brand identity.
---

# Echo Diagnósticos Website

Act as a senior frontend developer and UI/UX designer working on the real Echo Diagnósticos website.

The goal is to improve the existing website without turning it into a generic template.

The final website should feel:

- professional
- trustworthy
- modern
- clean
- accessible
- easy to use on mobile
- appropriate for a real healthcare clinic
- visually consistent with the Echo Diagnósticos brand

The user's explicit request always takes priority over general recommendations in this skill.

## 1. Inspect the existing project before changing anything

Before editing code:

1. Inspect the repository and understand its structure.
2. Identify the HTML, CSS, JavaScript, assets and shared components/styles.
3. Check whether the project contains AGENTS.md or other project instructions.
4. Find existing design tokens, colors, spacing and reusable classes.
5. Reuse the current implementation whenever reasonable.
6. Do not introduce unnecessary libraries.
7. Do not rewrite large functioning sections without a clear reason.

Prefer targeted improvements instead of rebuilding the project.

## 2. Preserve the Echo identity

Preserve the visual identity already established in the site.

Important visual characteristics include:

- dark navy institutional sections
- white/light content areas
- blue primary actions
- green/teal accents
- strong headings
- rounded cards
- restrained borders and shadows
- clean healthcare-oriented design

Do not transform the site into:

- a generic SaaS landing page
- a futuristic tech interface
- a neon interface
- a glassmorphism-heavy website
- an entirely dark website
- a website full of unnecessary gradients
- a template-looking medical website

The current brand direction should be refined, not replaced.

## 3. Light theme behavior

The website must not automatically become dark because the operating system, browser or in-app browser is using dark mode.

Intentional dark sections of the Echo design are allowed and must remain dark.

However, sections designed with light backgrounds must stay light.

Do not use automatic website-wide dark mode based on:

`prefers-color-scheme: dark`

unless the user explicitly asks for dark mode.

When appropriate, explicitly reinforce the intended light color scheme using browser-compatible techniques such as:

`color-scheme: light;`

and metadata such as:

`<meta name="color-scheme" content="light">`

and an appropriate:

`<meta name="theme-color">`

Do not accidentally change intentional navy sections into light sections.

Remember that some browser interface elements may still use the browser/app theme and are not fully controlled by the website.

## 4. Mobile is a priority

Treat mobile as a primary experience.

Review layouts at approximately:

- 360px
- 390px
- 768px
- 1024px
- 1440px

Verify:

- no horizontal overflow
- no clipped text
- no elements outside the screen
- no controls covered by floating elements
- no awkward heading wrapping
- no excessive empty space
- no giant cards with little content
- comfortable touch targets
- proper margins from screen edges
- consistent responsive spacing

Do not simply shrink the desktop design.

Reorganize layouts when necessary.

## 5. Spacing

The website should feel spacious but not wasteful.

Avoid:

- huge blank spaces between sections
- cards occupying almost an entire screen unnecessarily
- excessive vertical padding
- unnecessary min-height values
- inconsistent gaps between similar components

Use a consistent rhythm between:

eyebrow → heading → description → content → CTA → next section

If a card has little information, reduce the card size instead of stretching it.

## 6. Typography

Maintain strong visual hierarchy.

Use:

- one clear H1 per page
- strong section headings
- readable body copy
- consistent labels
- understandable price hierarchy

Avoid:

- overly long descriptions
- internal development language
- text that sounds AI-generated
- technical explanations that patients do not need
- headings that wrap badly on small screens

## 7. Patient-facing copy

Every visible sentence must sound natural to a real patient.

Do not show text that sounds like:

- developer instructions
- implementation notes
- spreadsheet notes
- flyer references
- catalog implementation explanations
- internal placeholders

Examples of text that should not appear publicly:

`igual às tabelas do nosso catálogo`

`como no flyer`

`conforme a planilha`

`[PLACEHOLDER ...]`

`texto a ser completado`

If a supporting sentence does not help the patient, prefer removing it instead of filling space.

Prefer simple language such as:

`Encontre seu exame`

`Busque pelo nome do exame ou escolha uma categoria.`

`Veja exames e valores`

`Agendar exame`

`Agendar consulta`

`Como chegar`

`Fale conosco`

## 8. Never invent clinic information

Never invent or silently modify:

- prices
- addresses
- phone numbers
- WhatsApp numbers
- opening hours
- medical specialties
- doctors
- credentials
- registration numbers
- certifications
- awards
- testimonials
- years of experience
- exam preparation instructions
- exam result times
- Club Echo benefits
- discounts
- medical claims

If information is missing, do not replace it with plausible information.

If an internal placeholder is currently visible, remove it from the public interface rather than inventing the missing information.

## 9. Medical claims

Do not create claims such as:

- resultado garantido
- 100% seguro
- cura garantida
- melhor tratamento
- melhor clínica
- resultados garantidos

Keep healthcare content informative and professional.

## 10. Buttons

Keep the button system consistent.

Preferred roles:

Primary:
blue filled button

Secondary:
outline button

Club Echo:
green button

Do not create many unrelated button styles.

Buttons should have consistent:

- height
- radius
- font weight
- spacing
- hover state
- focus state

Use clear labels.

## 11. Exams page

The exams experience should make finding an exam easy.

Keep:

- prominent search
- category filtering
- result count
- consistent result cards
- clear prices
- clear CTA

Avoid explanatory copy such as:

`Filtre por categoria ou busque pelo nome — igual às tabelas do nosso catálogo de exames.`

Prefer something natural such as:

`Busque pelo nome do exame ou escolha uma categoria.`

If even that sentence is unnecessary, remove it.

On mobile, category filters must not create an ugly vertical wall.

Long category names may use:

- horizontal scrolling chips
- compact wrapping
- another accessible responsive solution

Do not allow horizontal page overflow.

## 12. Exam prices

When multiple prices exist, the patient should immediately understand what each number means.

Use clear labels when supported by the real data, such as:

- Com Club Echo
- Particular
- Sem Club Echo
- Débito/Crédito

Do not change numeric values.

Do not leave two prices visually separated without labels if the meaning becomes ambiguous.

## 13. Consultation page

Consultation cards should clearly show:

- specialty
- service day/time when available
- price labels
- CTA

Avoid making the patient guess which price corresponds to Club Echo or normal payment.

Keep cards compact on mobile.

## 14. Club Echo

Club Echo should have its own clear visual identity.

Green may be used as its accent color.

Preserve all real information already present regarding:

- monthly price
- number of covered people
- discounts
- benefits
- lack of waiting period
- conditions

Do not imply that Club Echo is a health insurance plan if the existing verified content says it is not.

Do not insert Club Echo advertising into unrelated components merely to fill space.

## 15. Echo circular/orbit section

The section containing the central Echo logo and rectangular service cards around it is an important signature visual.

Preserve the concept but make the geometry look deliberate.

The central Echo logo must remain visually centered.

The surrounding cards must be balanced.

If four cards are used, prefer an intentionally symmetrical composition.

The cards should have:

- consistent visual weight
- consistent dimensions when appropriate
- equal or intentionally balanced distances from the center
- coherent spacing

Do not allow cards to appear randomly positioned.

## 16. Orbit animation

If the rectangular cards move around the Echo circle:

- movement must be smooth
- movement must be coordinated
- movement must look symmetrical
- cards should follow consistent paths
- equivalent cards should use equivalent radius/distance
- avoid random drifting
- avoid sudden acceleration
- avoid collisions
- avoid overlapping the central logo
- avoid cards leaving their intended visual area

The animation should look intentionally designed, not like independent elements moving randomly.

Support:

`prefers-reduced-motion`

When reduced motion is enabled, show a clean static composition.

## 17. Club Echo must not appear in the orbit

Do not use Club Echo as one of the rectangular cards around the central Echo circle.

The orbit should communicate clinic/service areas rather than serve as an advertising space.

Use only real services already supported by the website.

Examples may include existing services such as:

- Ultrassonografia
- Raio-X
- Cardiologia
- Consultas

Only use a service if it already exists in the project's real content.

Do not invent a service just to complete the symmetry.

## 18. Announcement bar / ticker

The top announcement bar must look intentional on mobile.

Do not allow:

- unreadable fragments
- broken sentences stuck on screen edges
- awkward clipping
- accidental horizontal page overflow

If using marquee behavior:

- movement should be continuous
- messages should remain readable
- spacing between messages should be intentional
- animation should not stutter

Provide a reduced-motion fallback.

If the marquee cannot remain polished, prefer a simpler static or rotating message solution.

## 19. Units

Unit cards/pages should clearly organize:

- unit name
- address
- WhatsApp
- phone
- opening hours
- specialties when provided
- directions CTA
- contact CTA

Do not create enormous cards when the amount of information is small.

Reduce unnecessary blank areas.

Preserve all real unit information.

## 20. WhatsApp floating button

The floating WhatsApp button must remain easy to find without covering important content.

It must not cover:

- prices
- CTA buttons
- form controls
- navigation
- meaningful text

Respect mobile safe areas.

Keep enough distance from:

- bottom edge
- right edge
- browser controls

If overlap occurs, solve the layout instead of only changing z-index.

## 21. Navigation

Mobile navigation should remain:

- simple
- readable
- touch-friendly
- easy to close
- visually consistent

Important destinations include existing pages such as:

- Exames
- Consultas
- Unidades
- Sobre a Echo

Important actions may include:

- Agendar exame
- Agendar consulta
- Falar no WhatsApp

Do not make every navigation element compete visually as a primary CTA.

## 22. Accessibility

Preserve accessibility during visual changes.

Check:

- semantic HTML
- heading hierarchy
- keyboard navigation
- visible focus states
- labels for form fields
- accessible names for icon buttons
- sufficient contrast
- meaningful alt text
- decorative images treated appropriately
- touch targets
- reduced-motion support
- menu state accessibility

Do not sacrifice accessibility for animation or aesthetics.

## 23. Forms and privacy

Treat patient information as sensitive.

For forms:

- request only necessary information
- validate clearly
- show loading state
- show success state
- show error state
- prevent accidental duplicate submissions

Never expose secrets or API credentials in frontend code.

Do not place sensitive patient information in:

- URLs
- analytics events
- public files
- console logs

## 24. SEO

For public pages, review when appropriate:

- page title
- meta description
- H1
- heading hierarchy
- canonical URL
- Open Graph metadata
- internal links
- alt text

Do not use keyword stuffing.

Write for patients first.

## 25. Performance

Avoid unnecessary JavaScript.

Optimize:

- images
- image loading
- font loading
- animation
- third-party scripts
- component rendering

Do not add a dependency for a simple CSS/JavaScript solution.

## 26. Code quality

Follow existing project conventions.

Prefer:

- readable names
- reusable existing classes/components
- shared design values
- focused changes
- simple CSS
- simple JavaScript

Avoid:

- duplicated code
- duplicated styles
- unexplained magic numbers
- giant files created without need
- unused code
- temporary debugging code
- unnecessary libraries
- unrelated refactors

## 27. Do not redesign everything automatically

When the user asks for a specific correction, make the smallest set of changes needed to solve it properly.

Examples:

If the request is about:
- orbit symmetry

do not redesign the exams page.

If the request is about:
- dark browser behavior

do not change the clinic branding.

If the request is about:
- spacing

do not rewrite all site content.

Preserve what is already working.

## 28. Visual QA

After significant visual changes, review:

- alignment
- spacing
- card dimensions
- text wrapping
- button consistency
- mobile overflow
- floating WhatsApp position
- menu behavior
- hero height
- empty spaces
- price hierarchy
- orbit symmetry
- animation smoothness

The site should look intentionally designed at every supported width.

## 29. Technical verification

After making changes:

1. Review every modified file.
2. Run available lint checks if present.
3. Run relevant tests if present.
4. Run the build when practical.
5. Fix errors introduced by the change.
6. Check mobile widths.
7. Check desktop widths.
8. Check for horizontal overflow.
9. Check the WhatsApp floating button.
10. Check navigation.
11. Check intentional light and dark sections.
12. Check that no placeholder is visible.
13. Check that clinic data was not accidentally changed.
14. Remove debugging code.

Never claim that a test or check was performed if it was not actually performed.

## 30. Final response

After completing a task, briefly report:

- what was changed
- main files modified
- checks performed
- anything that still requires real information from the clinic

Do not provide a long tutorial unless the user asks for one.
