# Bernie Hogan Academic Website - UX Specification

## Core Concept: Perspectival Navigation

This website demonstrates its central intellectual argument through structure rather than exposition. The same scholarly work appears in multiple thematic contexts, with different 2-3 sentence annotations emphasizing different aspects. Users discover that work cannot be reduced to single categories - the complexity emerges from navigation rather than being stated explicitly.

This is the "magic eye" effect: someone browsing one theme sees coherent work in that area. Someone browsing multiple themes notices: "Wait, I keep seeing the same papers... but the descriptions are different... OH." The organization IS the argument.

## Design Philosophy: Deceptively Simple

**Austere aesthetic**
- Clean typography, generous whitespace
- Minimal visual elements
- No decorative graphics or thought-leader styling
- Monochromatic or near-monochromatic palette
- Focus entirely on text hierarchy and structure

**Complexity through discovery**
- First glance: organized bibliography by theme (useful, conventional)
- Careful reading: same papers appear in multiple themes with different descriptions
- Deep engagement: the organization itself makes an argument about perspectival knowledge
- Never explicitly state "this structure demonstrates my theory" - let users discover it

**Anti-patterns to avoid**
- Hero shots, dramatic photography
- Framework diagrams or visual theory representations
- Buzzwords or hype language ("revolutionary," "groundbreaking," "rethinking")
- TED-talk aesthetic (slick, oversimplified, performative)
- Excessive self-explanation ("my unique approach is...")
- Grand theoretical framing on homepage
- Diagrams of "my framework"

## Navigation Architecture

### Homepage
Minimal landing:
- Name: Bernie Hogan
- Position: Associate Professor, Oxford Internet Institute
- One-line research statement (understated, ~15 words, e.g., "I study how technical systems shape collective knowledge production")
- Navigation to themes (simple list, no descriptions)
- Optional: Link to CV, contact

No theoretical framing, no grand claims, no hero imagery.

### Theme Pages
Each theme page contains:
- Brief contextual note (2-3 sentences explaining the lens)
- Annotated bibliography of relevant works
- Each work has a 2-3 sentence annotation specific to that theme's framing

### Individual Work Pages
When someone clicks a paper, they see:
- "This work appears in themes: X, Y, Z"
- All theme-specific annotations displayed below
- Links to PDF/source

This is the "magic moment" - users see the same work reframed multiple ways.

## The Five Themes

### 1. Platforms and Power
How technical architectures shape what can be known
- Algorithmic curation, API closure, epistemic capture
- Focus: political economy, infrastructure critique

### 2. Methods and Tools
Building infrastructure for better data collection
- Network Canvas, egocentric networks, participant-aided sociograms
- Focus: pragmatic methodology, software development

### 3. Semantic Structures
How meaning works (and fails to work) technically
- Autoencoder dilemma, vector pragmatics, proper likeness
- Focus: formal/mathematical approaches, AI interpretability

### 4. Networks as Epistemology
What networks reveal about knowledge production
- Relational generativity, maps vs routes, CSS reframing
- Focus: philosophy of social science

### 5. Teaching and Translation
Making technical work accessible and practical
- From Social Science to Data Science book, workshops
- Focus: pedagogy, bridging disciplines

## Example: Multi-Thematic Annotation

**"Social Media Giveth, Social Media Taketh Away" (2018)**

**Under Platforms and Power:**
> Facebook's progressive API restrictions eliminated researchers' and users' capacity to access their own social graph data. This wasn't a privacy feature - it was monopolization of the means of representation. Introduces "relational generativity" to describe platforms' systematic capture of users' network data.

**Under Networks as Epistemology:**
> Platforms don't just restrict data access - they eliminate the capacity to produce alternative representations of social structure. By closing APIs while maintaining proprietary access, Facebook ensures only their algorithmic "routes" exist, never user-generated "maps." A case study in how technical architecture becomes epistemological constraint.

**Under Semantic Structures:**
> API closure demonstrates epistemic capture at infrastructure level. Users' social networks exist as local, context-dependent perceptions, but platforms force these into single global representations. An early example of the tension between local coherence and forced globalization that appears later in LLM alignment debates.

## Implementation Guidelines

**Annotations**
- 2-3 sentences max per paper per theme
- Focus on "why this matters HERE" not full abstract
- Different tone for different themes (more critical under Platforms, more technical under Semantic Structures)
- Some works appear in 1 theme, some in 3-4 (let this emerge naturally)

**Visual Design**
- Clean typography
- Minimal design
- Let the structure do the work, not flashy graphics
- Consider subtle visual indicator when a paper appears in multiple themes

**Navigation Options**
- Browse by theme (see all papers in "Platforms and Power")
- Browse by year (see trajectory chronologically)
- Individual paper pages show "appears in themes: X, Y, Z" with all annotations

## Workflow for Content Population

1. Start with complete publication list
2. Assign each work to 1-4 themes (let this emerge naturally)
3. Write theme-specific annotations for each assignment
4. Arrange within themes by relevance/impact, not just chronology
5. Write brief theme contextual notes
6. Review for: tone consistency, useful variation in annotations, natural cross-referencing

**Themes can evolve over time:**
- Add new themes as work develops
- Rewrite annotations as framing shifts
- Archive themes that no longer serve (or keep as historical record)
- The structure should feel alive, not fixed

## Final Note: Trust the Pattern

The hardest part is resisting the urge to explain. Don't add a page saying "Why I organized it this way" or "The philosophy behind this structure."

Trust that:
- Smart people will see it
- The right people will see it
- Those who don't see it aren't your audience
- The work speaks for itself when properly arranged

The website is evidence, not argument. It shows what you've built, arranged to reveal pattern, trusting readers to draw their own conclusions.
