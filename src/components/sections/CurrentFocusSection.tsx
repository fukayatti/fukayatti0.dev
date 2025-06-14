import {
  ArrowRight,
  Clock,
  Code2,
  Cpu,
  Smartphone,
  Target,
  TrendingUp,
  Trophy,
  Users,
} from 'lucide-react';

import type { CurrentFocusArea } from '@/lib/notion-content';

import CurrentFocusSummaryCard from '../ui/CurrentFocusSummaryCard';

interface CurrentFocusSectionProps {
  focusAreas: CurrentFocusArea[];
}

export default function CurrentFocusSection({
  focusAreas,
}: CurrentFocusSectionProps) {
  // Icon mapping function
  const getIconComponent = (iconName?: string) => {
    // Handle null, undefined, or empty string cases
    if (!iconName || iconName.trim() === '') {
      return Code2;
    }

    switch (iconName) {
      case 'Code2':
        return Code2;
      case 'Smartphone':
        return Smartphone;
      case 'Cpu':
        return Cpu;
      case 'Trophy':
        return Trophy;
      case 'TrendingUp':
        return TrendingUp;
      case 'Clock':
        return Clock;
      case 'Target':
        return Target;
      case 'Users':
        return Users;
      case 'ArrowRight':
        return ArrowRight;
      default:
        // Log unknown icon names for debugging
        console.warn(`Unknown icon name: ${iconName}, falling back to Code2`);
        return Code2;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return {
          text: 'text-primary-300',
          bg: 'from-primary-500 to-primary-400',
          border: 'border-primary-500/30',
          glow: 'shadow-primary-500/20',
          progress: 'bg-primary-500',
        };
      case 'accent':
        return {
          text: 'text-accent-300',
          bg: 'from-accent-500 to-accent-400',
          border: 'border-accent-500/30',
          glow: 'shadow-accent-500/20',
          progress: 'bg-accent-500',
        };
      case 'secondary':
        return {
          text: 'text-purple-300',
          bg: 'from-purple-500 to-purple-400',
          border: 'border-purple-500/30',
          glow: 'shadow-purple-500/20',
          progress: 'bg-purple-500',
        };
      case 'warning':
        return {
          text: 'text-orange-300',
          bg: 'from-orange-500 to-orange-400',
          border: 'border-orange-500/30',
          glow: 'shadow-orange-500/20',
          progress: 'bg-orange-500',
        };
      default:
        return {
          text: 'text-primary-300',
          bg: 'from-primary-500 to-primary-400',
          border: 'border-primary-500/30',
          glow: 'shadow-primary-500/20',
          progress: 'bg-primary-500',
        };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <TrendingUp className="w-4 h-4" />;
      case 'Learning':
        return <Target className="w-4 h-4" />;
      case 'Exploring':
        return <Clock className="w-4 h-4" />;
      case 'Competing':
        return <Users className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  return (
    <section className="mb-20">
      {/* Enhanced header with unified styling */}
      <div className="text-center mb-12">
        <h2 className="text-display mb-4">
          <span className="gradient-text">Current Focus</span>
        </h2>
        <p className="text-body max-w-2xl mx-auto text-foreground/70">
          My ongoing projects and learning journey in technology
        </p>
      </div>

      {/* Focus Areas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {focusAreas.map((area, index) => {
          const colorClasses = getColorClasses(area.color);
          const IconComponent = getIconComponent(area.icon);
          return (
            <div key={area.id} className="group relative">
              <div className="glass rounded-2xl border border-white/10 shadow-glass overflow-hidden h-full hover:shadow-glow-lg transition-all duration-300 group-hover:scale-105">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -top-1/2 -right-1/2 w-32 h-32 rounded-full blur-2xl animate-pulse opacity-10 bg-gradient-to-br from-primary-400 to-accent-400" />
                </div>

                <div className="relative p-8 space-y-6">
                  {/* Icon and Title */}
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl glass flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300 ${colorClasses.text}`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`text-xl font-semibold ${colorClasses.text}`}
                      >
                        {area.title}
                      </h3>
                      <p className="text-sm text-foreground/70">
                        {area.subtitle}
                      </p>
                    </div>
                    <div
                      className={`flex items-center gap-1 px-3 py-1 glass rounded-full border border-white/10 text-xs font-medium ${colorClasses.text}`}
                    >
                      {getStatusIcon(area.status)}
                      <span>{area.status}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-foreground/70 leading-relaxed">
                    {area.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground/70">
                        Progress
                      </span>
                      <span
                        className={`text-sm font-bold ${colorClasses.text}`}
                      >
                        {area.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full ${colorClasses.progress} transition-all duration-1000 ease-out rounded-full`}
                        style={{ width: `${area.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="glass rounded-lg p-3 border border-white/10">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-foreground/70">
                        Completed
                      </div>
                      <div className={`font-semibold ${colorClasses.text}`}>
                        {area.stats}
                      </div>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-foreground/70">
                      Tech Stack
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {area.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs font-medium glass rounded border border-white/10 text-foreground/70 hover:scale-105 transition-transform duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r ${colorClasses.bg} text-white rounded-xl font-semibold hover:scale-105 transition-all duration-200 group/button`}
                  >
                    <span>View Projects</span>
                    <ArrowRight className="w-4 h-4 transform group-hover/button:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Card */}
      <CurrentFocusSummaryCard />
    </section>
  );
}
