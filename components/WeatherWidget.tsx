'use client'

import { useState, useEffect } from 'react'
import { Cloud, Sun, CloudRain, CloudSnow, MapPin, Thermometer, Eye, Wind } from 'lucide-react'

interface WeatherData {
  city: string
  temperature: number
  description: string
  humidity: number
  windSpeed: number
  visibility: number
  icon: string
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null)

  // Get user's location
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
        },
        (error) => {
          console.error('Error getting location:', error)
          // Default to New York if geolocation fails
          setLocation({ lat: 40.7128, lon: -74.0060 })
        }
      )
    } else {
      // Default location if geolocation is not supported
      setLocation({ lat: 40.7128, lon: -74.0060 })
    }
  }, [])

  // Fetch weather data
  useEffect(() => {
    if (!location) return

    const fetchWeather = async () => {
      try {
        setLoading(true)
        // For demo purposes, we'll use mock data
        // In a real app, you'd use: `/api/weather?lat=${location.lat}&lon=${location.lon}`
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock weather data
        const mockWeather: WeatherData = {
          city: 'New York',
          temperature: Math.floor(Math.random() * 30) + 10, // 10-40°C
          description: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 4)],
          humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
          windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
          visibility: Math.floor(Math.random() * 5) + 8, // 8-12 km
          icon: '01d'
        }
        
        setWeather(mockWeather)
        setError(null)
      } catch (err) {
        setError('Failed to fetch weather data')
        console.error('Weather fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [location])

  const getWeatherIcon = (description: string) => {
    switch (description.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className="w-8 h-8" />
      case 'partly cloudy':
      case 'cloudy':
        return <Cloud className="w-8 h-8" />
      case 'rainy':
      case 'rain':
        return <CloudRain className="w-8 h-8" />
      case 'snow':
      case 'snowy':
        return <CloudSnow className="w-8 h-8" />
      default:
        return <Cloud className="w-8 h-8" />
    }
  }

  if (loading) {
    return (
      <div className="weather-card">
        <div className="animate-pulse">
          <div className="h-4 bg-white/20 rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-white/20 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-white/20 rounded w-2/3"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card border-red-200 bg-red-50">
        <div className="text-red-600 text-center">
          <Cloud className="w-12 h-12 mx-auto mb-2" />
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 text-sm underline"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  if (!weather) return null

  return (
    <div className="weather-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4" />
          <span className="font-medium">{weather.city}</span>
        </div>
        {getWeatherIcon(weather.description)}
      </div>
      
      <div className="mb-4">
        <div className="text-3xl font-bold mb-1">{weather.temperature}°C</div>
        <div className="text-blue-100">{weather.description}</div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="flex flex-col items-center">
          <Thermometer className="w-4 h-4 mb-1" />
          <span className="text-blue-100">Humidity</span>
          <span className="font-medium">{weather.humidity}%</span>
        </div>
        <div className="flex flex-col items-center">
          <Wind className="w-4 h-4 mb-1" />
          <span className="text-blue-100">Wind</span>
          <span className="font-medium">{weather.windSpeed} km/h</span>
        </div>
        <div className="flex flex-col items-center">
          <Eye className="w-4 h-4 mb-1" />
          <span className="text-blue-100">Visibility</span>
          <span className="font-medium">{weather.visibility} km</span>
        </div>
      </div>
    </div>
  )
}

