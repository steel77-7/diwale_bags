# AGENTS.md
Tool Awareness: Before executing any task, inspect the available MCP servers, plugins, skills, and specialized tools relevant to that task. Never assume a capability is unavailable without checking the available tool ecosystem.

## Operational Rules & Agent Environment Guidelines

This file governs agent behavior, tool selection, token efficiency, and implementation workflows for this workspace.

---

### Code Exploration & Navigation
- **Semantic Navigation**: Use **Serena** for semantic code navigation, symbol lookup, reference tracking, and symbol-level code manipulation.
- **Symbol Retrieval over File Dumps**: Retrieve individual symbols (functions, classes, interfaces) rather than loading entire files whenever possible.
- **Dependency & Call Tracking**: Trace relevant callers, callees, and dependencies before modifying code using Serena or repograph.
- **Syntax-Aware Search**: Use **ast-grep** (`sg`) for structural search and syntax-aware transformations across TypeScript/TSX/JavaScript files.
- **Exact Search**: Use exact text search tools (`grep`, `find_file`) only when structural/symbol tools are not suitable.
- **Avoid Directory Scanning**: Avoid repeatedly scanning the same directories or listing entire trees.

---

### Documentation Retrieval
- **External Libraries**: Use **Context7** (`resolve-library-id`, `query-docs`) to retrieve documentation for external libraries and frameworks (e.g. Next.js, Medusa, Tailwind, React).
- **Targeted Retrieval**: Retrieve only documentation specifically relevant to the task at hand rather than loading complete documentation sets.
- **Version Verification**: Verify installed package versions against `package.json` before querying APIs to ensure version-accurate documentation.

---

### Repository Context & Analysis
- **Selective Repomix Usage**: Use **Repomix** only for tasks requiring broad architectural overviews or large-scale codebase investigations.
- **No Blanket Dumps**: Never inject complete repository dumps into everyday conversations or prompts.
- **Configured Packing**: When running Repomix, use the project-level `repomix.config.json` (which automatically ignores dependencies, lockfiles, build artifacts, and enables Tree-sitter code compression).
- **Concise Architecture**: Keep project notes and architecture summaries focused and current.

---

### Frontend Verification & Testing
- **Playwright CLI**: Use **Playwright CLI** (`playwright-cli`) to validate actual browser behavior, test user flows, check responsive layouts, verify forms, and capture screenshots.
- **Runtime Debugging**: Use **Chrome DevTools MCP** when deep browser console inspection, network request inspection, or performance tracing is specifically required.
- **No Compilation Assumptions**: Do not assume successful TypeScript compilation or build completion means the UI renders or functions correctly. Verify via browser inspection.

---

### Token Efficiency
- **Avoid Redundant Calls**: Do not invoke multiple tools for the same purpose without a clear, specific reason.
- **Filtered Outputs**: Avoid dumping complete command or file outputs; prefer targeted line ranges, filtered queries, and concise summaries.
- **No Rereading**: Do not reread unchanged files or re-fetch documentation already retrieved in the conversation.
- **Minimal Context Bloat**: Always select the lightest tool that solves the problem.

---

### Implementation Guidelines
- **Inspect Before Modifying**: Inspect existing architecture and conventions before introducing new patterns or abstractions.
- **Minimal, Targeted Changes**: Prefer localized, minimal edits over wholesale file rewrites.
- **Verification & Testing**: Run relevant typechecks, unit tests, and browser verifications to confirm implementations.
- **Ground Assumptions**: Verify important assumptions against actual source code before concluding.

## Design Intelligence, Research & Visual Tooling

### Design Tooling & Plugin Utilization

- **Ponytail**: Use Ponytail and its available capabilities for design exploration, UI development, component discovery, visual references, and design-related workflows.
- **RepoGraph**: Use RepoGraph to understand the existing project's architecture, component relationships, design system, asset dependencies, and implementation structure before making changes.
- **Design Plugins**: Actively discover and utilize all available design-related plugins, skills, MCP servers, and integrations in the agent environment. Do not assume the available tooling is limited to the explicitly mentioned plugins.
- **Tool Discovery**: Before starting a design-heavy task, inspect the available tools and identify which ones are relevant. Prefer existing specialized tools over manually recreating their functionality.
- **Tool Priority**: Use specialized design tools for their intended purposes. Do not use a plugin simply because it exists; select tools based on the task.

### Visual Research & Reference Discovery

- **Design Inspiration Search**: Use available search tools to research existing websites, UI patterns, layouts, design systems, animations, and visual implementations when the task requires design inspiration.
- **Image & Photography Search**: Use available image search tools to find relevant photographs, textures, backgrounds, illustrations, visual assets, and other imagery requested by the user.
- **Reference Collection**: When the user requests visual references, explore multiple relevant sources rather than relying on a single search result.
- **Real-World References**: Prioritize actual production websites, established design portfolios, design galleries, and real-world implementations over generic AI-generated design suggestions.
- **Asset Relevance**: Ensure discovered images and visual assets match the intended composition, subject, aesthetic, lighting, color palette, and aspect ratio.
- **Source Verification**: Verify that assets are accessible and usable before integrating them. Respect licensing, attribution, and usage restrictions.
- **No Fabricated References**: Never claim to have inspected a website, image, design, or implementation without actually retrieving or viewing it.

### Design Exploration Workflow

1. Understand the user's visual requirements, references, constraints, and intended outcome.
2. Inspect the existing project and its design conventions using RepoGraph and relevant semantic navigation tools.
3. Discover relevant design tools and plugins, including Ponytail.
4. Research external visual references using available web, image, and design search tools when appropriate.
5. Identify useful patterns, layouts, typography, interactions, animations, and visual treatments.
6. Translate the research into the existing project's design language rather than blindly copying references.
7. Implement using the project's existing architecture and conventions.
8. Verify the actual visual output using browser inspection and Playwright CLI where applicable.

### Visual Quality Standards

- Do not default to generic AI-generated UI aesthetics.
- Avoid unnecessary gradients, rounded cards, excessive whitespace, repetitive layouts, and decorative elements without a clear purpose.
- Prioritize composition, hierarchy, typography, spacing, contrast, visual rhythm, and meaningful interactions.
- Do not assume minimalism is automatically good design.
- When the user supplies a reference, treat it as a meaningful design constraint.
- Do not replace an established visual direction with personal design preferences.
- Evaluate the actual rendered result rather than relying exclusively on source code or screenshots of individual components.

### Tool Efficiency

- Discover available tools once and reuse the findings throughout the task.
- Avoid searching for references when the user has already supplied sufficient references.
- Prefer targeted visual searches over broad, unrelated image collections.
- Do not repeatedly retrieve the same assets or design documentation.
- Keep research focused on the specific visual problem being solved.