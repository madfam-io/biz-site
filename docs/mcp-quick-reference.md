# MCP Servers Quick Reference

## Available Servers

| Server         | Purpose                 | Example Usage                                    |
| -------------- | ----------------------- | ------------------------------------------------ |
| **context7**   | Documentation lookup    | "Show me the Prisma schema documentation"        |
| **sequential** | Multi-step reasoning    | "Plan the migration to the new analytics system" |
| **magic**      | UI component generation | "Create a testimonial card component"            |
| **puppeteer**  | Browser automation      | "Test the contact form submission flow"          |

## Common Commands

### Context7 (Documentation)

- "What are the Next.js 14 caching strategies?"
- "Show Tailwind CSS animation utilities"
- "Find Prisma relation examples"

### Sequential (Planning)

- "Break down the user authentication implementation"
- "Create a step-by-step plan for i18n integration"
- "Analyze and refactor the API error handling"

### Magic (UI Generation)

- "Generate a pricing table with 3 tiers"
- "Create a newsletter signup form with validation"
- "Build a responsive navigation menu"

### Puppeteer (Testing)

- "Screenshot all pages in dark mode"
- "Test the lead form with invalid data"
- "Measure page load performance"

## Tips

1. **Combine servers**: Use Sequential to plan, then Magic to generate UI
2. **Document lookups**: Use Context7 before implementing new features
3. **Visual testing**: Use Puppeteer to verify responsive designs
4. **Iterative development**: Let Sequential guide complex implementations

## Restart Required

After any changes to `.mcp.json`, restart Claude Code:

```bash
# macOS/Linux
pkill -f "claude"
# Then reopen Claude Code
```
