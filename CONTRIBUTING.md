# Contributing to Dunk Calculator

Thank you for your interest in contributing to the Basketball Dunk Calculator! This document provides guidelines and information for contributors.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/dunk-calculator.git
   cd dunk-calculator
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```

## Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow existing code formatting and structure
- Use meaningful variable and function names
- Add comments for complex calculations or algorithms

### Component Structure
- Place reusable components in `client/src/components/`
- Page components go in `client/src/pages/`
- Utility functions belong in `client/src/lib/`
- Use proper TypeScript interfaces and types

### Calculator Development
- All physics calculations should be scientifically accurate
- Include proper input validation using Zod schemas
- Add comprehensive error handling
- Test calculations with known values

### UI/UX Guidelines
- Follow mobile-first responsive design
- Use existing Tailwind CSS classes and design tokens
- Ensure accessibility standards (ARIA labels, keyboard navigation)
- Maintain consistent visual hierarchy

## Types of Contributions

### 1. Bug Fixes
- Check existing issues before creating new ones
- Include steps to reproduce the bug
- Test your fix thoroughly
- Update tests if applicable

### 2. New Features
- Discuss major features in an issue first
- Ensure new calculators use physics-based formulas
- Add proper documentation and examples
- Include appropriate SEO metadata

### 3. Performance Improvements
- Profile before and after changes
- Consider mobile device performance
- Optimize bundle size when possible

### 4. Documentation
- Improve README or other documentation
- Add code comments for complex logic
- Create tutorials or guides

## Pull Request Process

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the guidelines above

3. **Test thoroughly**:
   - Verify all calculators work correctly
   - Test on mobile and desktop
   - Check for TypeScript errors: `npm run check`

4. **Commit with clear messages**:
   ```bash
   git commit -m "Add: New vertical jump training calculator"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** with:
   - Clear description of changes
   - Screenshots for UI changes
   - Reference to related issues

## Code Review Process

- All submissions require review before merging
- Reviews focus on code quality, accuracy, and user experience
- Address reviewer feedback promptly
- Maintain respectful and constructive communication

## Physics and Calculations

When adding new calculators or modifying existing ones:

### Scientific Accuracy
- Use peer-reviewed formulas when available
- Include references to scientific sources
- Consider real-world biomechanical constraints
- Account for individual variations appropriately

### Input Validation
- Validate all user inputs with realistic ranges
- Provide helpful error messages
- Handle edge cases gracefully
- Use proper units and conversions

### Testing Calculations
- Test with known values and expected results
- Include boundary condition tests
- Verify formulas with multiple sources
- Consider adding unit tests for complex calculations

## SEO and Performance

### SEO Guidelines
- Add proper meta descriptions for new pages
- Include relevant keywords naturally
- Update sitemap for new routes
- Use semantic HTML structure

### Performance Considerations
- Optimize images and assets
- Minimize bundle size
- Use proper loading states
- Consider lazy loading for heavy components

## Reporting Issues

When reporting bugs or suggesting features:

1. **Check existing issues** first
2. **Use issue templates** when available
3. **Include relevant details**:
   - Browser and device information
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

## Getting Help

- Open an issue for questions
- Check existing documentation
- Review similar implementations in the codebase

## Recognition

Contributors will be recognized in the project README and release notes.

Thank you for helping make the Basketball Dunk Calculator better for athletes and basketball enthusiasts worldwide!