// app/components/sections/AboutMe.tsx
import { calculateDateDiff } from "~/utils/helpers";

export default function AboutMe() {
    const idade = calculateDateDiff("1992-07-30");
    const anosExp = calculateDateDiff("2009-01-01");

    return (
        <section className="py-12 px-6 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-48 h-48 bg-gray-200 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
                    <img src="/caminho-da-sua-foto.jpg" alt="Leonardo de Paula" className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-4xl font-bold text-gray-800">Leonardo de Paula da Silva</h1>
                    <p className="text-blue-600 font-medium">Brasileiro – Curitiba/PR • {idade} anos</p>
                    <p className="mt-4 text-gray-600 leading-relaxed">
                        Casado, pai de duas filhas e entusiasta de tecnologia desde 2009.
                        Evoluí do HTML básico ao ecossistema moderno, sempre focado em superar desafios diários.
                    </p>
                </div>
            </div>

            {/* Contadores Automáticos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
                    <span className="block text-3xl font-bold text-blue-600">+1.000</span>
                    <span className="text-gray-500">Projetos</span>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
                    <span className="block text-3xl font-bold text-blue-600">{anosExp} Anos</span>
                    <span className="text-gray-500">de Experiência</span>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
                    <span className="block text-3xl font-bold text-blue-600">+50</span>
                    <span className="text-gray-500">Certificações</span>
                </div>
            </div>
        </section>
    );
}