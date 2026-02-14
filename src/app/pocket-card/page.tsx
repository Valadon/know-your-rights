import { getAllScenarios } from '@/data/rightsLoader';
import Link from 'next/link';
import { QrCode } from '@/components';
import PrintButton from './PrintButton';
import styles from './pocket-card.module.css';

export const metadata = {
  title: 'Pocket Card | Know Your Rights',
  description: 'Printable quick-reference card with the most critical rights',
};

// Get the 5 most critical rights across all scenarios
function getCriticalRights() {
  const scenarios = getAllScenarios();
  
  // Define the most critical rights that everyone should know
  const criticalRights = [
    {
      scenarioId: 'traffic-stop',
      scenarioTitle: 'Police Encounters',
      icon: '🚗',
      title: 'Right to Remain Silent',
      summary: 'You don\'t have to answer questions beyond basic ID. Clearly say: "I choose to remain silent."',
      source: '5th Amendment'
    },
    {
      scenarioId: 'traffic-stop',
      scenarioTitle: 'Police Encounters',
      icon: '🚗',
      title: 'Right to Refuse Search',
      summary: 'Police need consent, a warrant, or probable cause. Say: "I do not consent to a search."',
      source: '4th Amendment'
    },
    {
      scenarioId: 'federal-agents',
      scenarioTitle: 'Federal Agents',
      icon: '🛡️',
      title: 'Right to an Attorney',
      summary: 'If detained, say: "I want to speak to a lawyer." Questioning must stop immediately.',
      source: '6th Amendment'
    },
    {
      scenarioId: 'workplace-discrimination',
      scenarioTitle: 'Employment',
      icon: '💼',
      title: 'Protection from Discrimination',
      summary: 'Cannot be treated unfairly due to race, color, religion, sex, or national origin. Document incidents.',
      source: 'Title VII'
    },
    {
      scenarioId: 'digital-privacy',
      scenarioTitle: 'Digital Privacy',
      icon: '💻',
      title: 'Right to Digital Privacy',
      summary: 'Police need a warrant to search your phone/computer. Encrypt your devices and use strong passwords.',
      source: '4th Amendment'
    }
  ];
  
  return criticalRights;
}

export default function PocketCardPage() {
  const criticalRights = getCriticalRights();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--card-border)]">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/5 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-6 no-print"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="animate-slide-up">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
                    Pocket Reference Card
                  </h1>
                </div>
              </div>              
              <p className="text-[var(--muted)] max-w-2xl">
                A printable quick-reference card with the 5 most critical rights everyone should know. 
                Print, cut, and keep it in your wallet or bag.
              </p>
            </div>

            <PrintButton />
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="no-print mb-8 p-4 rounded-xl bg-[var(--warning)]/10 border border-[var(--warning)]/20">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-[var(--warning)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm text-[var(--foreground)]">
                <strong>Print Instructions:</strong> This card is formatted for standard 8.5&quot; × 11&quot; paper. 
                Print in portrait mode, then cut along the dotted lines. The card measures approximately 3&quot; × 5&quot; 
                when cut.
              </p>
            </div>
          </div>
        </div>

        {/* The Pocket Card */}
        <div className={styles.pocketCardContainer}>
          <div className={styles.pocketCard}>
            {/* Card Header */}
            <div className={styles.pocketCardHeader}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-bold text-white text-sm">Know Your Rights</span>
                </div>
                <span className="text-white/70 text-xs">Quick Reference</span>
              </div>
            </div>

            {/* Card Body */}
            <div className={styles.pocketCardBody}>
              {criticalRights.map((right, index) => (
                <div key={index} className={styles.pocketCardItem}>
                  <div className="flex items-start gap-2">
                    <span className="text-base">{right.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className={styles.pocketCardTitle}>{right.title}</h3>
                      <p className={styles.pocketCardSummary}>{right.summary}</p>
                      <span className={styles.pocketCardSource}>{right.source}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Card Footer */}
            <div className={styles.pocketCardFooter}>
              <div className={styles.pocketCardFooterRow}>
                <div className={styles.qrBlock}>
                  <QrCode
                    text="https://know-your-rights-weld.vercel.app"
                    size={72}
                    label="QR code linking to the Know Your Rights app"
                    className={styles.qrCode}
                  />
                  <span className={styles.qrLabel}>Scan for full guide</span>
                </div>
                <div className={styles.footerCopy}>
                  <p className={styles.footerText}>
                    This card is for educational purposes only and does not constitute legal advice.
                  </p>
                  <p className={styles.footerLink}>
                    know-your-rights-weld.vercel.app
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Links to full scenarios */}
        <div className="mt-12 no-print">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
            Learn More About These Rights
          </h2>          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {criticalRights.map((right, index) => (
              <Link
                key={index}
                href={`/scenario/${right.scenarioId}`}
                className="p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--accent)]/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{right.icon}</span>
                  <div>
                    <p className="font-medium text-[var(--foreground)]">{right.scenarioTitle}</p>
                    <p className="text-sm text-[var(--accent)]">View full details →</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
