import React, { useEffect, useState, useRef } from 'react';
import { useData } from '../context/DataContext';
import { Building2, Layers, UserCheck, Users, Activity } from 'lucide-react';

export const StatsCounter: React.FC = () => {
  const { statistics } = useData();
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return Building2;
      case 'Layers': return Layers;
      case 'UserCheck': return UserCheck;
      case 'Users': return Users;
      default: return Activity;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const duration = 1500;
    const steps = 30;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const newCounts: { [key: string]: number } = {};

      statistics.forEach((stat) => {
        const progress = Math.min(step / steps, 1);
        // Easing function for smooth countup
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        newCounts[stat.id] = Math.floor(stat.value * easeProgress);
      });

      setCounts(newCounts);

      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasAnimated, statistics]);

  return (
    <section ref={sectionRef} className="py-14 sm:py-16 bg-gradient-to-b from-slate-50 to-sky-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
            Kinerja Pelayanan Maritim
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Statistik Puskesmas Kepulauan Seribu Selatan
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Jejaring pelayanan kesehatan terpadu melayani seluruh masyarakat di pulau-pulau pemukiman pesisir.
          </p>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statistics.map((stat) => {
            const Icon = getIcon(stat.icon);
            const displayValue = hasAnimated
              ? counts[stat.id] !== undefined
                ? counts[stat.id].toLocaleString('id-ID')
                : stat.value.toLocaleString('id-ID')
              : 0;

            return (
              <div
                key={stat.id}
                className="relative bg-white rounded-2xl p-6 border border-slate-100 shadow-md shadow-sky-900/5 hover:shadow-xl hover:border-sky-200 transition-all duration-300 group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-sky-100 to-transparent rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:scale-110 transition-transform" />

                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-700 text-white flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center">
                      {displayValue}
                      <span className="text-sky-600 text-xl sm:text-2xl ml-0.5">{stat.suffix}</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-sky-700 transition-colors">
                    {stat.label}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
