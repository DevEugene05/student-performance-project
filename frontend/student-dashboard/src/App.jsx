export default function StudentPerformancePredictionSystem() {
  const features = [
    {
      title: 'Performance Prediction',
      desc: 'Predict student outcomes using intelligent machine learning models.'
    },
    {
      title: 'Risk Detection',
      desc: 'Identify struggling students early for academic intervention.'
    },
    {
      title: 'Analytics Dashboard',
      desc: 'Visualize student performance trends with interactive charts.'
    },
    {
      title: 'AI Insights',
      desc: 'Generate smart recommendations based on student data.'
    }
  ];

  const stats = [
    { label: 'Prediction Accuracy', value: '94%' },
    { label: 'Students Analyzed', value: '12K+' },
    { label: 'Early Risk Detection', value: '87%' },
    { label: 'Institutions Supported', value: '35+' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10 backdrop-blur-xl sticky top-0 z-50 bg-black/20">
        <div>
          <h1 className="text-2xl font-bold tracking-wide">EduPredict AI</h1>
        </div>

        <div className="hidden md:flex gap-8 text-sm text-slate-300">
          <a href="#home" className="hover:text-white transition">Home</a>
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#dashboard" className="hover:text-white transition">Dashboard</a>
          <a href="#machine-learning" className="hover:text-white transition">Machine Learning</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>

        <button className="px-5 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 transition font-medium shadow-lg shadow-indigo-500/30">
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section id="home" className="px-8 lg:px-20 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 text-indigo-200 text-sm mb-6">
            AI Powered Academic Analytics
          </div>

          <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-8">
            Predict Student Success with <span className="text-indigo-400">Machine Learning</span>
          </h1>

          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mb-10">
            An intelligent academic performance prediction platform designed to help educational institutions identify at-risk students, improve academic outcomes, and make smarter data-driven decisions.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="px-7 py-4 rounded-2xl bg-indigo-500 hover:bg-indigo-400 transition font-semibold shadow-xl shadow-indigo-500/30">
              View Prediction
            </button>

            <button className="px-7 py-4 rounded-2xl border border-white/20 hover:bg-white/10 transition font-semibold">
              Learn More
            </button>
          </div>
        </div>

        {/* Hero Card */}
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 rounded-full"></div>

          <div className="relative backdrop-blur-2xl bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold">Student Analytics</h3>
              <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse"></div>
            </div>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between mb-2 text-sm text-slate-300">
                  <span>Attendance</span>
                  <span>87%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3">
                  <div className="bg-indigo-400 h-3 rounded-full w-[87%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2 text-sm text-slate-300">
                  <span>Assignments</span>
                  <span>76%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3">
                  <div className="bg-purple-400 h-3 rounded-full w-[76%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2 text-sm text-slate-300">
                  <span>Exam Score</span>
                  <span>92%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3">
                  <div className="bg-cyan-400 h-3 rounded-full w-[92%]"></div>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-white/10">
              <div className="text-sm text-slate-300 mb-2">Prediction Result</div>
              <div className="text-3xl font-black text-green-400 mb-2">Excellent Performance</div>
              <p className="text-slate-300 text-sm">
                The student has a high probability of achieving strong academic results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-8 lg:px-20 pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 text-center hover:scale-105 transition"
            >
              <div className="text-4xl font-black text-indigo-400 mb-3">{stat.value}</div>
              <div className="text-slate-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-8 lg:px-20 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-6">Core Features</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Powerful educational analytics tools designed for modern institutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6 text-2xl">
                ✨
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-slate-300 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-8 lg:px-20 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-black mb-8">About the Project</h2>
            <p className="text-slate-300 leading-relaxed text-lg mb-6">
              This project focuses on designing and implementing a machine learning-based system that predicts student academic performance using historical educational data.
            </p>

            <p className="text-slate-300 leading-relaxed text-lg mb-6">
              Educational institutions generate large volumes of student data such as attendance, assignments, test scores, and examinations. This system transforms that data into meaningful predictions and insights.
            </p>

            <div className="space-y-4 mt-10">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="font-bold mb-2">Aim</h4>
                <p className="text-slate-300">Develop a smart AI-powered prediction system for academic performance analysis.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="font-bold mb-2">Objectives</h4>
                <ul className="text-slate-300 list-disc pl-5 space-y-2">
                  <li>Identify factors affecting academic performance</li>
                  <li>Collect and preprocess student data</li>
                  <li>Develop machine learning models</li>
                  <li>Evaluate model accuracy and performance</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10">
            <h3 className="text-3xl font-bold mb-8">Project Workflow</h3>

            <div className="space-y-6">
              {[
                'Data Collection',
                'Data Preprocessing',
                'Model Training',
                'Prediction Generation',
                'Performance Evaluation'
              ].map((step, index) => (
                <div key={index} className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="text-lg text-slate-200">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section id="dashboard" className="px-8 lg:px-20 py-24 bg-black/20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-6">Prediction Dashboard</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Enter student information to generate AI-based academic performance predictions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-8">Student Information</h3>

            <div className="space-y-6">
              <input
                type="text"
                placeholder="Attendance Percentage"
                className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-indigo-400"
              />

              <input
                type="text"
                placeholder="Test Score"
                className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-indigo-400"
              />

              <input
                type="text"
                placeholder="Assignment Score"
                className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-indigo-400"
              />

              <input
                type="text"
                placeholder="Exam Score"
                className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-indigo-400"
              />

              <input
                type="text"
                placeholder="Study Hours"
                className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-indigo-400"
              />

              <button className="w-full p-4 rounded-2xl bg-indigo-500 hover:bg-indigo-400 transition font-bold text-lg shadow-xl shadow-indigo-500/30">
                Generate Prediction
              </button>
            </div>
          </div>

          <div className="space-y-8">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Prediction Result</h3>
                <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-300 text-sm">
                  Low Risk
                </span>
              </div>

              <div className="text-5xl font-black text-indigo-400 mb-4">A Grade</div>
              <p className="text-slate-300 leading-relaxed">
                Based on the provided data, the system predicts excellent academic performance with strong consistency across evaluations.
              </p>
            </div>

            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6">AI Recommendation</h3>
              <ul className="space-y-4 text-slate-300">
                <li>✔ Maintain current attendance level</li>
                <li>✔ Continue regular study schedule</li>
                <li>✔ Increase assignment participation</li>
                <li>✔ Monitor examination consistency</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Machine Learning */}
      <section id="machine-learning" className="px-8 lg:px-20 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-6">Machine Learning Model</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            The platform uses machine learning algorithms to analyze patterns and predict academic performance.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {[
            { title: 'Random Forest', accuracy: '94%' },
            { title: 'Decision Tree', accuracy: '89%' },
            { title: 'Logistic Regression', accuracy: '86%' }
          ].map((model, index) => (
            <div
              key={index}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 text-center"
            >
              <div className="text-5xl mb-6">🤖</div>
              <h3 className="text-3xl font-bold mb-4">{model.title}</h3>
              <div className="text-6xl font-black text-indigo-400 mb-4">{model.accuracy}</div>
              <p className="text-slate-300">Model Accuracy</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-8 lg:px-20 py-24 bg-black/20">
        <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black mb-4">Contact Us</h2>
            <p className="text-slate-300">
              Send feedback or project inquiries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Full Name"
              className="p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-indigo-400"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-indigo-400"
            />
          </div>

          <textarea
            placeholder="Your Message"
            rows="6"
            className="w-full mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-indigo-400"
          ></textarea>

          <button className="mt-6 px-8 py-4 rounded-2xl bg-indigo-500 hover:bg-indigo-400 transition font-bold shadow-xl shadow-indigo-500/30">
            Send Message
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 lg:px-20 py-10 border-t border-white/10 text-center text-slate-400">
        <p>
          Student Academic Performance Prediction System • Final Year Project • Machine Learning in Education
        </p>
      </footer>
    </div>
  );
}
