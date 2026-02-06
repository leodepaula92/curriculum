import { useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Certificados({ certificados, onSelect }: { certificados: any[], onSelect: (cert: any) => void }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState("TODOS");

    // Lista única de tags extraídas dos certificados
    const tagsDisponiveis = useMemo(() => {
        const todasTags = certificados.flatMap(c => c.tags || []);
        return ["TODOS", ...Array.from(new Set(todasTags)).sort()];
    }, [certificados]);

    // Lógica de Filtro Duplo (Nome + Categoria)
    const certificadosFiltrados = useMemo(() => {
        return certificados.filter(cert => {
            const matchesSearch = cert.titulo.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesTag = selectedTag === "TODOS" || (cert.tags && cert.tags.includes(selectedTag));
            return matchesSearch && matchesTag;
        });
    }, [searchTerm, selectedTag, certificados]);

    const scrollManual = (dir: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 420;
            const target = dir === "left" ? scrollRef.current.scrollLeft - scrollAmount : scrollRef.current.scrollLeft + scrollAmount;
            scrollRef.current.scrollTo({ left: target, behavior: "smooth" });
        }
    };

    return (
        <section id="certificados" className="py-32 bg-white border-y border-slate-100 overflow-hidden text-slate-800">
            <div className="max-w-6xl mx-auto px-6 mb-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
                    <div className="flex flex-col md:flex-row md:items-center gap-8 flex-1">
                        <h2 className="text-5xl font-black tracking-tighter uppercase whitespace-nowrap">Certificados</h2>
                        <div className="relative w-full max-w-md">
                            <input
                                type="text"
                                placeholder="Filtrar por nome..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white border border-slate-200 px-6 py-3 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all font-medium text-slate-700 italic"
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => scrollManual("left")} className="w-14 h-14 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm z-10 font-bold">❮</button>
                        <button onClick={() => scrollManual("right")} className="w-14 h-14 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm z-10 font-bold">❯</button>
                    </div>
                </div>

                {/* FILTROS POR CATEGORIA (TAGS CLICÁVEIS) */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {tagsDisponiveis.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${selectedTag === tag
                                    ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200"
                                    : "bg-slate-50 text-slate-400 border-slate-100 hover:border-blue-300"
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative w-full">
                <div ref={scrollRef} className="flex overflow-x-auto scrollbar-hide py-6 px-10 gap-10 snap-x snap-mandatory scroll-smooth min-h-[450px]">
                    <AnimatePresence mode="popLayout">
                        {certificadosFiltrados.length > 0 ? (
                            certificadosFiltrados.map((cert, index) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    key={cert.id}
                                    className="w-[380px] flex-shrink-0 snap-center cursor-pointer"
                                    onClick={() => onSelect(cert)}
                                >
                                    <div className="bg-slate-50 rounded-[40px] overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                                        <img src={cert.img} alt={cert.titulo} className="w-full h-56 object-cover" />
                                        <div className="p-8 flex flex-col flex-1">
                                            <div className="text-center font-black text-slate-800 text-sm uppercase mb-4 flex-1">
                                                {cert.titulo}
                                            </div>
                                            {/* EXIBIÇÃO DAS TAGS NO CARD */}
                                            <div className="flex flex-wrap justify-center gap-1.5">
                                                {cert.tags?.map((t: string) => (
                                                    <span key={t} className="px-2.5 py-0.5 bg-white border border-slate-200 text-slate-400 text-[9px] font-bold rounded-md uppercase tracking-tighter">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="w-full text-center py-20 text-slate-300 font-bold uppercase tracking-widest">Nenhum resultado encontrado</div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}