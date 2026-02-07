'use client';

import { useState } from 'react';

const emergencyContacts = [
  {
    id: '911',
    name: '911 Emergency',
    number: '911',
    description: 'For life-threatening emergencies, crimes in progress, or immediate danger.',
    available: '24/7',
    icon: '🚨',
    urgent: true,
  },
  {
    id: 'aclu',
    name: 'ACLU National Hotline',
    number: '212-549-2500',
    description: 'American Civil Liberties Union - Report civil rights violations and get legal referrals.',
    available: 'Business hours',
    icon: '⚖️',
    urgent: false,
  },
  {
    id: 'nlg',
    name: 'National Lawyers Guild',
    number: '212-679-5100',
    description: 'Legal support for activists, protesters, and those facing political prosecution.',
    available: '24/7 hotline for arrests',
    icon: '🏛️',
    urgent: false,
  },
  {
    id: 'legal-aid',
    name: 'Legal Aid Society',
    number: 'Find local office',
    description: 'Free legal services for low-income individuals. Search for your local office.',
    available: 'Varies by location',
    icon: '🤝',
    urgent: false,
    action: 'https://www.lsc.gov/find-legal-aid',
    actionText: 'Find Local Office',
  },
  {
    id: 'eeoc',
    name: 'EEOC Hotline',
    number: '1-800-669-4000',
    description: 'Equal Employment Opportunity Commission - Report workplace discrimination.',
    available: 'Mon-Fri, 8am-8pm ET',
    icon: '💼',
    urgent: false,
  },
  {
    id: 'housing',
    name: 'HUD Housing Hotline',
    number: '1-800-669-9777',
    description: 'Housing discrimination complaints and fair housing information.',
    available: 'Mon-Fri, 9am-5pm ET',
    icon: '🏠',
    urgent: false,
  },
];

const arrestChecklist = [
  {
    id: 'remain-calm',
    title: 'Remain Calm',
    description: 'Stay calm and do not argue, resist, or obstruct the officer. Keep your hands visible at all times.',
    icon: '🧘',
    critical: false,
  },
  {
    id: 'right-to-silence',
    title: 'Exercise Your Right to Remain Silent',
    description: 'Clearly state: "I wish to remain silent" and "I want to speak to an attorney." Do not answer any questions after this.',
    icon: '🤐',
    critical: true,
  },
  {
    id: 'no-consent',
    title: 'Do Not Consent to Searches',
    description: 'Clearly say "I do not consent to any searches." Even if they search anyway, your objection matters in court.',
    icon: '🚫',
    critical: true,
  },
  {
    id: 'ask-lawyer',
    title: 'Request an Attorney Immediately',
    description: 'Say clearly: "I want a lawyer." Once you request one, police must stop questioning you. Do not sign anything without a lawyer.',
    icon: '⚖️',
    critical: true,
  },
  {
    id: 'remember-details',
    title: 'Remember Officer Details',
    description: 'Try to remember badge numbers, patrol car numbers, and agency names. This information is crucial for your defense.',
    icon: '📝',
    critical: false,
  },
  {
    id: 'witnesses',
    title: 'Identify Witnesses',
    description: 'If there are witnesses, try to get their names and contact information. They may be vital to your case.',
    icon: '👥',
    critical: false,
  },
  {
    id: 'medical',
    title: 'Request Medical Attention if Needed',
    description: 'If you are injured or need medication, request medical attention immediately. This is your right.',
    icon: '🏥',
    critical: false,
  },
  {
    id: 'phone-call',
    title: 'Make Your Phone Call Count',
    description: 'You have the right to a phone call. Contact a lawyer or family member who can find you a lawyer. Calls may be recorded except to your attorney.',
    icon: '📞',
    critical: true,
  },
  {
    id: 'dont-talk',
    title: 'Do Not Talk About Your Case',
    description: 'Do not discuss your case with anyone except your lawyer. Phone calls (except to attorneys) may be recorded.',
    icon: '🔇',
    critical: true,
  },
  {
    id: 'bail',
    title: 'Understand Bail Options',
    description: 'Ask about bail at your arraignment. You have the right to reasonable bail in most cases.',
    icon: '💰',
    critical: false,
  },
];

const importantPhrases = [
  {
    phrase: 'I wish to remain silent.',
    context: 'Invoke your 5th Amendment right. Say this clearly and then stop talking.',
  },
  {
    phrase: 'I want to speak to an attorney.',
    context: 'Invoke your 6th Amendment right. Police must stop questioning you.',
  },
  {
    phrase: 'I do not consent to any searches.',
    context: 'Protect your 4th Amendment rights. Say this even if they search anyway.',
  },
  {
    phrase: 'Am I free to leave?',
    context: 'Determines if you are being detained or are free to go.',
  },
  {
    phrase: 'Why am I being detained?',
    context: 'Ask for the reason if police say you are not free to leave.',
  },
  {
    phrase: 'I will not sign anything without my attorney present.',
    context: 'Never sign documents you do not fully understand.',
  },
];

