export default function Resources() {
  const videos = [
    {
      id: 'inpok4MKVLM',
      title: '5-Minute Meditation You Can Do Anywhere',
      description: 'A quick guided meditation by Goodful for stress relief',
      category: 'meditation'
    },
    {
      id: 'O-6f5wQXSu8',
      title: '10-Minute Meditation For Anxiety',
      description: 'Guided meditation to calm anxious thoughts by Goodful',
      category: 'meditation'
    },
    {
      id: 'aEqlQvczMJQ',
      title: '10-Minute Meditation For Sleep',
      description: 'Guided sleep meditation for deep rest by Goodful',
      category: 'relaxation'
    }
  ]

  const asmrVideos = [
    {
      id: 'yIQd2Ya0Ziw',
      title: 'Rainstorm Sounds for Relaxing & Sleep',
      description: 'Gentle rainstorm sounds for deep relaxation by Calm',
      duration: '8:00:00'
    },
    {
      id: 'WHPEKLQID4U',
      title: 'Ocean Waves Relaxation',
      description: 'Soothing waves crashing on beach - white noise for sleep',
      duration: '10:00:00'
    },
    {
      id: 'f0tpROu3hr0',
      title: 'Rain & Thunder Sounds for Sleeping',
      description: 'Heavy rain with thunder - real rain and thunderstorm sounds',
      duration: '10:00:00'
    },
    {
      id: '1ZYbU82GVz4',
      title: 'Relaxing Sleep Music & Meditation',
      description: 'Peaceful melodies for stress relief and deep sleep',
      duration: '3:00:00'
    },
    {
      id: 'jfKfPfyJRdk',
      title: 'Lofi Beats to Relax & Study To',
      description: 'Chill lofi hip hop radio for focus and relaxation',
      duration: 'Live'
    },
    {
      id: 'rUxyKA_-grg',
      title: 'Lofi Beats to Sleep & Chill To',
      description: 'Calming lofi hip hop for winding down and sleeping',
      duration: 'Live'
    }
  ]

  const relaxingVideos = [
    {
      id: 'lE6RYpe9IT0',
      title: 'Relaxing Music with Nature Sounds',
      description: 'Waterfall HD with peaceful background music',
      duration: '3:00:00'
    },
    {
      id: 'UfcAVejslrU',
      title: 'Marconi Union - Weightless',
      description: 'Scientifically designed to reduce anxiety and stress',
      duration: '8:09'
    },
    {
      id: '2OEL4P1Rz04',
      title: 'Ambient Relaxing Music for Stress Relief',
      description: 'Soothing ambient music for meditation and deep sleep',
      duration: '3:00:00'
    },
    {
      id: 'hlWiI4xVXKY',
      title: 'Sunny Mornings: Piano & Guitar Music',
      description: 'Beautiful relaxing music with piano, guitar and bird sounds',
      duration: '3:00:00'
    }
  ]


  const articles = [
    {
      title: 'Understanding Anxiety: A Complete Guide',
      description: 'Learn about anxiety disorders, symptoms, and coping strategies.',
      link: 'https://www.healthline.com/health/anxiety'
    },
    {
      title: 'Depression: Signs, Symptoms, and Treatment',
      description: 'Comprehensive information about depression and available treatments.',
      link: 'https://www.who.int/news-room/fact-sheets/detail/depression'
    },
    {
      title: 'Building Resilience: How to Bounce Back',
      description: 'Strategies for developing mental resilience and emotional strength.',
      link: 'https://www.verywellmind.com/what-is-resilience-2795099'
    },
    {
      title: 'Mindfulness and Mental Health in India',
      description: 'The benefits of mindfulness and yoga practice for mental wellbeing.',
      link: 'https://www.arthakranti.org/'
    },
    {
      title: 'Sleep and Mental Health',
      description: 'The connection between sleep quality and mental health.',
      link: 'https://www.sleepfoundation.org/mental-health'
    },
    {
      title: 'Mental Health in Tamil Nadu',
      description: 'Resources and information about mental health services in Tamil Nadu.',
      link: 'https://tn.gov.in/'
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
          <h3 className="text-xl font-bold text-red-800">Crisis Support - India</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-700 mb-3 flex items-center space-x-2">
              <span>📞</span>
              <span>Emergency Helplines (India)</span>
            </h4>
            <ul className="space-y-2">
              <li><a className="text-blue-700 hover:text-blue-800 underline transition-colors" href="https://www.aasra.info" target="_blank">Aasra: 9820466726 (24/7 Suicide Helpline)</a></li>
              <li><a className="text-blue-700 hover:text-blue-800 underline transition-colors" href="https://www.icallhelpline.org" target="_blank">iCall: 9152987821 (Mental Health Support)</a></li>
              <li><a className="text-blue-700 hover:text-blue-800 underline transition-colors" href="tel:9999661036">Vandrevala Foundation: 9999661036</a></li>
              <li><a className="text-blue-700 hover:text-blue-800 underline transition-colors" href="tel:104">Emergency Medical: 104 (Ambulance)</a></li>
            </ul>
          </div>
          <div className="bg-white/50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-700 mb-3 flex items-center space-x-2">
              <span>🌍</span>
              <span>Tamil Nadu Resources</span>
            </h4>
            <ul className="space-y-2">
              <li><a className="text-blue-700 hover:text-blue-800 underline transition-colors" href="tel:04424640050">Sneha Suicide Prevention Helpline: 044-24640050 (24/7)</a></li>
              <li><a className="text-blue-700 hover:text-blue-800 underline transition-colors" href="tel:9445241489">Tamil Nadu Mental Health Helpline: 9445241489</a></li>
              <li><a className="text-blue-700 hover:text-blue-800 underline transition-colors" href="https://www.befrienders.org" target="_blank">Befrienders India</a></li>
              <li><a className="text-blue-700 hover:text-blue-800 underline transition-colors" href="tel:112">Police Emergency: 112</a></li>
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

      {/* Mental Health Articles & Guides */}
      <div className="card p-8 bg-white">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center float-animation">
            <span className="text-white text-lg">📚</span>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Mental Health Articles & Guides
          </h3>
        </div>
        <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
          Deepen your understanding of mental wellbeing with our collection of verified, expert-written guides.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div 
              key={index} 
              className="group bg-gradient-to-br from-white to-gray-50/50 border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full mb-4">
                  Article
                </span>
                <h4 className="font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                  {article.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {article.description}
                </p>
              </div>
              <a 
                href={article.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 font-semibold text-sm transition-colors mt-auto"
              >
                <span>Read Article</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Support Groups & Communities */}
      <div className="card p-8 bg-white">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center float-animation">
            <span className="text-white text-lg">👥</span>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Communities & Support Groups
          </h3>
        </div>
        <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
          Connect with others who understand. Join supportive communities and forums to share your journey.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 p-6 rounded-2xl border border-gray-100">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center space-x-2 text-lg">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>Online Communities</span>
            </h4>
            <ul className="space-y-3">
              <li>
                <a 
                  className="group flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors" 
                  href="https://www.reddit.com/r/mentalhealth/" 
                  target="_blank"
                >
                  <span className="text-gray-400 group-hover:text-blue-500 transition-colors">🔗</span>
                  <span className="hover:underline">Reddit: r/mentalhealth</span>
                </a>
              </li>
              <li>
                <a 
                  className="group flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors" 
                  href="https://www.reddit.com/r/Anxiety/" 
                  target="_blank"
                >
                  <span className="text-gray-400 group-hover:text-blue-500 transition-colors">🔗</span>
                  <span className="hover:underline">Reddit: r/Anxiety</span>
                </a>
              </li>
              <li>
                <a 
                  className="group flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors" 
                  href="https://www.reddit.com/r/depression/" 
                  target="_blank"
                >
                  <span className="text-gray-400 group-hover:text-blue-500 transition-colors">🔗</span>
                  <span className="hover:underline">Reddit: r/depression</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-indigo-50/30 p-6 rounded-2xl border border-gray-100">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center space-x-2 text-lg">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              <span>Local Support (India)</span>
            </h4>
            <ul className="space-y-3">
              <li>
                <a 
                  className="group flex items-center space-x-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors" 
                  href="https://www.meetup.com/topics/mental-health/" 
                  target="_blank"
                >
                  <span className="text-gray-400 group-hover:text-indigo-500 transition-colors">🔗</span>
                  <span className="hover:underline">Meetup: Local Support Groups</span>
                </a>
              </li>
              <li>
                <a 
                  className="group flex items-center space-x-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors" 
                  href="https://nimhans.ac.in/" 
                  target="_blank"
                >
                  <span className="text-gray-400 group-hover:text-indigo-500 transition-colors">🔗</span>
                  <span className="hover:underline">NIMHANS (Bangalore)</span>
                </a>
              </li>
              <li>
                <a 
                  className="group flex items-center space-x-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors" 
                  href="https://www.thelivelovelaughfoundation.org/" 
                  target="_blank"
                >
                  <span className="text-gray-400 group-hover:text-indigo-500 transition-colors">🔗</span>
                  <span className="hover:underline">The Live Love Laugh Foundation</span>
                </a>
              </li>
              <li>
                <a 
                  className="group flex items-center space-x-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors" 
                  href="https://www.icallhelpline.org/" 
                  target="_blank"
                >
                  <span className="text-gray-400 group-hover:text-indigo-500 transition-colors">🔗</span>
                  <span className="hover:underline">iCall Helpline & Resources</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Self-Help Tools & Apps */}
      <div className="card p-8 bg-white">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center float-animation">
            <span className="text-white text-lg">🛠️</span>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
            Self-Help Tools & Apps
          </h3>
        </div>
        <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
          Explore mobile apps and web platforms dedicated to self-paced mental wellness and tracking.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-gray-50 to-teal-50/30 p-6 rounded-2xl border border-gray-100">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center space-x-2 text-lg">
              <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
              <span>Recommended Mobile Apps</span>
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <span className="text-teal-500 mt-1">✓</span>
                <div>
                  <strong className="text-gray-700">Headspace</strong>
                  <p className="text-xs text-gray-500">Popular app for guided meditation, mindfulness, and sleep.</p>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-teal-500 mt-1">✓</span>
                <div>
                  <strong className="text-gray-700">Calm</strong>
                  <p className="text-xs text-gray-500">Known for ambient music, soundscapes, sleep stories, and breathing exercise tools.</p>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-teal-500 mt-1">✓</span>
                <div>
                  <strong className="text-gray-700">Moodpath</strong>
                  <p className="text-xs text-gray-500">Interactive tracker that periodically assesses your mood and compiles reports.</p>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-teal-500 mt-1">✓</span>
                <div>
                  <strong className="text-gray-700">Sanvello</strong>
                  <p className="text-xs text-gray-500">CBT-grounded app to manage stress, anxiety, and depression.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-emerald-50/30 p-6 rounded-2xl border border-gray-100">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center space-x-2 text-lg">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span>Wellness Websites</span>
            </h4>
            <ul className="space-y-3">
              <li>
                <a 
                  className="group flex items-center space-x-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors" 
                  href="https://www.mindful.org" 
                  target="_blank"
                >
                  <span className="text-gray-400 group-hover:text-emerald-500 transition-colors">🔗</span>
                  <span className="hover:underline">Mindful.org (Mindfulness Guides)</span>
                </a>
              </li>
              <li>
                <a 
                  className="group flex items-center space-x-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors" 
                  href="https://www.psychologytoday.com" 
                  target="_blank"
                >
                  <span className="text-gray-400 group-hover:text-emerald-500 transition-colors">🔗</span>
                  <span className="hover:underline">Psychology Today</span>
                </a>
              </li>
              <li>
                <a 
                  className="group flex items-center space-x-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors" 
                  href="https://www.verywellmind.com" 
                  target="_blank"
                >
                  <span className="text-gray-400 group-hover:text-emerald-500 transition-colors">🔗</span>
                  <span className="hover:underline">Verywell Mind</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}


