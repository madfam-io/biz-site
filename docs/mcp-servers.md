# MCP Servers Documentation

## Overview

Model Context Protocol (MCP) servers extend Claude Code's capabilities by providing specialized tools and integrations. This document covers the four MCP servers configured for this project.

## Configured MCP Servers

### 1. Context7 - Library Documentation Access

**Purpose**: Provides instant access to documentation for JavaScript/TypeScript libraries and frameworks.

**Command**: `npx -y mcp-context7`

**Use Cases**:

- Quickly look up API documentation for React, Vue, Next.js, etc.
- Find code examples and best practices
- Search for specific methods or configurations
- Explore library features without leaving Claude Code

**Example Commands**:

- "Show me the React useEffect documentation"
- "What are the Next.js 14 routing patterns?"
- "Find examples of Tailwind CSS grid layouts"

### 2. Sequential - Multi-Step Reasoning

**Purpose**: Enhances Claude's ability to break down complex problems into manageable steps and maintain context across multi-step operations.

**Command**: `npx -y mcp-sequential`

**Use Cases**:

- Planning complex feature implementations
- Debugging multi-layered issues
- Creating step-by-step migration plans
- Architecting system designs

**Example Commands**:

- "Plan the migration from JavaScript to TypeScript for this project"
- "Create a step-by-step plan for implementing user authentication"
- "Debug this complex state management issue systematically"

### 3. Magic - AI-Generated UI Components

**Purpose**: Rapidly generates UI components and layouts based on descriptions.

**Command**: `npx -y mcp-magic`

**Use Cases**:

- Quick prototyping of UI components
- Generating boilerplate code for common patterns
- Creating responsive layouts
- Building form components with validation

**Example Commands**:

- "Generate a hero section with animated gradient background"
- "Create a multi-step form component with validation"
- "Build a responsive navigation menu with mobile hamburger"

### 4. Puppeteer - Browser Testing & Automation

**Purpose**: Provides browser automation capabilities for testing, screenshots, and web scraping.

**Command**: `npx -y @modelcontextprotocol/server-puppeteer`

**Use Cases**:

- Capturing screenshots of web pages
- Running end-to-end tests
- Automating form submissions
- Testing responsive designs
- Performance testing

**Example Commands**:

- "Take a screenshot of the homepage at mobile and desktop sizes"
- "Test the contact form submission flow"
- "Check if all links on the page are working"

## Configuration

### User-Level Configuration

MCP servers are configured in `~/.claude.json` under your project's path:

```json
{
  "/path/to/your/project": {
    "mcpServers": {
      "context7": {
        "command": "npx",
        "args": ["-y", "mcp-context7"],
        "description": "Access to library documentation"
      }
      // ... other servers
    }
  }
}
```

### Project-Level Configuration

For team collaboration, configurations are stored in `.mcp.json` at the project root:

```json
{
  "mcpServers": {
    // Server configurations
  }
}
```

## Getting Started

1. **Restart Claude Code** after configuration changes
2. **Test each server** with simple commands to ensure they're working
3. **Check server status** if commands aren't recognized

## Troubleshooting

### Server Not Responding

1. Check if the server is properly configured in `~/.claude.json`
2. Restart Claude Code
3. Verify npx can download and run the package
4. Check network connectivity

### Command Not Recognized

1. Ensure you're using the correct command syntax
2. Verify the server is loaded (check Claude Code logs)
3. Try a simpler command first

### Performance Issues

1. MCP servers run as separate processes
2. First run may be slow due to package download
3. Subsequent runs use cached packages

## Security Considerations

- MCP servers run with the same permissions as Claude Code
- Only install trusted MCP servers
- Review server permissions before granting access
- Use `npx -y` to avoid global installations

## Best Practices

1. **Use the right tool**: Each server has specific strengths
2. **Combine servers**: Use multiple servers together for complex tasks
3. **Cache awareness**: First runs download packages; be patient
4. **Error handling**: If a server fails, try alternative approaches

## Advanced Usage

### Combining Multiple Servers

Example workflow using multiple servers:

1. Use **Sequential** to plan a feature
2. Use **Context7** to research library documentation
3. Use **Magic** to generate UI components
4. Use **Puppeteer** to test the implementation

### Custom Workflows

Create project-specific workflows that leverage MCP servers:

```bash
# Example: Full feature development workflow
1. Plan with Sequential
2. Research with Context7
3. Generate with Magic
4. Test with Puppeteer
```

## Additional Resources

- [MCP Protocol Documentation](https://modelcontextprotocol.com)
- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- [NPX Documentation](https://docs.npmjs.com/cli/v7/commands/npx)

## Contributing

To add new MCP servers to the project:

1. Test the server locally
2. Add configuration to `.mcp.json`
3. Update this documentation
4. Submit a pull request

---

Last updated: January 2025
