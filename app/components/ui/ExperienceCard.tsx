import { motion } from "framer-motion";

export function Experiencia({ experiencias }: { experiencias: any[] }) {
    return (
        <section id="experiencia" className="py-32 bg-slate-50/50 px-6 border-b border-slate-100 text-slate-800 text-left">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl font-black mb-20 flex items-center gap-8"
                >
                    <span className="w-16 h-2 bg-blue-600 rounded-full"></span>Carreira
                </motion.h2>
                {experiencias.map((exp, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className="p-10 bg-white/60 backdrop-blur-md rounded-[48px] border border-slate-200 shadow-sm hover:shadow-xl transition-all mb-10"
                    >
                        <div className="flex justify-between items-start flex-wrap gap-4">
                            <div><h3 className="text-3xl font-black tracking-tight">{exp.empresa}</h3><p className="text-blue-600 font-bold text-lg">{exp.cargo}</p></div>
                            <span className="text-sm text-slate-400 font-mono bg-slate-100 px-5 py-2 rounded-full border border-slate-200">{exp.periodo}</span>
                        </div>
                        <p className="mt-8 text-slate-600 text-lg leading-relaxed text-justify">{exp.descricao}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}