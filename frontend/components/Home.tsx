import React from 'react';
import { Talent } from '../types.ts';
import { ArrowRight } from 'lucide-react';

interface HomeProps {
  talents: Talent[];
  onSelectTalent: (id: string) => void;
  onSeeMore: () => void;
}

export const Home: React.FC<HomeProps> = ({ talents, onSelectTalent, onSeeMore }) => {
  return (
    <div className="min-h-screen bg-kult-black pb-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">
          AI TALENT<br />LIBRARY
        </h1>
        <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl font-light">
          Build what people follow. This library contains a collection of KULT AI-generated personas that can be reused, customized, and activated across brand campaigns.
        </p>
      </section>

      {/* Steps Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-zinc-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="text-4xl font-light text-zinc-600 mb-4">1</div>
            <h3 className="text-2xl font-bold mb-4">BROWSE</h3>
            <p className="text-zinc-400">View available AI talents by ethnicity, gender, style, and campaign fit.</p>
          </div>
          <div>
            <div className="text-4xl font-light text-zinc-600 mb-4">2</div>
            <h3 className="text-2xl font-bold mb-4">SELECT</h3>
            <p className="text-zinc-400">Choose the talent that best matches your brand or campaign.</p>
          </div>
          <div>
            <div className="text-4xl font-light text-zinc-600 mb-4">3</div>
            <h3 className="text-2xl font-bold mb-4">CUSTOMISE</h3>
            <p className="text-zinc-400">We adapt the selected talent into your product, scene, outfit, video, or campaign format.</p>
          </div>
        </div>
      </section>

      {/* Talent Overview Grid Section */}
      <section id="talent-overview" className="max-w-7xl mx-auto px-6 py-16 scroll-mt-24">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold uppercase tracking-wide">Talent Overview</h2>
          <button 
            onClick={onSeeMore}
            className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 font-bold uppercase tracking-wider text-sm transition-colors group"
          >
            <span>See All Talents</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {talents.slice(0, 4).map((talent) => (
            <div 
              key={talent.id} 
              onClick={() => onSelectTalent(talent.id)}
              className="group cursor-pointer bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-cyan-400 transition-colors flex flex-col"
            >
              <div className="aspect-[3/4] w-full overflow-hidden bg-zinc-800 relative">
                <img 
                  src={talent.mainImageUrl || `https://picsum.photos/seed/${talent.imageSeed}_main/400/600`} 
                  alt={talent.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-cyan-400 font-bold flex items-center space-x-2">
                    <span>View Profile</span>
                    <ArrowRight size={16} />
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="text-xs font-mono text-zinc-500 mb-2">{talent.id}</div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">{talent.name}</h3>
                <p className="text-sm text-zinc-400 line-clamp-2 mt-auto">
                  {talent.bestFit.join(', ')}
                </p>
              </div>
            </div>
          ))}
          
          {talents.length === 0 && (
            <div className="col-span-full py-12 text-center text-zinc-500 border border-dashed border-zinc-800 rounded-2xl">
              No talents available in the catalog.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
