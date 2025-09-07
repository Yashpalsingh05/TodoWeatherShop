'use client'

import { useState, useEffect } from 'react'
import { MapPin, Thermometer, Eye, Wind, Droplets, Gauge, RefreshCw } from 'lucide-react'
import WeatherWidget from '../../components/WeatherWidget'

interface ExtendedWeatherData {
  city: string
  temperature: number
  description: string
  humidity: number
  windSpeed: number
  visibility: number
  pressure: number
  feelsLike: number
  uvIndex: number
  sunrise: string
  sunset: string
  forecast: {
    day: string
    high: number
    low: number
    description: string
    icon: string
  }[]
}

export default function WeatherPage() {
  const [weather, setWeather] = useState<ExtendedWeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    fetchWeatherData()
  }, [])

  const fetchWeatherData = async () => {
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock extended weather data
    const mockWeather: ExtendedWeatherData = {
      city: 'New York',
      temperature: Math.floor(Math.random() * 30) + 10,
      description: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 4)],
      humidity: Math.floor(Math.random() * 40) + 40,
      windSpeed: Math.floor(Math.random() * 20) + 5,
      visibility: Math.floor(Math.random() * 5) + 8,
      pressure: Math.floor(Math.random() * 50) + 1000,
      feelsLike: Math.floor(Math.random() * 30) + 12,
      uvIndex: Math.floor(Math.random() * 10) + 1,
      sunrise: '6:30 AM',
      sunset: '7:45 PM',
      forecast: [
        { day: 'Today', high: 28, low: 18, description: 'Sunny', icon: '☀️' },
        { day: 'Tomorrow', high: 25, low: 16, description: 'Partly Cloudy', icon: '⛅' },
        { day: 'Wednesday', high: 22, low: 14, description: 'Cloudy', icon: '☁️' },
        { day: 'Thursday', high: 26, low: 17, description: 'Sunny', icon: '☀️' },
        { day: 'Friday', high: 24, low: 15, description: 'Rainy', icon: '🌧️' },
      ]
    }
    
    setWeather(mockWeather)
    setLastUpdated(new Date())
    setLoading(false)
  }

  const getUVIndexLevel = (index: number) => {
    if (index <= 2) return { level: 'Low', color: 'text-green-600' }
    if (index <= 5) return { level: 'Moderate', color: 'text-yellow-600' }
    if (index <= 7) return { level: 'High', color: 'text-orange-600' }
    if (index <= 10) return { level: 'Very High', color: 'text-red-600' }
    return { level: 'Extreme', color: 'text-purple-600' }
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Weather</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-16 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="grid grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="h-64 bg-gray-300 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!weather) return null

  const uvInfo = getUVIndexLevel(weather.uvIndex)

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Weather</h1>
        <button
          onClick={fetchWeatherData}
          className="btn-secondary flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Weather Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Weather */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                <h2 className="text-2xl font-bold">{weather.city}</h2>
              </div>
              {lastUpdated && (
                <p className="text-sm text-gray-500">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {weather.temperature}°C
                </div>
                <div className="text-lg text-gray-600 mb-1">{weather.description}</div>
                <div className="text-sm text-gray-500">
                  Feels like {weather.feelsLike}°C
                </div>
              </div>
              <div className="text-6xl">
                {weather.description.includes('Sun') ? '☀️' :
                 weather.description.includes('Cloud') ? '☁️' :
                 weather.description.includes('Rain') ? '🌧️' : '🌤️'}
              </div>
            </div>

            {/* Detailed Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Thermometer className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <div className="text-sm text-gray-600">Feels Like</div>
                <div className="text-lg font-semibold">{weather.feelsLike}°C</div>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className="text-sm text-gray-600">Humidity</div>
                <div className="text-lg font-semibold">{weather.humidity}%</div>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Wind className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className="text-sm text-gray-600">Wind Speed</div>
                <div className="text-lg font-semibold">{weather.windSpeed} km/h</div>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Eye className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <div className="text-sm text-gray-600">Visibility</div>
                <div className="text-lg font-semibold">{weather.visibility} km</div>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Gauge className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <div className="text-sm text-gray-600">Pressure</div>
                <div className="text-lg font-semibold">{weather.pressure} hPa</div>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-6 h-6 mx-auto mb-2 text-2xl">🔆</div>
                <div className="text-sm text-gray-600">UV Index</div>
                <div className={`text-lg font-semibold ${uvInfo.color}`}>
                  {weather.uvIndex} ({uvInfo.level})
                </div>
              </div>
            </div>
          </div>

          {/* Sun Times */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Sun Times</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">🌅</div>
                <div>
                  <div className="text-sm text-gray-600">Sunrise</div>
                  <div className="font-semibold">{weather.sunrise}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-2xl">🌇</div>
                <div>
                  <div className="text-sm text-gray-600">Sunset</div>
                  <div className="font-semibold">{weather.sunset}</div>
                </div>
              </div>
            </div>
          </div>

          {/* 5-Day Forecast */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">5-Day Forecast</h3>
            <div className="grid grid-cols-5 gap-4">
              {weather.forecast.map((day, index) => (
                <div key={index} className="text-center">
                  <div className="text-sm text-gray-600 mb-2">{day.day}</div>
                  <div className="text-2xl mb-2">{day.icon}</div>
                  <div className="text-sm font-semibold">{day.high}°</div>
                  <div className="text-sm text-gray-500">{day.low}°</div>
                  <div className="text-xs text-gray-500 mt-1">{day.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weather Widget */}
        <div className="lg:col-span-1">
          <WeatherWidget />
        </div>
      </div>
    </div>
  )
}
