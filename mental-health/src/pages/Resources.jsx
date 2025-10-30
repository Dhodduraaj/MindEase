export default function Resources() {
  const videos = [
    {
      id: 'dQw4w9WgXcQ',
      title: '5-Minute Breathing Exercise',
      description: 'Guided breathing for stress relief',
      category: 'meditation'
    },
    {
      id: 'inpok4MKVLM',
      title: 'Mindfulness Meditation',
      description: '10-minute guided meditation',
      category: 'meditation'
    },
    {
      id: 'ZToicYcHIOU',
      title: 'Progressive Muscle Relaxation',
      description: 'Body relaxation technique',
      category: 'relaxation'
    }
  ]

  const asmrVideos = [
    {
      id: 'jfKfPfyJRdk',
      title: 'ASMR Rain Sounds for Sleep',
      description: 'Gentle rain sounds for deep relaxation and sleep',
      duration: '10:00:00'
    },
    {
      id: 'q76bMsUWw2c',
      title: 'ASMR Ocean Waves',
      description: 'Calming ocean waves for meditation and focus',
      duration: '3:00:00'
    },
    {
      id: 'u3dD9YgFzUI',
      title: 'ASMR Whispered Affirmations',
      description: 'Soft spoken positive affirmations for self-care',
      duration: '45:00'
    },
    {
      id: '1ZYbU82GVz4',
      title: 'ASMR Gentle Hand Movements',
      description: 'Soothing hand movements and soft sounds',
      duration: '25:00'
    },
    {
      id: 'rUxyKA_-grg',
      title: 'ASMR Forest Ambience',
      description: 'Peaceful forest sounds with birds and wind',
      duration: '8:00:00'
    },
    {
      id: '6N1I7LhX2eE',
      title: 'ASMR White Noise',
      description: 'Soft white noise for concentration and sleep',
      duration: '11:00:00'
    }
  ]

  const relaxingVideos = [
    {
      id: 'yIQd2Ya0Ziw',
      title: 'Peaceful Piano Music',
      description: 'Beautiful piano melodies for relaxation',
      duration: '2:00:00'
    },
    {
      id: 'UfcAVejslrU',
      title: 'Nature Sounds & Soft Music',
      description: 'Combined nature sounds with gentle music',
      duration: '3:00:00'
    },
    {
      id: 'L_LUpnjgPso',
      title: 'Meditation Music for Sleep',
      description: 'Calming music designed for deep sleep',
      duration: '8:00:00'
    },
    {
      id: '1o9BwRfHZ8g',
      title: 'Flowing Water Meditation',
      description: 'Stream and waterfall sounds for mindfulness',
      duration: '1:00:00'
    },
    {
      id: '3NycM9lYdWU',
      title: 'Gentle Guitar & Nature',
      description: 'Soft guitar with natural soundscapes',
      duration: '4:00:00'
    }
  ]

  const articles = [
    {
      title: 'Understanding Anxiety: A Complete Guide',
      description: 'Learn about anxiety disorders, symptoms, and coping strategies.',
      link: 'https://www.helpguide.org/articles/anxiety/anxiety-disorders-and-anxiety-attacks.htm'
    },
    {
      title: 'Depression: Signs, Symptoms, and Treatment',
      description: 'Comprehensive information about depression and available treatments.',
      link: 'https://www.nimh.nih.gov/health/topics/depression'
    },
    {
      title: 'Building Resilience: How to Bounce Back',
      description: 'Strategies for developing mental resilience and emotional strength.',
      link: 'https://www.apa.org/topics/resilience'
    },
    {
      title: 'Mindfulness and Mental Health',
      description: 'The benefits of mindfulness practice for mental wellbeing.',
      link: 'https://www.mindful.org/mindfulness-mental-health/'
    },
    {
      title: 'Sleep and Mental Health',
      description: 'The connection between sleep quality and mental health.',
      link: 'https://www.sleepfoundation.org/mental-health'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center float-animation">
            <span className="text-white text-xl">📚</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Mental Health Resources
          </h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Curated collection of videos, articles, and tools to support your mental health journey.
        </p>
      </div>
      
      {/* Enhanced Crisis Support */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-400 p-6 rounded-xl animate-slideIn">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-lg">🚨</span>
          </div>
          <h3 className="text-xl font-bold text-red-800">Crisis Support</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-700 mb-3 flex items-center space-x-2">
              <span>📞</span>
              <span>Emergency Hotlines</span>
            </h4>
            <ul className="space-y-2">
              <li><a className="text-blue-700 hover:text-blue-800 underline transition-colors" href="https://988lifeline.org" target="_blank">988 Suicide & Crisis Lifeline (US)</a></li>
              <li><a className="text-blue-700 hover:text-blue-800 underline transition-colors" href="https://www.samaritans.org" target="_blank">Samaritans (UK & ROI)</a></li>
              <li><a className="text-blue-700 hover:text-blue-800 underline transition-colors" href="https://www.crisistextline.org" target="_blank">Crisis Text Line</a></li>
            </ul>
          </div>
          <div className="bg-white/50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-700 mb-3 flex items-center space-x-2">
              <span>🌍</span>
              <span>International Resources</span>
            </h4>
            <ul className="space-y-2">
              <li><a className="text-blue-700 hover:text-blue-800 underline transition-colors" href="https://www.befrienders.org" target="_blank">Befrienders Worldwide</a></li>
              <li><a className="text-blue-700 hover:text-blue-800 underline transition-colors" href="https://www.iasp.info/resources/Crisis_Centres/" target="_blank">IASP Crisis Centres</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* ASMR Videos Section */}
      

      {/* Relaxing Music Videos */}
      <div className="card p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center float-animation">
            <span className="text-white text-lg">🎵</span>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Relaxing Music & Nature Sounds
          </h3>
        </div>
        <p className="text-gray-600 mb-6 text-center max-w-2xl mx-auto">
          Peaceful music and natural soundscapes to help you unwind and find inner calm.
        </p>
        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {relaxingVideos.map((video, index) => (
            <div 
              key={index} 
              className="group border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-blue-300 transition-all duration-300 interactive-hover animate-slideIn bg-white flex-shrink-0 w-80"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center relative overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl">▶️</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white">
                <h4 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{video.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center float-animation">
            <span className="text-white text-lg">🎧</span>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            ASMR & Sleep Sounds
          </h3>
        </div>
        <p className="text-gray-600 mb-6 text-center max-w-2xl mx-auto">
          Gentle sounds and whispered content designed to help you relax, focus, and sleep better.
        </p>
        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {asmrVideos.map((video, index) => (
            <div 
              key={index} 
              className="group border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-purple-300 transition-all duration-300 interactive-hover animate-slideIn bg-white flex-shrink-0 w-80"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center relative overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl">▶️</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white">
                <h4 className="font-semibold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">{video.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Enhanced Relaxation Videos */}
      <div className="card p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-lg">🎥</span>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Guided Relaxation & Meditation
          </h3>
        </div>
        <p className="text-gray-600 mb-6 text-center max-w-2xl mx-auto">
          Professional guided sessions to help you practice mindfulness and relaxation techniques.
        </p>
        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {videos.map((video, index) => (
            <div 
              key={index} 
              className="group border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-pink-300 transition-all duration-300 interactive-hover animate-slideIn bg-white flex-shrink-0 w-80"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="aspect-video bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center relative overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">
                  {video.category}
                </div>
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl">▶️</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white">
                <h4 className="font-semibold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">{video.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mental Health Articles */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="text-lg font-semibold mb-4">📚 Mental Health Articles</h3>
        <div className="space-y-3">
          {articles.map((article, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
              <h4 className="font-medium text-blue-700 hover:text-blue-800">
                <a href={article.link} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </h4>
              <p className="text-sm text-gray-600 mt-1">{article.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Support Groups */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="text-lg font-semibold mb-4">👥 Communities & Support Groups</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Online Communities</h4>
            <ul className="space-y-1 text-sm">
              <li><a className="text-blue-700 underline" href="https://www.reddit.com/r/mentalhealth/" target="_blank">Reddit: r/mentalhealth</a></li>
              <li><a className="text-blue-700 underline" href="https://www.reddit.com/r/Anxiety/" target="_blank">Reddit: r/Anxiety</a></li>
              <li><a className="text-blue-700 underline" href="https://www.reddit.com/r/depression/" target="_blank">Reddit: r/depression</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Local Support</h4>
            <ul className="space-y-1 text-sm">
              <li><a className="text-blue-700 underline" href="https://www.meetup.com/topics/mental-health/" target="_blank">Meetup: Local Support Groups</a></li>
              <li><a className="text-blue-700 underline" href="https://www.nami.org/Support-Education" target="_blank">NAMI Support Groups</a></li>
              <li><a className="text-blue-700 underline" href="https://www.mentalhealth.gov/get-help/immediate-help" target="_blank">Mental Health.gov Resources</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Self-Help Tools */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="text-lg font-semibold mb-4">🛠️ Self-Help Tools</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Mobile Apps</h4>
            <ul className="space-y-1 text-sm">
              <li>• Headspace (Meditation & Mindfulness)</li>
              <li>• Calm (Sleep & Meditation)</li>
              <li>• Moodpath (Mood Tracking)</li>
              <li>• Sanvello (Anxiety & Depression)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Websites</h4>
            <ul className="space-y-1 text-sm">
              <li><a className="text-blue-700 underline" href="https://www.mindfulness.org" target="_blank">Mindfulness.org</a></li>
              <li><a className="text-blue-700 underline" href="https://www.psychologytoday.com" target="_blank">Psychology Today</a></li>
              <li><a className="text-blue-700 underline" href="https://www.verywellmind.com" target="_blank">Verywell Mind</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}


