export default function About() {
  return (
    <>
      {/* About Me Section */}
      <section id="about" className="py-24 scroll-mt-20">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-text-main whitespace-nowrap">
            About Me
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Text Content (Takes up 2 columns on PC) */}
          <div className="md:col-span-2 space-y-6 text-text-dim text-lg leading-relaxed">
            <p>
              Hello! My name is Praful. I enjoy building things that live on the
              internet, whether that be websites, applications, or anything in
              between.
            </p>
            <p>
              My interest in AI and Machine Learning started back in university,
              and since then, I've been focused on bridging the gap between{" "}
              <span className="text-accent">clean code</span>
              and <span className="text-accent">intelligent algorithms</span>.
            </p>
            <p>
              I’ve had the privilege of contributing to open-source projects
              like <span className="text-accent font-bold">Matplotlib</span> and
              working on diverse projects ranging from web scrapers to churn
              prediction models.
            </p>

            <div>
              <p className="font-bold text-text-main mb-4 uppercase tracking-widest text-sm">
                Things I'm Passionate About:
              </p>
              <ul className="grid grid-cols-2 gap-2 text-sm font-mono">
                <li className="flex items-center gap-2">
                  <span className="text-accent">▹</span> Generative AI
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">▹</span> Machine Learning
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">▹</span> Open Source
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">▹</span> AI Agents
                </li>
              </ul>
            </div>
          </div>

          {/* Image Container (Takes up 1 column on PC) */}
          <div className="relative group max-w-72 mx-auto md:mx-0">
            {/* The Decorative Back-Box */}
            <div className="absolute inset-0 border-2 border-accent rounded-lg translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300 z-0"></div>

            {/* The Image Wrapper */}
            <div className="relative rounded-lg overflow-hidden">
              {" "}
              {/* bg-bg prevents any transparency issues */}
              <img
                src="/profile.png"
                alt="Praful Gulani"
                className="object-cover w-full h-full block"
              />
              {/* The Tint Overlay (The "Colored Glass") */}
              <div className="absolute inset-0 bg-accent/20 group-hover:bg-transparent transition-colors duration-300"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
