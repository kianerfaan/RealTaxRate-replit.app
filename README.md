# RealTaxRate.replit.app - International Tax Calculator

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Previously RealTaxRate.com, sold to dmcanomore via Namecheap on May 12, 2025. A comprehensive international tax calculator web application designed to provide detailed tax insights across multiple countries. This user-friendly application calculates effective tax rates, marginal tax rates, and provides personalized tax insights based on your income.

## Features

- **Multi-Country Support**: Calculate taxes for the US, Canada, UK, Japan, Australia, and more
- **Real-Time Calculation**: Instant tax calculations with detailed breakdowns
- **Interactive UI**: Clean, responsive interface built with modern web technologies
- **Solopreneur Calculator**: Specialized tool for freelancers and small business owners
- **Tax Insights**: Get personalized explanations of your tax situation

## Live Demo

Visit [RealTaxRate.com](https://realtaxrate.com) to try the calculator.

## Technology Stack

- **Frontend**: React, TypeScript, TailwindCSS, shadcn/ui components
- **Backend**: Node.js, Express
- **State Management**: TanStack React Query
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: TailwindCSS with custom color scheme
- **Routing**: Wouter for lightweight client-side routing

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/realtaxrate.git
   cd realtaxrate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

## Project Structure

```
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   └── pages/         # Page components
├── server/                # Backend Express application
│   ├── routes.ts          # API routes
│   └── storage.ts         # Data storage implementation
└── shared/                # Shared TypeScript types and schemas
    └── schema.ts          # Zod schemas and types
```

## API Documentation

### Calculate Tax

**Endpoint**: `POST /api/calculate-tax`

**Request Body**:
```json
{
  "country": "US",
  "grossIncome": 75000
}
```

**Response**:
```json
{
  "id": 1,
  "country": "US",
  "grossIncome": 75000,
  "taxableIncome": 60400,
  "totalTax": 9374.5,
  "effectiveRate": 12.5,
  "marginalRate": 22,
  "insights": "Based on your income of USD 75,000 in United States, you're in the 22% marginal tax bracket. Your effective tax rate is 12.50%, meaning you pay an average of 12.50 cents in tax per dollar earned."
}
```

## Adding a New Country

To add support for a new country:

1. Update the `Countries` object in `shared/schema.ts`
2. Add the country's tax configuration to `COUNTRY_TAX_CONFIGS` in `server/routes.ts`
3. Include the appropriate tax brackets and standard deduction amount

Example:
```typescript
DE: {
  name: "Germany",
  currency: "EUR",
  brackets: [
    { min: 277826, rate: 0.45 },
    { min: 57919, max: 277825, rate: 0.42 },
    { min: 10348, max: 57918, rate: 0.14 },
    { min: 0, max: 10347, rate: 0 },
  ],
  standardDeduction: 9744,
},
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Guidelines for Contributors

- Follow the existing code style and conventions
- Add unit tests for any new or changed functionality
- Update documentation as needed
- Ensure all tests pass before submitting your Pull Request

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This calculator provides estimates only and should not be considered financial advice. Tax regulations change frequently, and calculations may not reflect the most current tax laws. Always consult with a qualified tax professional for advice specific to your situation.

## Contact

Project Link: [https://github.com/kianerfaan/realtaxrate](https://github.com/kianerfaan/realtaxrate)

---

Made with ❤️ by Kian Erfaan
