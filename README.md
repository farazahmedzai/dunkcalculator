# Basketball Dunk Calculator

Professional basketball dunk calculator with physics-based calculations and interactive visualizations for athletes and basketball enthusiasts.

## 🏀 Features

- **Dunk Requirements Calculator** - Calculate exact vertical jump needed to dunk
- **Multiple Calculator Types**:
  - Vertical Jump Calculator
  - Standing Reach Calculator
  - Approach vs Standing Jump Comparison
  - Jump Fatigue Calculator
  - Max Potential Jump Calculator
  - Ideal Body Weight Calculator
- **Interactive Visualizations** - Physics-based jump trajectory graphs
- **Training Guides** - Comprehensive basketball training content
- **Mobile Responsive** - Works perfectly on all devices

## 🚀 Live Demo

Visit the live application: [https://dunk-calculator.info](https://dunk-calculator.info)

## 🛠️ Tech Stack

- **Frontend**: React.js, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js
- **UI Components**: Radix UI, shadcn/ui
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation
- **Routing**: Wouter
- **State Management**: TanStack Query

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dunk-calculator.git
cd dunk-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open [http://localhost:5000](http://localhost:5000) in your browser

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route pages
│   │   ├── lib/           # Utilities and calculations
│   │   └── hooks/         # Custom React hooks
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   └── storage.ts        # Data storage
├── shared/               # Shared types and schemas
└── public/              # Static assets
```

## 🎯 Key Features Explained

### Physics-Based Calculations
- Accurate vertical jump requirements using biomechanics formulas
- Real-time hang time and power output calculations
- Height, reach, and rim clearance considerations

### Interactive Visualizations
- Dynamic jump trajectory graphs
- Visual feedback for calculation results
- Mobile-optimized chart displays

### Comprehensive Calculators
- **Dunk Calculator**: Main calculator for dunk requirements
- **Vertical Jump**: Measure and analyze jump performance
- **Standing Reach**: Calculate reach based on body measurements
- **Comparison Tools**: Compare different jumping techniques
- **Training Optimization**: Fatigue analysis and potential calculators

## 🔧 Configuration

The application uses:
- Vite for fast development and building
- TypeScript for type safety
- Tailwind CSS for styling
- Express for backend API

## 📊 SEO & Performance

- Optimized meta tags and structured data
- Dynamic sitemap generation
- Mobile-first responsive design
- Fast loading times with Vite optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Support

If you find this project helpful, please give it a star ⭐ on GitHub!

For questions or support, visit: [https://dunk-calculator.info](https://dunk-calculator.info)