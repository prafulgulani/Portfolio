export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-24 bg-bg transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        
        {/* Hero Section - Following the Bert/Armchair Hierarchy */}
        <section className="mb-24 flex flex-col items-center md:items-start">
          <span className="text-xl md:text-2xl font-bold text-tx-main opacity-60 mb-2 uppercase tracking-widest">
            Hey 👋! I'm
          </span>
          
          {/* Your name now changes color dynamically with every theme */}
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-accent uppercase leading-none mb-8">
            Praful Gulani
          </h1>
          
          <p className="text-xl md:text-2xl font-bold text-tx-main mb-8">
            Junior Software Developer @ Deepiotics
          </p>

          <p className="text-lg md:text-xl leading-relaxed max-w-2xl text-tx-main">
            BSc Computer Science Graduate from Goldsmiths, University of London. 
            Focused on Python, Machine Learning, and building efficient systems in Indore.
          </p>
        </section>

        {/* Technical Arsenal - Clean & Minimalist like the references */}
        <section className="mb-20">
          <h2 className="text-xs uppercase tracking-[0.4em] font-black text-tx-dim mb-12">
            Technical Arsenal
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-accent font-bold mb-6 text-sm uppercase tracking-wider">Programming & Web</h3>
              <div className="flex flex-wrap gap-3">
                {['Python', 'C++', 'SQL', 'Django', 'Next.js'].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-accent-soft/10 text-accent border border-accent/20 rounded-md text-sm font-bold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-accent font-bold mb-6 text-sm uppercase tracking-wider">AI & Data Science</h3>
              <div className="flex flex-wrap gap-3">
                {['TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas'].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-accent-soft/10 text-accent border border-accent/20 rounded-md text-sm font-bold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}