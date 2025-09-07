# Todo Weather Ecommerce App

A comprehensive web application built with **Next.js 14** and **TypeScript** that combines todo management, weather information, and ecommerce functionality in one seamless platform.

## 🚀 Features

### 📝 Todo Management
- ✅ Create, read, update, and delete todos
- 🎯 Priority levels (Low, Medium, High)
- 📅 Due date tracking with smart date formatting
- ✔️ Mark todos as complete/incomplete
- 📱 Responsive design with beautiful UI

### 🌤️ Weather Integration
- 🌍 Location-based weather data
- 📊 Detailed weather information (temperature, humidity, wind speed, etc.)
- 🔮 5-day weather forecast
- 🌅 Sunrise and sunset times
- ☀️ UV index with safety levels
- 🔄 Real-time weather updates

### 🛒 Ecommerce Platform
- 🛍️ Product catalog with search and filtering
- 📱 Responsive product grid and list views
- 🛒 Shopping cart functionality
- 💰 Order summary with tax and shipping calculation
- ⭐ Product ratings and reviews
- 📦 Inventory management

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom components
- **Database**: SQLite with Prisma ORM
- **Icons**: Lucide React
- **State Management**: React Context API
- **API**: Next.js API Routes

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd Ecommerce.Project
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   Create a \`.env.local\` file in the root directory:
   \`\`\`env
   # Database
   DATABASE_URL="file:./dev.db"
   
   # Weather API (Get your free API key from OpenWeatherMap)
   WEATHER_API_KEY="your_openweathermap_api_key_here"
   
   # Authentication
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-super-secret-jwt-secret"
   
   # Application
   NODE_ENV="development"
   \`\`\`

4. **Set up the database**
   \`\`\`bash
   # Generate Prisma client
   npx prisma generate
   
   # Push database schema
   npx prisma db push
   
   # Optional: View database in Prisma Studio
   npx prisma studio
   \`\`\`

5. **Seed the database (optional)**
   \`\`\`bash
   npm run db:seed
   \`\`\`

6. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌍 Weather API Setup

To get real weather data:

1. Sign up for a free account at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your API key
3. Add it to your \`.env.local\` file as \`WEATHER_API_KEY\`

**Note**: The app works with mock weather data if no API key is provided.

## 📝 Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run start\` - Start production server
- \`npm run lint\` - Run ESLint
- \`npm run db:push\` - Push database schema changes
- \`npm run db:generate\` - Generate Prisma client
- \`npm run db:studio\` - Open Prisma Studio

## 🗂️ Project Structure

\`\`\`
Ecommerce.Project/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   │   ├── todos/         # Todo CRUD operations
│   │   ├── products/      # Product management
│   │   └── weather/       # Weather API proxy
│   ├── cart/              # Shopping cart page
│   ├── shop/              # Ecommerce product catalog
│   ├── todos/             # Todo management page
│   ├── weather/           # Detailed weather page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable React components
│   ├── Navbar.tsx         # Navigation component
│   ├── Providers.tsx      # Context providers
│   ├── WeatherWidget.tsx  # Weather display widget
│   ├── TodoPreview.tsx    # Todo preview component
│   └── FeaturedProducts.tsx # Product showcase
├── lib/                   # Utility functions
│   └── db.ts             # Database client
├── prisma/               # Database schema and migrations
│   └── schema.prisma     # Prisma schema definition
└── public/               # Static assets
\`\`\`

## 🎨 Features in Detail

### Todo Management
- **Smart Prioritization**: Visual indicators for task priority levels
- **Due Date Tracking**: Intelligent date formatting (Today, Tomorrow, etc.)
- **Progress Tracking**: Visual progress bars and completion statistics
- **Responsive Design**: Works perfectly on mobile and desktop

### Weather Integration
- **Real-time Data**: Current weather conditions with detailed metrics
- **Extended Forecast**: 5-day weather predictions
- **Location-based**: Automatic location detection for personalized weather
- **Comprehensive Info**: Temperature, humidity, wind speed, UV index, and more

### Ecommerce Platform
- **Product Discovery**: Advanced search and category filtering
- **Shopping Experience**: Intuitive cart management with quantity controls
- **Order Processing**: Complete checkout flow with cost breakdown
- **Inventory Management**: Real-time stock tracking

## 🔧 Customization

### Adding New Products
Products can be added via the API or directly in the database:

\`\`\`javascript
POST /api/products
{
  "name": "Product Name",
  "description": "Product Description",
  "price": 99.99,
  "category": "Electronics",
  "stock": 10,
  "featured": true,
  "image": "https://example.com/image.jpg"
}
\`\`\`

### Modifying Styles
The app uses Tailwind CSS with custom components defined in \`globals.css\`:
- \`.btn\` - Base button styles
- \`.card\` - Card component styles
- \`.weather-card\` - Weather-specific card styles

## 📱 Mobile Responsiveness

The application is fully responsive with:
- Mobile-first design approach
- Touch-friendly interfaces
- Adaptive layouts for all screen sizes
- Mobile navigation menu

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons by [Lucide](https://lucide.dev/)
- UI components inspired by modern design principles
- Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

If you encounter any issues or have questions:
1. Check the existing [Issues](../../issues)
2. Create a new issue with detailed information
3. Join our community discussions

---

**Happy coding! 🚀**

