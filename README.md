# RealTaxRate.com - 2024 Tax Calculator

A modern, user-friendly tax calculator web application powered by React and Express, designed to provide intuitive and detailed tax insights for US taxpayers.

## Features

- Real-time tax calculation based on 2024 federal tax brackets
- Detailed breakdown of tax metrics (total tax, effective rate, marginal rate)
- AI-powered tax insights
- Mobile-responsive design
- Professional UI with accessibility features

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, shadcn/ui
- **Backend**: Express.js, Node.js
- **State Management**: TanStack Query
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: TailwindCSS with shadcn/ui components
- **Type Safety**: TypeScript, Zod

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   This will start both the frontend and backend servers.

## Project Structure

```
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility functions
│   │   └── pages/       # Page components
├── server/               # Backend Express application
│   ├── routes.ts        # API routes
│   └── storage.ts       # Data storage implementation
└── shared/              # Shared TypeScript types and schemas
    └── schema.ts        # Zod schemas and types
```

## Key Components

### Frontend

- `TaxCalculator`: Main component for tax calculation input
- `TaxResults`: Displays calculated tax metrics and insights
- `tax-utils.ts`: Currency and percentage formatting utilities

### Backend

- `routes.ts`: Contains the tax calculation logic and API endpoints
- `storage.ts`: Handles data persistence
- `schema.ts`: Defines data models and validation schemas

## API Documentation

### Calculate Tax

**Endpoint**: `POST /api/calculate-tax`

**Request Body**:
```typescript
{
  grossIncome: number; // Annual gross income
}
```

**Response**:
```typescript
{
  id: number;
  grossIncome: number;
  taxableIncome: number;
  totalTax: number;
  effectiveRate: number;
  marginalRate: number;
  insights: string;
}
```

## Maintenance Guidelines

### Adding New Tax Brackets

1. Update the tax bracket constants in `server/routes.ts`
2. Update the standard deduction value if needed
3. Modify the tax calculation logic if brackets change

### Updating Tax Logic

The tax calculation logic is located in `server/routes.ts`. When updating:
1. Ensure all bracket calculations are accurate
2. Update the insights generation
3. Test with various income levels

### UI Customization

1. Theme colors are defined in `theme.json`
2. Component styles use TailwindCSS classes
3. Global styles are in `client/src/index.css`

## Error Handling

The application includes comprehensive error handling:
- Frontend form validation using Zod
- API error responses with meaningful messages
- Global error boundary for React components

## Testing

Manual testing checklist:
1. Verify calculations against IRS tables
2. Test edge cases (very low/high incomes)
3. Verify mobile responsiveness
4. Check accessibility features

## Contributing

1. Create a new branch for your feature
2. Follow the existing code style
3. Add appropriate types and validation
4. Test thoroughly before submitting changes

## Disclaimer

This calculator provides estimates for informational purposes only and does not constitute financial or tax advice. Always consult a qualified tax professional for advice specific to your situation.

## License

Apache-2.0 - See LICENSE file for details
