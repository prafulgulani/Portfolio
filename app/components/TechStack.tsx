export default function TechStack() {
  const stack = [
    {
      category: "Languages",
      skills: ["Python", "C++", "SQL", "JavaScript"]
    },
    {
      category: "Frameworks",
      skills: ["Django", "Next.js", "React", "FastAPI"]
    },
    {
      category: "AI / ML",
      skills: ["PyTorch", "TensorFlow", "Scikit-learn", "NLP", "LLMs"]
    },
    {
      category: "Libraries",
      skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn"]
    },
    {
      category: "Tools",
      skills: ["Git", "WSL", "Linux", "Docker", "Vercel"]
    },
    {
      category: "Core",
      skills: ["DSA", "OOP", "System Design", "RDBMS"]
    }
  ];

  return (
    <section id="techstack" className="py-24 scroll-mt-20">
      {/* Large Clean Heading - Perfect Consistency */}
      <div className="flex items-center gap-4 mb-16">
        <h2 className="text-3xl md:text-4xl font-black text-text-main whitespace-nowrap">
          Technical Arsenal
        </h2>
      </div>

      {/* Aesthetic Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
        {stack.map((item) => (
          <div key={item.category} className="group">
            {/* Category Header with Accent Line */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-accent/50 group-hover:w-12 transition-all duration-300"></div>
              <h3 className="text-xs font-mono font-bold tracking-[0.3em] text-text-main uppercase">
                {item.category}
              </h3>
            </div>

            {/* Skills Wrapper */}
            <div className="flex flex-wrap gap-2 pl-11">
              {item.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[13px] font-mono text-text-dim hover:text-accent transition-colors duration-200"
                >
                  {skill}<span className="text-accent/30 ml-2 group-last:hidden">/</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}