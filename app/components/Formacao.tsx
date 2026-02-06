import { motion } from "framer-motion";

export function Formacao({ graduacoes }: { graduacoes: any[] }) {
    return (
        <section id="formacao" className="py-24 px-6 max-w-6xl mx-auto">
            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-5xl font-black mb-16 flex items-center gap-6 text-slate-800"
            >
                <span className="w-16 h-2 bg-blue-600 rounded-full"></span>Educação
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-slate-800">
                {graduacoes.map((edu, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.2 }}
                        className="bg-white p-12 rounded-[48px] shadow-sm border border-slate-100 flex flex-col items-center hover:shadow-xl transition-all h-full group"
                    >
                        <img src={edu.logo} alt={edu.universidade} className="h-20 mb-8 object-contain grayscale group-hover:grayscale-0 transition-all duration-700" />

                        {/* RESTAURADO: Exibição do Nível Técnico/Graduação */}
                        {edu.nivel && (
                            <span className="text-blue-600 font-black text-xs uppercase tracking-widest mb-2">
                                {edu.nivel}
                            </span>
                        )}

                        <h3 className="text-2xl font-black mb-2">{edu.universidade}</h3>
                        <p className="text-slate-500 font-bold mb-6">{edu.curso}</p>

                        {edu.periodo && (
                            <div className="mt-auto px-8 py-2 bg-slate-50 rounded-full text-slate-400 font-mono text-sm border border-slate-100">
                                {edu.periodo}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}