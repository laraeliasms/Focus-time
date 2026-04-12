import { BookOpen, Brain, Calendar, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

type WelcomeScreenProps = {
  onStart: () => void;
};

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-2xl mb-6"
          >
            <Brain className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-5xl mb-4 text-gray-900">FocusTime</h1>
          <p className="text-xl text-gray-600 max-w-lg mx-auto">
            Seu assistente pessoal de estudos adaptado para TDAH
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl mb-8">
          <h2 className="text-2xl mb-6 text-gray-900">Como funciona</h2>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg mb-1 text-gray-900">Responda perguntas simples</h3>
                <p className="text-gray-600">Conte sobre suas necessidades e dificuldades de estudo</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg mb-1 text-gray-900">Receba seu cronograma</h3>
                <p className="text-gray-600">Criamos um plano fracionado focado nos seus pontos fracos</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg mb-1 text-gray-900">Pratique com questões</h3>
                <p className="text-gray-600">Exercícios personalizados para fixar o conteúdo</p>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="w-full bg-indigo-600 text-white py-4 rounded-2xl text-xl hover:bg-indigo-700 transition-colors shadow-lg"
        >
          Começar agora
        </motion.button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Leva apenas 2 minutos para configurar
        </p>
      </motion.div>
    </div>
  );
}
