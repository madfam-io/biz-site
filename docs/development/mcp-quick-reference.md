# MCP Servers Quick Reference

## 🚀 Quick Start

After configuration, restart Claude Code and try these commands:

## 📚 Context7 - Documentation Lookup

**Common Commands:**

```
"Show me React hooks documentation"
"Find Next.js App Router examples"
"What's the syntax for Tailwind flexbox?"
"How do I use Vue 3 composition API?"
"Show TypeScript utility types"
```

**Pro Tips:**

- Be specific: "React useState" > "React state"
- Ask for examples: "Show useState examples with TypeScript"
- Compare versions: "Differences between Next.js 13 and 14"

## 🧠 Sequential - Complex Planning

**Common Commands:**

```
"Plan a user authentication system"
"Break down this refactoring task"
"Create a migration strategy for our database"
"Design a scalable API architecture"
"Plan the testing strategy for this feature"
```

**Pro Tips:**

- Provide context about your tech stack
- Mention constraints (time, resources, compatibility)
- Ask for alternatives and trade-offs

## ✨ Magic - UI Generation

**Common Commands:**

```
"Generate a pricing table component"
"Create a responsive navbar with dropdown"
"Build a contact form with validation"
"Design a hero section with CTA buttons"
"Make a dashboard sidebar navigation"
```

**Pro Tips:**

- Specify framework: "React component" or "Vue component"
- Include styling preferences: "with Tailwind CSS"
- Mention responsive needs: "mobile-first design"

## 🎭 Puppeteer - Browser Automation

**Common Commands:**

```
"Screenshot the homepage at 1920x1080"
"Test the login flow"
"Check all links return 200 status"
"Capture mobile view of the landing page"
"Generate PDF of the documentation page"
```

**Pro Tips:**

- Specify viewport sizes for screenshots
- Use for visual regression testing
- Great for generating documentation assets

## 💡 Combining Servers

### Feature Development Flow

1. **Sequential**: "Plan the shopping cart feature"
2. **Context7**: "Show Redux Toolkit documentation"
3. **Magic**: "Generate cart item component"
4. **Puppeteer**: "Test the cart functionality"

### Bug Investigation Flow

1. **Puppeteer**: "Screenshot the broken layout"
2. **Sequential**: "Debug the CSS issue step by step"
3. **Context7**: "Show CSS Grid troubleshooting"

### Performance Optimization

1. **Sequential**: "Plan performance improvements"
2. **Context7**: "Show React performance best practices"
3. **Puppeteer**: "Measure page load times"

## ⚡ Quick Troubleshooting

**Server not working?**

1. Restart Claude Code
2. Check network connection
3. Try: `npx -y [server-name] --version`

**Slow first run?**

- Normal - downloading packages
- Subsequent runs will be faster

**Command not recognized?**

- Check spelling
- Try simpler version first
- Verify server is in `.mcp.json`

## 🎯 Best Practices

1. **Start simple** - Test with basic commands first
2. **Be specific** - Clear requests get better results
3. **Chain operations** - Use multiple servers together
4. **Save examples** - Document useful commands for team

## 📝 Common Workflows

### New Component

```
1. Magic: "Generate [component description]"
2. Context7: "Show [framework] best practices"
3. Puppeteer: "Screenshot the component"
```

### Debugging

```
1. Sequential: "Debug [issue] systematically"
2. Context7: "Find similar issues in [library] docs"
3. Puppeteer: "Capture the error state"
```

### Documentation

```
1. Puppeteer: "Screenshot all main pages"
2. Context7: "Find documentation examples"
3. Magic: "Generate documentation template"
```

## 🔗 Resources

- Full documentation: `/docs/mcp-servers.md`
- Config location: `~/.claude.json` & `.mcp.json`
- Get help: Ask Claude Code directly!

---

**Remember**: These servers enhance Claude Code - use them to work faster and smarter! 🚀
