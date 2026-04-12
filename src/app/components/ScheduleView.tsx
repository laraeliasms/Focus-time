import { motion } from 'motion/react';
import { Clock, AlertCircle, CheckCircle2, Circle } from 'lucide-react';
import type { StudyProfile } from '../App';

type ScheduleViewProps = {
  profile: StudyProfile;
};

type StudySession = {
  id: string;
  subject: string;
  topic: string;
  duration: number;
  time: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
};

export function ScheduleView({ profile }: ScheduleViewProps) {
  // Gera cronograma baseado no perfil
  const generateSchedule = (): StudySession[] => {
    const sessions: StudySession[] = [];
    const sessionDuration = 25; // Pomodoro de 25 min (ideal para TDAH)
    const sessionsPerDay = Math.floor((profile.availableHoursPerDay * 60) / (sessionDuration + 5)); // +5 min pausa

    let sessionId = 1;
    let currentTime = 8; // Começa às 8h

    // Prioriza matérias fracas
    profile.weakSubjects.forEach((subject, index) => {
      if (index < sessionsPerDay * 0.6) { // 60% do tempo nas matérias fracas
        sessions.push({
          id: `session-${sessionId++}`,
          subject,
          topic: `Conceitos fundamentais de ${subject}`,
          duration: sessionDuration,
          time: `${String(Math.floor(currentTime)).padStart(2, '0')}:${String((currentTime % 1) * 60).padStart(2, '0')}`,
          priority: 'high',
          completed: false,
        });
        currentTime += (sessionDuration + 5) / 60;
      }
    });

    // Adiciona outras matérias
    profile.subjects.filter(s => !profile.weakSubjects.includes(s)).forEach((subject, index) => {
      if (sessions.length < sessionsPerDay) {
        sessions.push({
          id: `session-${sessionId++}`,
          subject,
          topic: `Revisão de ${subject}`,
          duration: sessionDuration,
          time: `${String(Math.floor(currentTime)).padStart(2, '0')}:${String((currentTime % 1) * 60).padStart(2, '0')}`,
          priority: 'medium',
          completed: false,
        });
        currentTime += (sessionDuration + 5) / 60;
      }
    });

    return sessions;
  };

  const schedule = generateSchedule();
  const completedCount = schedule.filter(s => s.completed).length;
  const totalSessions = schedule.length;

  return (
    <div>
      {/* Hero Stats */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 text-white mb-6">
          <h2 className="text-3xl mb-2">Seu cronograma fracionado</h2>
          <p className="text-indigo-100 mb-6">
            Sistema Pomodoro adaptado para TDAH: sessões de 25 minutos com pausas de 5 minutos
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
              <div className="text-3xl mb-1">{totalSessions}</div>
              <div className="text-indigo-100 text-sm">Sessões por dia</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
              <div className="text-3xl mb-1">{profile.availableHoursPerDay}h</div>
              <div className="text-indigo-100 text-sm">Tempo total</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
              <div className="text-3xl mb-1">{profile.weakSubjects.length}</div>
              <div className="text-indigo-100 text-sm">Foco principal</div>
            </div>
          </div>
        </div>

        {/* Dicas para TDAH */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
          <div className="flex gap-3">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg mb-2 text-amber-900">Dicas para manter o foco</h3>
              <ul className="space-y-1 text-amber-800">
                <li>• Elimine distrações: silencie celular e notificações</li>
                <li>• Use timer visível para cada sessão de 25 minutos</li>
                <li>• Nas pausas: levante, beba água, movimente-se</li>
                <li>• Recompense-se após completar 4 sessões</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl text-gray-900">Hoje</h3>
          <div className="text-sm text-gray-600">
            {completedCount} de {totalSessions} concluídas
          </div>
        </div>

        <div className="space-y-3">
          {schedule.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-2xl p-6 border-2 transition-all ${
                session.completed
                  ? 'border-green-200 bg-green-50'
                  : session.priority === 'high'
                  ? 'border-red-200'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {session.completed ? (
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                  ) : (
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      session.priority === 'high' ? 'bg-red-100' : 'bg-gray-100'
                    }`}>
                      <Circle className={`w-6 h-6 ${
                        session.priority === 'high' ? 'text-red-600' : 'text-gray-400'
                      }`} />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-lg text-gray-900">{session.subject}</h4>
                    {session.priority === 'high' && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-lg">
                        Prioridade
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3">{session.topic}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {session.time}
                    </span>
                    <span>{session.duration} minutos</span>
                  </div>
                </div>

                {!session.completed && (
                  <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">
                    Iniciar
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
