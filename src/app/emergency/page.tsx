import { Metadata } from 'next';
import EmergencyClient from './EmergencyClient';

export const metadata: Metadata = {
  title: 'Emergency Contacts | Know Your Rights',
  description: 'Emergency contacts and quick reference for what to do if arrested.',
};

export default function EmergencyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--card-border)] bg-gradient-to-b from-[var(--danger)]/10 to-transparent">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--danger)]/10 border border-[var(--danger)]/20 mb-6">
              <svg className="w-4 h-4 text-[var(--danger)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-sm font-medium text-[var(--danger)]">Emergency Resources</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              <span className="text-[var(--danger)]">Emergency</span>
              <br />
              <span className="text-[var(--foreground)]">Contacts & Resources</span>
            </h1>
            
            <p className="text-base sm:text-lg text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
              Critical contact information and quick-reference guides for legal emergencies. 
              Save these numbers and know your rights before you need them.
            </p>
          </div>
        </div>
      </section>

      <EmergencyClient />
    </div>
  );
}
