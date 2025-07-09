# MCP Server Configuration

This document describes the Model Context Protocol (MCP) servers configured for the MADFAM business site project.

## Overview

MCP servers extend Claude Code's capabilities by providing access to specialized tools and services. Our project uses four MCP servers to enhance development workflow:

1. **Context7** - Access to library documentation
2. **Sequential** - Multi-step reasoning capabilities
3. **Magic** - AI-generated UI components
4. **Puppeteer** - Browser testing and automation

## Configuration

The MCP servers are configured in two locations:

### 1. User Configuration (`.claude.json`)

Located at: `~/.claude.json`

This file contains your personal Claude Code settings, including MCP server configurations for this project.

### 2. Project Configuration (`.mcp.json`)

Located at: `/Users/aldoruizluna/labspace/biz-site/.mcp.json`

This file is checked into version control and ensures all team members have access to the same MCP tools.

## Server Details

### Context7

- **Purpose**: Provides access to library documentation
- **Command**: `npx -y mcp-context7`
- **Use Cases**:
  - Quick access to documentation for dependencies
  - API reference lookup
  - Code examples from documentation

### Sequential

- **Purpose**: Enables multi-step reasoning capabilities
- **Command**: `npx -y mcp-sequential`
- **Use Cases**:
  - Complex problem-solving workflows
  - Step-by-step implementation planning
  - Breaking down large tasks into manageable steps

### Magic

- **Purpose**: Generates AI-powered UI components
- **Command**: `npx -y mcp-magic`
- **Use Cases**:
  - Rapid UI prototyping
  - Component generation based on descriptions
  - Design system integration

### Puppeteer

- **Purpose**: Browser automation and testing
- **Command**: `npx -y @modelcontextprotocol/server-puppeteer`
- **Use Cases**:
  - End-to-end testing
  - Screenshot generation
  - Web scraping for content migration
  - Performance testing

## Usage

Once configured, these MCP servers are automatically available in Claude Code. You can interact with them through natural language commands:

```
# Example: Using Context7
"Show me the Next.js documentation for App Router"

# Example: Using Sequential
"Let's plan the implementation of the multilingual feature step by step"

# Example: Using Magic
"Generate a hero section component with a gradient background and CTA button"

# Example: Using Puppeteer
"Take a screenshot of the homepage in all three languages"
```

## Troubleshooting

### Server Not Starting

If an MCP server fails to start:

1. Ensure you have Node.js installed
2. Check internet connectivity (servers are installed via npx)
3. Restart Claude Code

### Configuration Not Loading

1. Verify the `.mcp.json` file exists in the project root
2. Check JSON syntax is valid
3. Ensure you've reloaded Claude Code after configuration changes

### Permission Issues

If you encounter permission errors:

```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
```

## Adding New Servers

To add a new MCP server:

1. Edit `.mcp.json` and add the server configuration:

```json
{
  "mcpServers": {
    "new-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "mcp-new-server"],
      "env": {},
      "description": "Description of what this server does"
    }
  }
}
```

2. Restart Claude Code to load the new configuration

## Security Considerations

- MCP servers run with the same permissions as Claude Code
- Only use trusted MCP servers from verified sources
- Review server documentation before installation
- Environment variables in `env` should not contain sensitive data in project-scoped configurations

## Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [Claude Code MCP Guide](https://docs.anthropic.com/en/docs/claude-code/mcp)
- [MCP Server Registry](https://github.com/modelcontextprotocol/servers)
