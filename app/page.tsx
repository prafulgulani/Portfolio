// app/page.tsx
export default function Home() {
  return (
    /* We use 'bg-bg' and 'text-tx-main' which map to our 
       dynamic CSS variables injected by the ThemeModal.
    */
    <main className="min-h-screen p-8 md:p-24 bg-bg text-tx-main transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        
        {/* Hero Section */}
        <section className="mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Hey 👋! I'm <span className="text-accent">Praful Gulani</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium opacity-90">
            Junior Software Developer at <span className="text-accent/90">Deepiotics</span>
          </p>
          <div className="mt-6 text-lg text-tx-dim leading-relaxed max-w-2xl space-y-4">
            <p>
              BSc Computer Science Graduate from Goldsmiths, University of London. 
              I specialize in Python, Machine Learning, and building robust backend systems.
            </p>
          </div>
        </section>

        {/* Tech Stack Grid */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-8 border-b border-accent/20 pb-2 inline-block">
            Tech Stack & Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Column 1 */}
            <div>
              <h3 className="text-accent font-bold mb-4 uppercase tracking-wider text-sm">
                Programming & Web
              </h3>
              <p className="text-tx-dim leading-loose font-medium">
                Python, C++, SQL, JavaScript <br />
                Django, HTML, CSS, Bootstrap
              </p>
            </div>
            
            {/* Column 2 */}
            <div>
              <h3 className="text-accent font-bold mb-4 uppercase tracking-wider text-sm">
                AI & Data Science
              </h3>
              <p className="text-tx-dim leading-loose font-medium">
                NumPy, Pandas, Matplotlib, Seaborn <br />
                Scikit-learn, TensorFlow, PyTorch
              </p>
            </div>
          </div>
        </section>

        {/* Links Section */}
        <section className="pt-10 border-t border-tx-dim/10">
          <div className="flex flex-wrap gap-8 items-center">
            <a 
              href="https://linkedin.com" 
              className="text-tx-dim hover:text-accent transition-colors font-medium underline decoration-accent/30 underline-offset-8 decoration-2"
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/prafulgulani" 
              className="text-tx-dim hover:text-accent transition-colors font-medium underline decoration-accent/30 underline-offset-8 decoration-2"
            >
              GitHub
            </a>
            <a 
              href="https://leetcode.com" 
              className="text-tx-dim hover:text-accent transition-colors font-medium underline decoration-accent/30 underline-offset-8 decoration-2"
            >
              LeetCode
            </a>
            <a 
              href="https://medium.com" 
              className="text-tx-dim hover:text-accent transition-colors font-medium underline decoration-accent/30 underline-offset-8 decoration-2"
            >
              Medium
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}