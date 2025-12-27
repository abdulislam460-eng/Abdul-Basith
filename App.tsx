
import React, { useState, useEffect } from 'react';
import { PortfolioData } from './types';
import { INITIAL_PORTFOLIO } from './constants';
import Button from './components/Button';
import ImportModal from './components/ImportModal';
import SkillCard from './components/SkillCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(INITIAL_PORTFOLIO);
  const [showImport, setShowImport] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Dynamic Page Title
  useEffect(() => {
    document.title = `${data.fullName} | Portfolio`;
  }, [data.fullName]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleImportData = (newData: PortfolioData) => {
    setData(newData);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 3);
  };

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#6366f1'];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-gray-950/80 backdrop-blur-md py-3 border-b border-white/5 shadow-xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="px-3 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-sm font-black group-hover:rotate-6 transition-transform">
              {getInitials(data.fullName)}
            </div>
            <span className="text-xl font-bold tracking-tight hidden sm:inline-block">Portfolio</span>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden lg:flex items-center gap-2 mr-2">
              <Button variant="ghost" size="sm" onClick={() => window.scrollTo({ top: document.getElementById('about')?.offsetTop, behavior: 'smooth' })}>About</Button>
              <Button variant="ghost" size="sm" onClick={() => window.scrollTo({ top: document.getElementById('experience')?.offsetTop, behavior: 'smooth' })}>Experience</Button>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Highlighted Blog Link */}
              <a 
                href="https://abdulbasithislam.blogspot.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative hidden sm:flex items-center px-4 py-2 rounded-lg bg-white/5 border border-blue-500/30 hover:bg-blue-500/10 hover:border-blue-500 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                </svg>
                <span className="text-sm font-semibold text-blue-400 group-hover:text-blue-300">Blog</span>
              </a>

              {/* LinkedIn Link */}
              <a 
                href="https://in.linkedin.com/in/abdulbasithkom" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center px-4 py-2 rounded-lg bg-white/5 border border-indigo-500/30 hover:bg-indigo-500/10 hover:border-indigo-500 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <svg className="w-4 h-4 mr-2 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span className="text-sm font-semibold text-indigo-400 group-hover:text-indigo-300">LinkedIn</span>
              </a>
            </div>

            <Button variant="outline" size="sm" onClick={() => setShowImport(true)} className="hidden md:inline-flex ml-2">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
              Import Profile
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold tracking-wide uppercase animate-pulse">
            Growth & Analytics Leader
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
            I'm <span className="text-gradient drop-shadow-sm">{data.fullName}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            {data.tagline}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vTnuX9vpkTAgL5wzQMMKTXLmFCjAzGBzgtr8gnPnroG7ux4dHTnE7LL-1a71cXwZA/pubhtml" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="px-10">
                View Projects
              </Button>
            </a>
            <Button size="lg" variant="outline" className="px-10 group" onClick={() => window.scrollTo({ top: document.getElementById('projects')?.offsetTop, behavior: 'smooth' })}>
              Local Archive
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="w-12 h-1 px-1 bg-blue-600 mb-6 rounded-full"></div>
            <h2 className="text-4xl font-bold mb-6 text-white">Professional Profile</h2>
            <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
              <p>{data.about}</p>
              <div className="pt-6 grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-bold mb-1">Email</h4>
                  <p className="text-sm">{data.email}</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Location</h4>
                  <p className="text-sm">{data.location}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden glass-card p-4 relative z-10">
               <img src={`https://picsum.photos/seed/${data.fullName}/800/800`} alt={data.fullName} className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-600/20 rounded-full blur-2xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Career Trajectory</h2>
            <p className="text-gray-500 text-lg">Detailed history from professional resume</p>
          </div>
          <div className="space-y-8">
            {data.experience.map((exp, idx) => (
              <div key={idx} className="group relative pl-8 pb-8 border-l-2 border-gray-800 last:pb-0">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-gray-950 group-hover:scale-150 transition-transform"></div>
                <div className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-colors">
                  <div className="flex flex-col md:flex-row justify-between mb-4 md:items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                      <p className="text-blue-400 font-semibold">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-500 font-mono mt-2 md:mt-0">{exp.duration}</span>
                  </div>
                  <ul className="space-y-2 text-gray-400">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-blue-500">•</span>
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Grid & Analytics */}
      <section id="skills" className="py-24 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-8 text-white">Technical Expertise</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.skills.map((skill, i) => (
                  <SkillCard key={i} skill={skill} />
                ))}
              </div>
            </div>
            <div className="flex-1 glass-card p-8 rounded-3xl h-fit">
              <h3 className="text-xl font-bold mb-8 flex items-center text-white">
                <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center mr-3">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>
                </span>
                Competency Matrix
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.skills.slice(0, 6)}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="level" radius={[4, 4, 0, 0]}>
                      {data.skills.slice(0, 6).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-6 text-sm text-gray-500 text-center italic">
                Quantified skill impact based on historic performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">Case Studies & Reports</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.projects.map((project, i) => (
              <div key={i} className="group glass-card rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all border-b-4 border-b-transparent hover:border-b-blue-600">
                <div className="h-48 overflow-hidden bg-gray-900 flex items-center justify-center p-8">
                  <div className="text-blue-500/20 scale-[4] group-hover:scale-[5] transition-transform duration-700">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech, j) => (
                      <span key={j} className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a href={project.link || "#"} target={project.link?.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className="inline-flex items-center text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors">
                    View Details 
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-black text-gradient">{data.fullName}</h4>
            <p className="text-gray-500 text-sm mt-1">High-Performance Professional Portfolio</p>
          </div>
          <div className="flex gap-6">
            <a href="https://abdulbasithislam.blogspot.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">Blog</a>
            <a href="https://in.linkedin.com/in/abdulbasithkom" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">LinkedIn</a>
          </div>
          <p className="text-gray-600 text-xs font-mono">© {new Date().getFullYear()} {data.fullName}. All rights reserved.</p>
        </div>
      </footer>

      {/* Import Modal */}
      {showImport && (
        <ImportModal 
          onImport={handleImportData} 
          onClose={() => setShowImport(false)} 
        />
      )}
    </div>
  );
};

export default App;
