Create a new GitHub issue based on the user's description: $ARGUMENTS

## Instructions:

1. **Parse the arguments**:

   - First argument: Issue description (required)
   - Second argument: Figma URL (optional) - if provided, extract design context

2. **If Figma URL is provided**:

   - Extract the node ID from the Figma URL (format: https://figma.com/design/:fileKey/:fileName?node-id=1-2)
   - Use `mcp__figma-dev-mode-mcp-server__get_image` to fetch the design image
   - Include the design image in the issue body
   - Add design context to the problem description

3. **Analyze the description** and break it down into:

   - Clear, actionable title
   - Problem description (include Figma context if available)
   - Proposed solution (if not provided, suggest one)
   - Expected benefits/impact
   - Acceptance criteria

4. **Determine appropriate labels** based on content:

   - `bug` - for fixing issues
   - `enhancement` - for new features or improvements
   - `performance` - for performance optimizations
   - `accessibility` - for accessibility improvements
   - `documentation` - for documentation updates
   - `design` - when Figma URL is provided

5. **Create the issue** using `gh issue create` with:

   - Descriptive title with emoji prefix (🐛 for bugs, ✨ for features, ⚡ for performance, 🎨 for design)
   - Well-structured markdown body with sections
   - Design image embedded if Figma URL provided
   - Appropriate labels

6. **Issue body structure**:

   ```markdown
   ## Problem

   [Clear description of the issue/need]
   [Design context from Figma if provided]

   ## Design Reference

   [Figma design image if provided]

   ## Proposed Solution

   [How to address the problem]

   ## Expected Impact

   [Benefits of implementing this]

   ## Acceptance Criteria

   - [ ] [Specific criteria for completion]
   - [ ] [Additional criteria as needed]
   ```

7. **Return the created issue URL** for reference

## Examples:

### Basic Issue

```
/gh-issue-create "Add loading spinners to buttons when API calls are in progress"
```

### Issue with Figma Design

```
/gh-issue-create "Implement the new modal design from Figma" "https://figma.com/design/qLixniaoEYTPiEcS373zEn/GTS-Component-Library?node-id=2795-900"
```

### Bug Report with Design

```
/gh-issue-create "Modal padding doesn't match Figma design" "https://figma.com/design/filekey/filename?node-id=123-456"
```

## Figma URL Handling:

- Automatically extracts node ID from Figma URLs
- Fetches design images for visual context
- Adds design-specific labeling
- Includes visual reference in issue body

The command will automatically format the issue with proper structure, labels, and design context when applicable.
