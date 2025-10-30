import { useState, useEffect, useRef } from 'react'

export default function Locator() {
  const [map, setMap] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [places, setPlaces] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('hospital')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const mapRef = useRef(null)
  const markersRef = useRef([])

  const categories = [
    { id: 'hospital', name: 'Psychiatric Hospitals', icon: '🏥', type: 'hospital', keyword: 'psychiatric hospital' },
    { id: 'park', name: 'Parks & Gardens', icon: '🌳', type: 'park', keyword: 'park' },
    { id: 'meditation', name: 'Meditation Centers', icon: '🧘', type: 'point_of_interest', keyword: 'meditation center' },
    { id: 'spa', name: 'Relaxing Spas', icon: '💆', type: 'spa', keyword: 'spa wellness' },
    { id: 'yoga', name: 'Yoga Studios', icon: '🧘‍♀️', type: 'gym', keyword: 'yoga studio' },
    { id: 'counseling', name: 'Counseling Centers', icon: '💬', type: 'health', keyword: 'counseling therapy' }
  ]

  // Load Google Maps Script
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps && window.google.maps.places) return Promise.resolve()

      if (window.__mapsLoadPromise) return window.__mapsLoadPromise

      window.__mapsLoadPromise = new Promise((resolve, reject) => {
        // Define a callback to be invoked by Google Maps once loaded
        window.__initGoogleMaps = () => {
          if (window.google && window.google.maps && window.google.maps.places) {
            resolve()
          } else {
            reject(new Error('Google Maps loaded but libraries missing'))
          }
        }

        const script = document.createElement('script')
        const params = new URLSearchParams({
          key: 'AIzaSyA-rmLl9FB6bQdB0XLtiAOuuoXf04YuFMY',
          libraries: 'places,geometry',
          v: 'weekly',
          loading: 'async',
          callback: '__initGoogleMaps'
        })
        script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`
        script.async = true
        script.defer = true
        script.onerror = (e) => reject(e)
        document.head.appendChild(script)
      })

      return window.__mapsLoadPromise
    }

    loadGoogleMaps()
      .then(() => {
        console.log('Google Maps loaded successfully')
      })
      .catch(err => {
        console.error('Failed to load Google Maps:', err)
        setError('Failed to load Google Maps. If you use an ad blocker, please allow maps.googleapis.com and gstatic.com, then refresh.')
      })
  }, [])

  // Get user location and initialize map
  useEffect(() => {
    if (!(window.google && window.google.maps)) return

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          setUserLocation(location)
          initializeMap(location)
        },
        (error) => {
          console.error('Geolocation error:', error)
          // Default to a location (e.g., New York)
          const defaultLocation = { lat: 40.7128, lng: -74.0060 }
          setUserLocation(defaultLocation)
          initializeMap(defaultLocation)
          setError('Location access denied. Showing default location.')
        }
      )
    } else {
      setError('Geolocation is not supported by your browser.')
    }
  }, [])

  const initializeMap = (location) => {
    if (!mapRef.current || !window.google) return

    const newMap = new window.google.maps.Map(mapRef.current, {
      center: location,
      zoom: 13,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    })

    // Add user location marker
    new window.google.maps.Marker({
      position: location,
      map: newMap,
      title: 'Your Location',
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#4285F4',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2
      }
    })

    setMap(newMap)
  }

  const searchNearbyPlaces = (category) => {
    if (!map || !userLocation || !window.google) return

    setLoading(true)
    setError('')
    setSelectedCategory(category.id)

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null))
    markersRef.current = []

    const service = new window.google.maps.places.PlacesService(map)
    
    const request = {
      location: userLocation,
      radius: 5000, // 5km radius
      type: category.type,
      keyword: category.keyword
    }

    service.nearbySearch(request, (results, status) => {
      setLoading(false)
      
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results.slice(0, 10)) // Limit to 10 results
        
        // Add markers for each place
        results.slice(0, 10).forEach((place, index) => {
          const marker = new window.google.maps.Marker({
            position: place.geometry.location,
            map: map,
            title: place.name,
            label: {
              text: `${index + 1}`,
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold'
            },
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 15,
              fillColor: '#10b981',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2
            }
          })

          // Add click listener to marker
          marker.addListener('click', () => {
            const infoWindow = new window.google.maps.InfoWindow({
              content: `
                <div style="padding: 10px;">
                  <h3 style="margin: 0 0 5px 0; font-weight: bold;">${place.name}</h3>
                  <p style="margin: 0; color: #666;">${place.vicinity}</p>
                  ${place.rating ? `<p style="margin: 5px 0 0 0;">⭐ ${place.rating}/5</p>` : ''}
                </div>
              `
            })
            infoWindow.open(map, marker)
          })

          markersRef.current.push(marker)
        })

        // Fit map to show all markers
        const bounds = new window.google.maps.LatLngBounds()
        bounds.extend(userLocation)
        results.slice(0, 10).forEach(place => {
          bounds.extend(place.geometry.location)
        })
        map.fitBounds(bounds)
      } else {
        setError('No places found nearby. Try a different category.')
        setPlaces([])
      }
    })
  }

  const getDirections = (place) => {
    const destination = `${place.geometry.location.lat()},${place.geometry.location.lng()}`
    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${destination}`
    window.open(url, '_blank')
  }

  const calculateDistance = (place) => {
    if (!userLocation || !(window.google && window.google.maps)) return 'N/A'
    try {
      if (!window.google.maps.geometry || !window.google.maps.geometry.spherical) return 'N/A'
      const from = new window.google.maps.LatLng(userLocation.lat, userLocation.lng)
      const to = place.geometry.location
      const distance = window.google.maps.geometry.spherical.computeDistanceBetween(from, to)
      const km = (distance / 1000).toFixed(1)
      return `${km} km`
    } catch {
      return 'N/A'
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-3xl">📍</span>
          </div>
          <div className="text-left">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Nearby Mental Health & Wellness
            </h1>
            <p className="text-gray-600">Find psychiatric hospitals, parks, and relaxing places near you</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <p className="text-yellow-700">{error}</p>
        </div>
      )}

      {/* Category Selection */}
      <div className="card p-6">
        <h3 className="text-xl font-semibold mb-4">Select Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => searchNearbyPlaces(category)}
              disabled={loading}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'border-green-500 bg-green-50 shadow-lg'
                  : 'border-gray-200 hover:border-green-300 hover:shadow-md'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <div className="text-sm font-medium text-gray-700">{category.name}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <div className="card p-4">
            <div 
              ref={mapRef} 
              className="w-full h-[600px] rounded-lg"
              style={{ minHeight: '600px' }}
            />
            {loading && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Searching nearby places...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Places List */}
        <div className="lg:col-span-1">
          <div className="card p-6 max-h-[600px] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4 sticky top-0 bg-white pb-2">
              {places.length > 0 ? `Found ${places.length} Places` : 'Select a category'}
            </h3>
            
            {places.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-gray-500">Select a category above to find nearby places</p>
              </div>
            )}

            <div className="space-y-3">
              {places.map((place, index) => (
                <div 
                  key={place.place_id}
                  className="p-4 bg-gradient-to-br from-gray-50 to-green-50 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800 mb-1">{place.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{place.vicinity}</p>
                      
                      <div className="flex items-center space-x-3 text-sm mb-3">
                        {place.rating && (
                          <span className="text-yellow-600 font-medium">
                            ⭐ {place.rating}/5
                          </span>
                        )}
                        <span className="text-green-600 font-medium">
                          📍 {calculateDistance(place)}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => getDirections(place)}
                          className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          🧭 Directions
                        </button>
                        {place.opening_hours && (
                          <div className={`px-3 py-2 rounded-lg text-sm font-medium ${
                            place.opening_hours.open_now 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {place.opening_hours.open_now ? '✓ Open' : '✗ Closed'}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card p-4 text-center">
          <div className="text-3xl mb-2">🗺️</div>
          <h3 className="font-semibold text-gray-800 mb-1">Real-time Location</h3>
          <p className="text-sm text-gray-600">Uses your current location for accurate results</p>
        </div>
        <div className="card p-4 text-center">
          <div className="text-3xl mb-2">📍</div>
          <h3 className="font-semibold text-gray-800 mb-1">5km Radius</h3>
          <p className="text-sm text-gray-600">Searches within 5 kilometers from your location</p>
        </div>
        <div className="card p-4 text-center">
          <div className="text-3xl mb-2">🧭</div>
          <h3 className="font-semibold text-gray-800 mb-1">Easy Navigation</h3>
          <p className="text-sm text-gray-600">Get directions directly to Google Maps</p>
        </div>
      </div>
    </div>
  )
}
