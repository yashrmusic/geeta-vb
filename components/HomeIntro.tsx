import React from 'react';

const HomeIntro: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mb-12">
      <div className="bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-2xl border border-amber-500/20 rounded-3xl p-8 md:p-12 shadow-2xl">
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              <span className="bg-gradient-to-r from-white via-amber-50 to-amber-100 bg-clip-text text-transparent">
                The Ashtavakra Gita
              </span>
            </h2>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mb-6"></div>
          </div>
          
          <div className="space-y-4 text-amber-50/80 leading-relaxed font-light">
            <p className="text-lg">
              The <span className="text-amber-200/90 font-medium">Ashtavakra Gita</span>, also known as the Ashtavakra Samhita, is a profound ancient Sanskrit text that presents the teachings of Advaita Vedanta—the philosophy of non-duality. This timeless dialogue between the sage Ashtavakra and King Janaka reveals the path to self-realization and liberation.
            </p>
            
            <p>
              Unlike traditional scriptures that prescribe practices and disciplines, the Ashtavakra Gita directly points to the truth of your essential nature: that you are already free, already complete, already the absolute reality you seek. It teaches that liberation is not something to be attained, but something to be recognized.
            </p>
            
            <p>
              <span className="text-amber-200/90 font-medium">Note:</span> The Ashtavakra Gita is distinct from the Bhagavad Gita—while both are profound spiritual texts, the Ashtavakra Gita offers a more direct, uncompromising approach to non-duality, emphasizing immediate recognition over gradual practice.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-amber-500/20">
            <h3 className="text-xl md:text-2xl font-light text-amber-200/90 mb-4">
              Understanding <span className="text-amber-100">Advaita Vedanta</span>
            </h3>
            <div className="space-y-4 text-amber-50/80 leading-relaxed font-light">
              <p>
                <span className="text-amber-200/90 font-medium">Advaita Vedanta</span> means "non-dual end of knowledge." It is one of the six orthodox schools of Hindu philosophy and teaches that:
              </p>
              <ul className="list-none space-y-3 pl-4">
                <li className="flex items-start gap-3">
                  <span className="text-amber-400/60 mt-1">•</span>
                  <span><strong className="text-amber-200/90">The Self (Atman) and Ultimate Reality (Brahman) are one.</strong> There is no separation between you and the absolute.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400/60 mt-1">•</span>
                  <span><strong className="text-amber-200/90">The world is an illusion (Maya).</strong> The appearance of duality, separation, and multiplicity is not the ultimate truth.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400/60 mt-1">•</span>
                  <span><strong className="text-amber-200/90">Liberation is recognition, not achievement.</strong> You are already free; you simply need to realize what you already are.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400/60 mt-1">•</span>
                  <span><strong className="text-amber-200/90">The witness consciousness is your true nature.</strong> You are the awareness that observes all experiences, untouched by them.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-amber-500/20">
            <p className="text-amber-100/70 text-sm italic leading-relaxed">
              The Ashtavakra Gita presents these profound truths in a direct, uncompromising manner. It cuts through all concepts, practices, and beliefs to point directly at the truth of non-dual awareness. As you explore these 20 chapters, you'll discover teachings that have guided seekers for millennia toward the recognition of their true, eternal nature.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeIntro;