export default function EmergencyClient() {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const handleCopy = async (number: string, id: string) => {
    try {
      await navigator.clipboard.writeText(number.replace(/-/g, ''));
      setCopiedNumber(id);
      setTimeout(() => setCopiedNumber(null), 2000);
    } catch (err) {
      // Fallback: just show copied feedback
      setCopiedNumber(id);
      setTimeout(() => setCopiedNumber(null), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Emergency Contacts */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[var(--foreground)] flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-[var(--danger)]/10 flex items-center justify-center">
              📞
            </span>
            Emergency Contacts
          </h2>

          <div className="space-y-4">
            {emergencyContacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-5 rounded-2xl border transition-all duration-300 ${
                  contact.urgent
                    ? 'bg-[var(--danger)]/5 border-[var(--danger)]/30 hover:border-[var(--danger)]/50'
                    : 'bg-[var(--card-bg)] border-[var(--card-border)] hover:border-[var(--accent)]/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{contact.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-[var(--foreground)]">
                        {contact.name}
                      </h3>
                      {contact.urgent && (
                        <span className="px-2 py-0.5 rounded-full bg-[var(--danger)]/20 text-[var(--danger)] text-xs font-medium">
                          URGENT
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                      {contact.action ? (
                        <a
                          href={contact.action}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-bold text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors"
                        >
                          {contact.actionText} →
                        </a>
                      ) : (
                        <button
                          onClick={() => handleCopy(contact.number, contact.id)}
                          className="flex items-center gap-2 text-lg font-bold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors group"
                        >
                          {contact.number}
                          <svg 
                            className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--accent)]" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      )}
                      
                      {copiedNumber === contact.id && (
                        <span className="text-sm text-[var(--success)] animate-fade-in">
                          Copied!
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-[var(--muted)] mt-2">
                      {contact.description}
                    </p>

                    <p className="text-xs text-[var(--accent)] mt-1">
                      Available: {contact.available}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Important Phrases Card */}
          <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)]">
            <h3 className="text-lg font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
              💬 Key Phrases to Remember
            </h3>
            
            <div className="space-y-4">
              {importantPhrases.map((item, index) => (
                <div key={index} className="p-4 rounded-xl bg-[var(--background)] border border-[var(--card-border)]">
                  <p className="font-semibold text-[var(--accent)] mb-1">
                    "{item.phrase}"
                  </p>
                  <p className="text-sm text-[var(--muted)]">
                    {item.context}
                  </p>
                </div>
              ))}
            </div>          
          </div>
        </div>

        {/* Arrest Checklist */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[var(--foreground)] flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-[var(--warning)]/10 flex items-center justify-center">
              📋
            </span>
            What to Do If Arrested
          </h2>

          <div className="p-4 rounded-2xl bg-[var(--danger)]/5 border border-[var(--danger)]/20">
            <p className="text-sm text-[var(--foreground)]">
              <span className="font-bold text-[var(--danger)]">IMPORTANT: </span>
              This is educational information only. Every situation is different. 
              Use your best judgment and prioritize your safety.
            </p>
          </div>

          <div className="space-y-4">
            {arrestChecklist.map((item, index) => (
              <div
                key={item.id}
                className={`right-card p-5 rounded-2xl border transition-all duration-300 ${
                  item.critical
                    ? 'bg-[var(--danger)]/5 border-[var(--danger)]/30'
                    : 'bg-[var(--card-bg)] border-[var(--card-border)] hover:border-[var(--accent)]/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
                    item.critical ? 'bg-[var(--danger)]/20' : 'bg-[var(--accent)]/10'
                  }`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-[var(--muted)]">
                        Step {index + 1}
                      </span>
                      {item.critical && (
                        <span className="px-2 py-0.5 rounded-full bg-[var(--danger)]/20 text-[var(--danger)] text-xs font-medium">
                          CRITICAL
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-[var(--foreground)] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--muted)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Resources */}
          <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)]">
            <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">
              Additional Resources
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a 
                href="https://www.aclu.org/know-your-rights/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[var(--background)] border border-[var(--card-border)] hover:border-[var(--accent)]/50 transition-colors group"
              >
                <h4 className="font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                  ACLU Know Your Rights →
                </h4>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Comprehensive guides on various legal rights
                </p>
              </a>
              
              <a 
                href="https://www.nlg.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[var(--background)] border border-[var(--card-border)] hover:border-[var(--accent)]/50 transition-colors group"
              >
                <h4 className="font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                  National Lawyers Guild →
                </h4>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Legal support for activists and protesters
                </p>
              </a>
              
              <a 
                href="https://www.findlaw.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[var(--background)] border border-[var(--card-border)] hover:border-[var(--accent)]/50 transition-colors group"
              >
                <h4 className="font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                  FindLaw →
                </h4>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Find attorneys and legal information
                </p>
              </a>
              
              <a 
                href="https://www.lawhelp.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[var(--background)] border border-[var(--card-border)] hover:border-[var(--accent)]/50 transition-colors group"
              >
                <h4 className="font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                  LawHelp.org →
                </h4>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Free legal help for low-income individuals
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
