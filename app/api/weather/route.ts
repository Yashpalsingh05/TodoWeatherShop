import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  if (!lat || !lon) {
    return NextResponse.json(
      { error: 'Latitude and longitude are required' },
      { status: 400 }
    )
  }

  try {
    const apiKey = process.env.WEATHER_API_KEY
    
    if (!apiKey) {
      // Return mock data if no API key is configured
      const mockWeatherData = {
        city: 'New York',
        temperature: Math.floor(Math.random() * 30) + 10, // 10-40°C
        description: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 4)],
        humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
        windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
        visibility: Math.floor(Math.random() * 5) + 8, // 8-12 km
        icon: '01d'
      }
      
      return NextResponse.json(mockWeatherData)
    }

    // Fetch weather data from OpenWeatherMap API
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    )

    if (!weatherResponse.ok) {
      throw new Error('Weather API request failed')
    }

    const weatherData = await weatherResponse.json()

    // Transform the data to match our interface
    const transformedData = {
      city: weatherData.name,
      temperature: Math.round(weatherData.main.temp),
      description: weatherData.weather[0].description
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      humidity: weatherData.main.humidity,
      windSpeed: Math.round(weatherData.wind.speed * 3.6), // Convert m/s to km/h
      visibility: Math.round(weatherData.visibility / 1000), // Convert m to km
      icon: weatherData.weather[0].icon
    }

    return NextResponse.json(transformedData)
  } catch (error) {
    console.error('Weather API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    )
  }
}
