import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Wind, AlertCircle, CheckCircle, ArrowRight, Dog, Home, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

type QuizStep = 'question1' | 'question2' | 'question3' | 'result';

interface QuizState {
    step: QuizStep;
    score: number;
    answers: {
        pets?: boolean;
        homeAge?: number;
        allergies?: boolean;
    };
}

const AirQualityQuiz = () => {
    const [state, setState] = useState<QuizState>({
        step: 'question1',
        score: 0,
        answers: {}
    });

    const calculateRiskLevel = (score: number) => {
        if (score <= 1) return { level: 'Low Risk', color: 'text-green-500', bg: 'bg-green-100', text: 'Your indoor air quality has a low risk of severe contamination. A standard cleaning is recommended for maintenance.' };
        if (score === 2) return { level: 'Medium Risk', color: 'text-yellow-500', bg: 'bg-yellow-100', text: 'You have elevated risk factors for poor indoor air quality. A professional duct cleaning is highly recommended.' };
        return { level: 'High Risk', color: 'text-red-500', bg: 'bg-red-100', text: 'Your home exhibits multiple high-risk factors for severe air contamination. Immediate HVAC cleaning is strongly advised to protect your health.' };
    };

    const handleAnswer = (question: keyof QuizState['answers'], value: any, points: number) => {
        const nextStepMap: Record<string, QuizStep> = {
            question1: 'question2',
            question2: 'question3',
            question3: 'result'
        };

        setState(prev => ({
            step: nextStepMap[prev.step],
            score: prev.score + points,
            answers: { ...prev.answers, [question]: value }
        }));
    };

    const resetQuiz = () => {
        setState({ step: 'question1', score: 0, answers: {} });
    };

    const risk = calculateRiskLevel(state.score);

    const slideVariants = {
        enter: { x: 50, opacity: 0 },
        center: { x: 0, opacity: 1 },
        exit: { x: -50, opacity: 0 }
    };

    return (
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative max-w-2xl mx-auto">
            {/* Header progress bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
                <motion.div
                    className="h-full bg-brand-500"
                    initial={{ width: '0%' }}
                    animate={{ width: state.step === 'question1' ? '25%' : state.step === 'question2' ? '50%' : state.step === 'question3' ? '75%' : '100%' }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            <div className="p-8 sm:p-12 relative">
                {state.step !== 'result' && (
                    <div className="text-center mb-8">
                        <span className="inline-block px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-sm font-bold mb-3">
                            Free Assessment
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                            What is your home's Air Risk Score?
                        </h3>
                    </div>
                )}

                <div className="relative min-h-[250px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {state.step === 'question1' && (
                            <motion.div
                                key="q1"
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                                className="w-full"
                            >
                                <div className="flex justify-center mb-6">
                                    <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center">
                                        <Dog className="w-8 h-8 text-brand-600" />
                                    </div>
                                </div>
                                <h4 className="text-xl font-semibold text-center mb-8 text-slate-800">Do you have indoor pets that shed hair or dander?</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Button onClick={() => handleAnswer('pets', true, 1)} className="py-8 text-lg bg-slate-50 border-2 border-slate-200 text-slate-700 hover:bg-brand-50 hover:border-brand-500 hover:text-brand-700 transition-all font-semibold rounded-xl" variant="outline">
                                        Yes, I do
                                    </Button>
                                    <Button onClick={() => handleAnswer('pets', false, 0)} className="py-8 text-lg bg-slate-50 border-2 border-slate-200 text-slate-700 hover:bg-brand-50 hover:border-brand-500 hover:text-brand-700 transition-all font-semibold rounded-xl" variant="outline">
                                        No pets
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {state.step === 'question2' && (
                            <motion.div
                                key="q2"
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                                className="w-full"
                            >
                                <div className="flex justify-center mb-6">
                                    <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center">
                                        <Home className="w-8 h-8 text-brand-600" />
                                    </div>
                                </div>
                                <h4 className="text-xl font-semibold text-center mb-8 text-slate-800">When was the last time the HVAC ducts were professionally cleaned?</h4>
                                <div className="flex flex-col gap-3">
                                    <Button onClick={() => handleAnswer('homeAge', 1, 0)} className="w-full py-6 text-md bg-slate-50 border border-slate-200 text-slate-700 justify-start hover:bg-brand-50 hover:border-brand-500 hover:text-brand-700 px-6 rounded-xl" variant="outline">
                                        Within the last 1-2 years
                                    </Button>
                                    <Button onClick={() => handleAnswer('homeAge', 2, 1)} className="w-full py-6 text-md bg-slate-50 border border-slate-200 text-slate-700 justify-start hover:bg-brand-50 hover:border-brand-500 hover:text-brand-700 px-6 rounded-xl" variant="outline">
                                        3 to 5 years ago
                                    </Button>
                                    <Button onClick={() => handleAnswer('homeAge', 3, 2)} className="w-full py-6 text-md bg-slate-50 border border-slate-200 text-slate-700 justify-start hover:bg-brand-50 hover:border-brand-500 hover:text-brand-700 px-6 rounded-xl" variant="outline">
                                        More than 5 years ago / I don't know
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {state.step === 'question3' && (
                            <motion.div
                                key="q3"
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                                className="w-full"
                            >
                                <div className="flex justify-center mb-6">
                                    <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center">
                                        <Stethoscope className="w-8 h-8 text-brand-600" />
                                    </div>
                                </div>
                                <h4 className="text-xl font-semibold text-center mb-8 text-slate-800">Does anyone in your home suffer from asthma, unexplained allergies, or wake up congested?</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Button onClick={() => handleAnswer('allergies', true, 2)} className="py-8 text-lg bg-slate-50 border-2 border-slate-200 text-slate-700 hover:bg-brand-50 hover:border-brand-500 hover:text-brand-700 transition-all font-semibold rounded-xl" variant="outline">
                                        Yes, frequently
                                    </Button>
                                    <Button onClick={() => handleAnswer('allergies', false, 0)} className="py-8 text-lg bg-slate-50 border-2 border-slate-200 text-slate-700 hover:bg-brand-50 hover:border-brand-500 hover:text-brand-700 transition-all font-semibold rounded-xl" variant="outline">
                                        No, rarely
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {state.step === 'result' && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                                className="w-full text-center"
                            >
                                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${risk.bg} mb-6 shadow-inner`}>
                                    {state.score <= 1 ? <ShieldCheck className={`w-12 h-12 ${risk.color}`} /> : <AlertCircle className={`w-12 h-12 ${risk.color}`} />}
                                </div>

                                <h3 className="text-xl text-slate-500 font-semibold mb-2">Your Assessment Result</h3>
                                <h2 className={`text-4xl font-black ${risk.color} mb-6`}>{risk.level}</h2>

                                <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg mx-auto bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                    {risk.text}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button asChild size="lg" className="btn-premium px-8 py-6 text-lg rounded-xl shadow-xl w-full sm:w-auto">
                                        <Link to="/quote">
                                            Claim Your Free Quote
                                            <ArrowRight className="ml-2 w-5 h-5" />
                                        </Link>
                                    </Button>
                                    <Button onClick={resetQuiz} variant="ghost" className="text-slate-500 hover:bg-slate-100 rounded-xl py-6 underline-offset-4 hover:underline">
                                        Retake Assessment
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            {/* Background design accents */}
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-sky-100 rounded-full blur-2xl opacity-50 pointer-events-none"></div>
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-brand-100 rounded-full blur-2xl opacity-50 pointer-events-none"></div>
        </div>
    );
};

export default AirQualityQuiz;
