import { useRef } from "react";
import { motion } from "framer-motion";

export function Certificados({ certificados, onSelect }: { certificados: any[], onSelect: (cert: any) => void }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollManual = (dir: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 420;
            const target = dir === "left" ? scrollRef.current.scrollLeft - scrollAmount : scrollRef.current.scrollLeft + scrollAmount;
            scrollRef.current.scrollTo({ left: target, behavior: "smooth" });
        }
    };

    return (
        <section id="certificados" className="py-32 bg-white border-y border-slate-100 overflow-hidden text-slate-800">
            <div className="max-w-6xl mx-auto px-6 mb-16 flex justify-between items-end">
                <h2 className="text-5xl font-black tracking-tighter">Certificados</h2>
                <div className="flex gap-4">
                    <button onClick={() => scrollManual("left")} className="w-14 h-14 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm z-10 font-bold text-xl">❮</button>
                    <button onClick={() => scrollManual("right")} className="w-14 h-14 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm z-10 font-bold text-xl">❯</button>
                </div>
            </div>

            <div className="relative w-full">
                <div ref={scrollRef} className="flex overflow-x-auto scrollbar-hide py-6 px-10 gap-10 snap-x snap-mandatory scroll-smooth">
                    {certificados.map((cert, index) => (
                        <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="w-[380px] flex-shrink-0 snap-center cursor-pointer" onClick={() => onSelect(cert)}>
                            <div className="bg-slate-50 rounded-[40px] overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                                <img src={cert.img} alt={cert.titulo} className="w-full h-56 object-cover" />
                                <div className="p-10 text-center font-black text-slate-800 text-sm uppercase whitespace-normal tracking-wider">{cert.titulo}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}