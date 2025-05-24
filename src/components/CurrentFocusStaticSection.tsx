import {
  Code2,
  Smartphone,
  Cpu,
  Trophy,
  TrendingUp,
  Clock,
  Target,
  Users,
  ArrowRight,
} from 'lucide-react';
import type { CurrentFocusArea } from '@/lib/notion-content';

interface CurrentFocusStaticSectionProps {
  focusAreas: CurrentFocusArea[];
}

export default function CurrentFocusStaticSection({
  focusAreas,
}: CurrentFocusStaticSectionProps) {
  // Icon mapping function
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return Code2;
      case 'Smartphone':
        return Smartphone;
      case 'Cpu':
        return Cpu;
      case 'Trophy':
        return Trophy;
      default:
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
        <p className="text-body max-w-2xl mx-auto text-muted-foreground">
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
                      <p className="text-sm text-muted-foreground">
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
                  <p className="text-muted-foreground-300 leading-relaxed">
                    {area.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground">
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
                      <div className="text-sm text-muted-foreground">
                        Completed
                      </div>
                      <div className={`font-semibold ${colorClasses.text}`}>
                        {area.stats}
                      </div>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-muted-foreground">
                      Tech Stack
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {area.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs font-medium glass rounded border border-white/10 text-muted-foreground-300 hover:scale-105 transition-transform duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r ${colorClasses.bg} text-muted-foreground rounded-xl font-semibold hover:scale-105 transition-all duration-200 group/button`}
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
      <div className="glass rounded-2xl border border-white/10 shadow-glass p-8">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-muted-foreground">
              Learning Journey Overview
            </h3>
            <p className="text-muted-foreground-300">
              Continuously expanding my skillset across multiple domains
            </p>
          </div>

          {/* Overall Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Active Projects', value: '26+', icon: Code2 },
              { label: 'Technologies', value: '15+', icon: Cpu },
              { label: 'Problems Solved', value: '150+', icon: Trophy },
              { label: 'Learning Hours', value: '500+', icon: Clock },
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={stat.label} className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-xl glass flex items-center justify-center text-primary-400 border border-white/10">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="text-lg font-bold text-primary-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="pt-4">
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-muted-foreground rounded-xl font-semibold hover:scale-105 transition-all duration-200 group">
              <Code2 className="w-5 h-5" />
              <span>Explore All Projects</span>
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
