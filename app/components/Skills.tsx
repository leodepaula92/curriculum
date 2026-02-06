import { motion } from "framer-motion";

export function Skills({ skills }: { skills: any[] }) {
    return (
        <section id="skills" className="py-32 bg-slate-900 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl font-black text-white mb-24 text-left tracking-tight uppercase"
                >
                    Expertise
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skills.map((grupo, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-white/5 backdrop-blur-3xl p-10 rounded-[48px] border border-white/10 group hover:border-blue-500/50 transition-all text-left"
                        >
                            {/* Título da categoria em MAIÚSCULAS */}
                            <h3 className="text-xl font-bold text-blue-400 mb-8 border-b border-white/5 pb-6 tracking-wide uppercase">
                                {grupo.categoria}
                            </h3>

                            <div className="flex flex-wrap gap-2.5">
                                {grupo.itens.map((skill: string, sIdx: number) => (
                                    <span
                                        key={sIdx}
                                        className="px-4 py-1.5 bg-white/5 text-slate-400 text-[11px] font-bold rounded-full border border-white/5 group-hover:bg-blue-600/10 group-hover:text-blue-100 transition-colors uppercase tracking-widest"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}