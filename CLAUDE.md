# Georgian Income Converter - Development Guide

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Code Style Guidelines
- **Imports**: Group imports by type (React, external libraries, internal components, types, utils)
- **Types**: Use TypeScript interfaces for object types, explicit typing for state variables
- **Components**: Use React.FC<Props> type for functional components
- **Naming**: 
  - Components: PascalCase (e.g., TransactionForm)
  - Files: PascalCase for components, kebab-case for utilities
  - Variables: camelCase
- **Error Handling**: Use try/catch for async operations, log errors with console.error
- **State Management**: Use React useState/useEffect hooks
- **Formatting**: Use consistent indentation (2 spaces)
- **Path Aliases**: Use '@/' for src directory imports (e.g., @/utils/types)
- **UI Components**: Use shadcn/ui component library with Georgian styling theme

## Project Structure
- Components in src/components
- Utility functions in src/utils
- Pages in src/pages
- Types in src/utils/types.ts