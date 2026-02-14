import { getAllScenarios, getDisclaimer, getAllStates } from "@/data/rightsLoader";
import { ScenarioCard, SearchBar, Disclaimer, HeroHeading, HeroStats, TypewriterText } from "@/components";
import Link from "next/link";

export default function Home() {
  const scenarios = getAllScenarios();
  const disclaimer = getDisclaimer();
  const states = getAllStates();

  return (
    <div className="min-h-screen"
    >
      {/* Hero Section with Enhanced Animations */}
      <section className="relative overflow-hidden"
    >
        {/* Animated gradient mesh background */}
        <div className="absolute inset-0 gradient-mesh animate-mesh" />
        <div className="absolute inset-0 hero-animated-gradient" />
        
        {/* Animated floating blobs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '-5s' }} />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '-10s' }} />
        
        {/* Animated shield/gavel background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-0 animate-shield-bg pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[var(--accent)]" fill="currentColor">
            <path d="M50 5 L90 15 L90 45 C90 70 50 95 50 95 C50 95 10 70 10 45 L10 15 Z" />
          </svg>
        </div>
        
        <div className="absolute top-1/4 right-10 w-32 h-32 opacity-0 animate-gavel-bg pointer-events-none">
          <svg viewBox="0 0 24 24" className="w-full h-full text-[var(--accent)]" fill="currentColor">
            <path d="M12.5 2.5L18.5 8.5L16 11L10 5L12.5 2.5ZM7.5 10.5L13.5 16.5L11 19L5 13L7.5 10.5ZM19.5 7.5L21.5 9.5C22.5 10.5 22.5 12 21.5 13L19.5 15L14 9.5L16.5 7C17.5 6 18.5 6 19.5 7.5ZM3 21L7 17L9 19L5 23H3V21Z"/>
          </svg>
        </div>

        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/10 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] bg-[var(--accent)]/5 rounded-full blur-3xl animate-float" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-8 sm:pb-12"
    >
          <div className="text-center max-w-3xl mx-auto"
    >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 mb-6 animate-fade-in"
    >
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse"
    ></span>
              <span className="text-sm font-medium text-[var(--accent-light)]"
    >Legal Rights Guide</span>
            </div>
            
            {/* Animated heading (typing + reveal) */}
            <div className="animate-fade-in" style={{ animationDelay: '0.08s', animationFillMode: 'both' }}>
              <HeroHeading primary="Know Your Rights" secondary="Protect Yourself" />
            </div>
            
            <p className="text-base sm:text-lg text-[var(--muted)] mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in"
              style={{ animationDelay: '0.2s' }}
    >
              <TypewriterText
                text="An interactive guide to understanding your legal rights in common situations. Knowledge is power — learn what protections you have under the law."
                typingSpeedMs={14}
                startDelayMs={250}
                className="inline"
              />
            </p>

            {/* Search bar */}
            <div className="flex justify-center mb-4 animate-fade-in"
              style={{ animationDelay: '0.3s' }}
    >
              <SearchBar scenarios={scenarios} />
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              <HeroStats statesCount={states.length} scenariosCount={scenarios.length} />
            </div>
          </div>
        </div>
      </section>

      {/* Scenarios Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
        <div className="flex items-center justify-between mb-6"
    >
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)]"
    >
            Legal Scenarios
          </h2>
          <span className="text-sm text-[var(--muted)]"
    >
            {scenarios.length} topics
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
    >
          {scenarios.map((scenario, index) => (
            <ScenarioCard key={scenario.id} scenario={scenario} index={index} />
          ))}
        </div>
      </section>

      {/* Features section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
          {/* Quiz Card */}
          <Link href="/quiz" className="group">
            <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] h-full transition-all duration-300 hover:border-[var(--accent)]/50 card-hover">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors">Quiz Yourself</h3>
              <p className="text-sm text-[var(--muted)]">
                Test your knowledge with our interactive quiz on legal rights.
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span>Start Quiz</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          <Link href="/pocket-card" className="group">
            <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] h-full transition-all duration-300 hover:border-[var(--accent)]/50 card-hover">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors">Pocket Card</h3>
              <p className="text-sm text-[var(--muted)]">
                Print a quick-reference card with the 5 most critical rights to keep in your wallet.
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span>Get Card</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          <Link href="/saved" className="group">
            <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] h-full transition-all duration-300 hover:border-[var(--accent)]/50 card-hover">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors">Saved Rights</h3>
              <p className="text-sm text-[var(--muted)]">
                Bookmark important rights for quick access. Your personal collection stays on your device.
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span>View Saved</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] card-hover">
            <div className="w-12 h-12 rounded-xl bg-[var(--success)]/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[var(--success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">Legally Sourced</h3>
            <p className="text-sm text-[var(--muted)]">
              All rights information includes legal sources: Constitutional amendments, federal and state laws.
            </p>
          </div>
          
          <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] card-hover">
            <div className="w-12 h-12 rounded-xl bg-[var(--warning)]/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[var(--warning)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">Educational Only</h3>
            <p className="text-sm text-[var(--muted)]">
              This is an educational resource. For legal advice, consult a licensed attorney.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <Disclaimer text={disclaimer} />
    </div>
  );
}
