# Uangku - Personal Finance Mobile App

![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?style=for-the-badge&logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.76-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript)

> A beautiful, modern personal finance mobile app with glassmorphism UI and comprehensive financial management features.

## ✨ Features

### 🔐 Authentication
- Email/Password authentication
- Biometric authentication (Fingerprint/Face ID)
- Google OAuth (placeholder)
- Phone OTP (placeholder)
- Beautiful onboarding experience

### 📊 Dashboard
- Total balance overview
- Income vs Expenses tracking
- Monthly transfer limit indicator
- Financial goals preview
- Spending charts (Pie, Line, Bar)
- Quick action buttons
- Recent transactions

### 💰 Transaction Management
- Add/Edit/Delete transactions
- Category-based organization
- Transaction filtering (type, date)
- Income & Expense tracking
- Custom categories support
- Transaction tags

### 💵 Budget Management
- Create budgets per category
- Budget progress tracking
- Visual progress indicators
- Budget limit alerts
- Monthly/Weekly periods

### 🎯 Financial Goals
- Set financial goals
- Track progress
- Deadline management
- Visual progress bars
- Multiple goals support

### 📈 Financial Reports
- **Income Statement** (Laba Rugi)
- **Cash Flow Statement** (Arus Kas)
- **Balance Sheet** (Neraca)
- Interactive charts
- Trend analysis

### 🎨 Design
- **Glassmorphism UI** with blur effects
- **Purple-Pink gradient** theme
- **Dark/Light mode** support
- **Smooth animations** with Reanimated
- **Responsive design**

### 🌐 Internationalization
- English (EN)
- Indonesian (ID)
- Easy language switching

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo Go app (for testing on phone)
- Android Studio or Xcode (for emulator)

### Installation

```bash
# Clone repository
git clone https://github.com/zegerindonesia-oss/Uangku.git
cd Uangku/uangku-app

# Install dependencies
npm install

# Start development server
npx expo start
```

### Testing on Phone

1. Install **Expo Go** on your smartphone
   - [Android - Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

2. Scan QR code from terminal with Expo Go

3. App will load on your phone!

### Testing on Emulator

```bash
# Android
npx expo start --android

# iOS (Mac only)
npx expo start --ios
```

## 📱 Tech Stack

### Core
- **Expo SDK 54** - React Native framework
- **TypeScript** - Type safety
- **React Navigation** - Navigation

### UI & Styling
- **expo-linear-gradient** - Gradient backgrounds
- **react-native-reanimated** - Smooth animations
- **react-native-chart-kit** - Beautiful charts
- **@expo/vector-icons** - Icon library

### Database
- **expo-sqlite** - Local database
- **drizzle-orm** - Type-safe ORM

### Authentication
- **expo-local-authentication** - Biometric auth
- **expo-crypto** - Password hashing
- **expo-secure-store** - Secure storage

### Utilities
- **react-i18next** - Internationalization
- **@react-native-async-storage/async-storage** - Local storage
- **@react-native-community/datetimepicker** - Date picker

## 📂 Project Structure

```
uangku-app/
├── app/                    # Screens (Expo Router)
│   ├── (auth)/            # Authentication screens
│   │   ├── onboarding.tsx
│   │   ├── login.tsx
│   │   └── signup.tsx
│   ├── (tabs)/            # Main app tabs
│   │   ├── index.tsx      # Dashboard
│   │   ├── transactions.tsx
│   │   ├── budget.tsx
│   │   ├── goals.tsx
│   │   └── reports.tsx
│   └── transaction/       # Transaction CRUD
├── components/            # Reusable components
│   ├── ui/               # UI components
│   ├── dashboard/        # Dashboard components
│   ├── transaction/      # Transaction components
│   ├── budget/           # Budget components
│   ├── goal/             # Goal components
│   └── charts/           # Chart components
├── contexts/             # React contexts
│   ├── ThemeContext.tsx
│   └── LanguageContext.tsx
├── services/             # Business logic
│   ├── auth/
│   ├── database/
│   └── transactionService.ts
├── theme/                # Theme configuration
│   ├── colors.ts
│   ├── typography.ts
│   └── spacing.ts
├── utils/                # Utility functions
│   ├── formatters.ts
│   └── validators.ts
└── locales/              # Translations
    ├── en.json
    └── id.json
```

## 🎨 Design System

### Colors
- **Primary**: Purple (#8B5CF6) → Blue (#3B82F6) → Pink (#EC4899)
- **Success**: Green (#10B981)
- **Error**: Red (#EF4444)
- **Warning**: Orange (#F59E0B)

### Typography
- **Font Family**: Inter/Poppins
- **Sizes**: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl
- **Weights**: regular, medium, semibold, bold

### Spacing
- **Scale**: xs, sm, base, lg, xl, 2xl, 3xl, 4xl

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm start

# Start with cache clear
npm start -- -c

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web (limited features)
npm run web

# Type checking
npm run type-check

# Linting
npm run lint
```

### Database Schema

```typescript
// Users
users {
  id: string
  email: string
  passwordHash: string
  name: string
  biometricEnabled: boolean
}

// Transactions
transactions {
  id: string
  userId: string
  type: 'income' | 'expense'
  category: string
  amount: number
  date: Date
  note: string
}

// Budgets
budgets {
  id: string
  userId: string
  category: string
  limitAmount: number
  spentAmount: number
  period: 'monthly' | 'weekly'
}

// Goals
goals {
  id: string
  userId: string
  goalName: string
  targetAmount: number
  currentAmount: number
  deadline: Date
}
```

## 📊 Progress

- [x] **Phase 1**: Project Setup & Architecture (100%)
- [x] **Phase 2**: Design System & UI Components (100%)
- [x] **Phase 3**: Authentication & User Management (90%)
- [x] **Phase 4**: Dashboard & Home Screen (100%)
- [x] **Phase 5**: Transaction Management (85%)
- [x] **Phase 6**: Budget & Planning (70%)
- [x] **Phase 7**: Financial Goals (60%)
- [x] **Phase 8**: Reports & Analytics (60%)
- [ ] **Phase 9**: AI Financial Advisor (0%)
- [ ] **Phase 10**: Additional Features (20%)
- [ ] **Phase 11**: Testing & Optimization (0%)
- [ ] **Phase 12**: Deployment Preparation (0%)

## 🚧 Roadmap

### Short Term
- [ ] Complete navigation configuration
- [ ] Add search functionality
- [ ] Implement export to Excel/PDF
- [ ] Add push notifications
- [ ] Create settings screen

### Medium Term
- [ ] AI Financial Advisor integration
- [ ] Spending pattern analysis
- [ ] Budget alerts & reminders
- [ ] Goal achievement notifications
- [ ] Data backup/restore

### Long Term
- [ ] Subscription system (14-day trial)
- [ ] Play Store deployment
- [ ] App Store deployment
- [ ] Multi-currency support
- [ ] Bank account integration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Zeger Indonesia**
- GitHub: [@zegerindonesia-oss](https://github.com/zegerindonesia-oss)

## 🙏 Acknowledgments

- Expo team for the amazing framework
- React Native community
- All contributors and testers

---

**Made with ❤️ using Expo React Native**
