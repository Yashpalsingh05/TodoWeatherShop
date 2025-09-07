#!/bin/bash

echo "🚀 Setting up Todo Weather Ecommerce App..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🗄️ Setting up database..."
npx prisma generate
npx prisma db push

echo "🌱 Seeding database with sample data..."
npm run db:seed

echo "✅ Setup complete!"
echo ""
echo "🎉 You can now run the application with:"
echo "   npm run dev"
echo ""
echo "📖 Don't forget to:"
echo "   1. Create a .env.local file with your environment variables"
echo "   2. Get a free API key from OpenWeatherMap for real weather data"
echo "   3. Check the README.md for detailed instructions"
echo ""
echo "🌐 The app will be available at: http://localhost:3000"

