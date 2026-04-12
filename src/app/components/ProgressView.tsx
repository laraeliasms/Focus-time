import { motion } from 'motion/react';
import { TrendingUp, Target, Flame, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import type { StudyProfile } from '../App';

type ProgressViewProps = {
  profile: StudyProfile;
};

export function ProgressView({ profile }: ProgressViewProps) {
  // Dados mockados para demonstração
  const weeklyProgress = [
    { day: 'Seg', hours: 2.5, sessions: 6 },
    { day: 'Ter', hours: 3, sessions: 7 },
    { day: 'Qua', hours: 2, sessions: 5 },
    { day: 'Qui', hours: 3.5, sessions: 8 },
    { day: 'Sex', hours: 2.5, sessions: 6 },
    { day: 'Sáb', hours: 1.5, sessions: 4 },
    { day: 'Dom', hours: 1, sessions: 2 },
  ];

  const subjectProgress = profile.weakSubjects.map((subject, index) => ({
    subject,
    progress: Math.floor(Math.random() * 40) + 30, // 30-70%
    questionsAnswered: Math.floor(Math.random() * 20) + 10,
  }));

  const stats = [
    {
      label: 'Sequência atual',
      value: '5',
      unit: 'dias',
      icon: Flame,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
    {
      label: 'Sessões completas',
      value: '38',
      unit: 'sessões',
      icon: Target,
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: 'Taxa de acerto',
      value: '78',
      unit: '%',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      label: 'Conquistas',
      value: '12',
      unit: 'badges',
      icon: Award,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
  ];

  return (
    <div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
              <div className="text-3xl mb-1 text-gray-900">
                {stat.value}
                <span className="text-lg text-gray-600 ml-1">{stat.unit}</span>
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Weekly Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl mb-6 text-gray-900">Atividade semanal</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                }}
              />
              <Bar dataKey="hours" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sessions Trend */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl mb-6 text-gray-900">Evolução de sessões</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                }}
              />
              <Line
                type="monotone"
                dataKey="sessions"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Subject Progress */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl mb-6 text-gray-900">Progresso por matéria</h3>
        <div className="space-y-6">
          {subjectProgress.map((item, index) => (
            <motion.div
              key={item.subject}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-lg text-gray-900">{item.subject}</h4>
                  <p className="text-sm text-gray-600">{item.questionsAnswered} questões respondidas</p>
                </div>
                <span className="text-2xl text-indigo-600">{item.progress}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.progress}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="mt-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl mb-6">Conquistas recentes</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { emoji: '🔥', title: 'Sequência de 5 dias', unlocked: true },
            { emoji: '⭐', title: '50 questões', unlocked: true },
            { emoji: '🎯', title: '80% de acerto', unlocked: true },
            { emoji: '🏆', title: '1 semana completa', unlocked: false },
          ].map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`text-center p-4 rounded-xl ${
                achievement.unlocked ? 'bg-white/20 backdrop-blur' : 'bg-white/10 backdrop-blur opacity-50'
              }`}
            >
              <div className="text-4xl mb-2">{achievement.emoji}</div>
              <div className="text-sm">{achievement.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
