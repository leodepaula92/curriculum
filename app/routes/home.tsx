import type { Route } from "./+types/home";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// IMPORTAÇÕES DOS COMPONENTES
import { Typewriter } from "../components/Typewriter";
import { Formacao } from "../components/Formacao";
import { Certificados } from "../components/Certificados";
import { Experiencia } from "../components/Experiencia";
import { Skills } from "../components/Skills";

const calculateDateDiff = (startDate: string) => {
	const start = new Date(startDate);
	const today = new Date();
	let diff = today.getFullYear() - start.getFullYear();
	const m = today.getMonth() - start.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < start.getDate())) diff--;
	return diff;
};

// --- DADOS ---
const resumoProfissional = "Sou casado, pai de duas filhas e atuo com tecnologia desde 2009. Iniciei minha trajetória como estagiário na Escola Seduc, onde evoluí de instrutor de informática para um especialista adaptável às mudanças do mercado — acompanhando desde a transição do Excel XP para as versões atuais até a evolução do HTML para o HTML5 e o domínio do Pacote Adobe. Sou movido pelo aprendizado contínuo e pelo desafio de superar problemas complexos através da tecnologia.";

const hobbiesDetalhado = "Amo música, canto e toco diversos instrumentos, como violão, guitarra, bateria e teclado; recentemente, dediquei-me ao aprendizado do violino. Sou cristão, formado em Teologia e, entre 2021 e 2025, exerci a liderança de jovens e adolescentes, além de ter coordenado outros departamentos ministeriais em anos anteriores. Sou um leitor ávido, apreciando desde obras técnicas e históricas até ficções.";

const graduacoes = [
	{ universidade: "Ensino Médio", nivel: "Educação Básica", curso: "Completo", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0b/BRAZIL_school_icons.png" },
	{ universidade: "Unicesumar", nivel: "Técnico", curso: "Análise e Desenvolvimento de Sistemas", periodo: "2026 – 2027", logo: "https://logodownload.org/wp-content/uploads/2021/02/unicesumar-logo-3.png" },
	{ universidade: "Gran Faculdade", nivel: "Graduação", curso: "Análise e Desenvolvimento de Sistemas", periodo: "2026 – 2028", logo: "https://omni-cms-static-prd.infra.grancursosonline.com.br/wp-content/uploads/2024/06/logo-gran-footer.webp" }
];

const listaCertificados = [
	{ id: 1, titulo: "Engenharia de Software - FIAP", img: "img/certificados/Engenharia do Software.png", tags: ["devops", "engenharia"] },
	{ id: 2, titulo: "DevOps - FIAP", img: "img/certificados/Devops Fiap.png", tags: ["devops"] },
	{ id: 3, titulo: "SQL/MYSQL - UDEMY", img: "img/certificados/SQL.jpg", tags: ["banco de dados", "sql"] },
	{ id: 4, titulo: "Neuro Marketing - ACADEMIA NEUROMARKETING", img: "img/certificados/Neuro Marketing.png", tags: ["marketing"] },
	{ id: 5, titulo: "Praticas Devops VSC - MICROSOFT", img: "img/certificados/Praticas Devops VSC - Microsoft.png", tags: ["devops", "microsoft"] },
	{ id: 6, titulo: "Java - FIAP", img: "img/certificados/Java Fiap.png", tags: ["java", "back end"] },
	{ id: 7, titulo: "Introdução à Programação Orientada a Objetos (POO) - BRADESCO", img: "img/certificados/Introducao POO.png", tags: ["poo", "lógica"] },
	{ id: 8, titulo: "Java - ROCKETSEAT", img: "img/certificados/Java Rocketseat.png", tags: ["java"] },
	{ id: 9, titulo: "Marketing de Performace - FACEBOOK", img: "img/certificados/certificate marketing de performace.png", tags: ["marketing", "ads"] },
	{ id: 10, titulo: "Terminogia do Facebook - FACEBOOK", img: "img/certificados/certificate terminogia facebook.png", tags: ["marketing"] },
	{ id: 11, titulo: "Selo Devops - MICROSOFT", img: "img/certificados/Selo Devops Microsoft.png", tags: ["devops", "microsoft"] },
	{ id: 12, titulo: "Análise de Dados e Inteligência de Negócios - GRAN", img: "img/certificados/Analise de Dados - Gran.png", tags: ["dados", "bi"] },
	{ id: 13, titulo: "PHP Básico ao Avançado - UDEMY", img: "img/certificados/PHP Básico ao Avançado.jpg", tags: ["php", "back end"] },
	{ id: 14, titulo: "Docker - LINKEDIN", img: "img/certificados/Docker 1.jpg", tags: ["docker", "devops"] },
	{ id: 15, titulo: "Fundamentos de Kubernetes - LINKEDIN", img: "img/certificados/Fundamentos de Kubernetes.jpg", tags: ["kubernetes", "devops"] },
	{ id: 16, titulo: "IA Computacional - FIAP", img: "img/certificados/IA Computacional.png", tags: ["ia", "dados"] },
	{ id: 17, titulo: "Práticas Ágeis - ROCKETSEAT", img: "img/certificados/Praticas Ageis - Rocketseat.png", tags: ["agile"] },
	{ id: 18, titulo: "JSON com C# - MICROSOFT", img: "img/certificados/JSON - Microsoft.png", tags: ["c#", "back end"] },
];

const listaExperiencias = [
	{
		empresa: "Guimepa Suprimentos", periodo: "2021 – Atualmente", cargo: "ASSISTENTE DE TI SÊNIOR / DESENVOLVEDOR FULL STACK JR",
		resumo: "Gestão tecnológica total, integração de APIs e desenvolvimento de BI.",
		descricao: "Na empresa, cuido de toda a parte tecnológica, desde hardware até software. Faço a integração de APIs dos fornecedores no sistema e já integrei Vonder, Toyama, Wap, Belfix, Bovenau, CSM, entre outros. Também sou responsável por personalizar o sistema, fazer melhorias, adicionar funções, botões, colunas, filtros... Cuido do site de vendas usando Magento e, recentemente, criei o novo site deltatopferramentas.com.br. Além disso, faço o desenvolvimento e a análise de BI com a ferramenta PowerBI, criando dashboards conforme a necessidade dos setores. Quando é necessário, também auxilio na parte gráfica, criando artes para posts no Instagram, Facebook, LinkedIn, e com anúncios no Google Ads."
	},
	{
		empresa: "Centro Educacional (Facin)", periodo: "2018 – 2020", cargo: "Analista de TI / Educador",
		resumo: "Docência técnica multidisciplinar e desenvolvimento de plataforma EAD.",
		descricao: "Era responsável por preparar e ministrar aulas de Informática básica e avançada, Desenvolvimento WEB e Gráfico, Criação de jogos, Marketing Digital (Google ADS, Meta Ads), edição de Vídeos. Também era responsável pela manutenção dos computadores e rede da escola. No período da pandemia desenvolvi uma plataforma EAD para o curso de Pós Graduação na área de medicina deles."
	},
	{
		empresa: "Mega Byte", periodo: "2013 – 2017", cargo: "Professor/Coordenador",
		resumo: "Coordenação pedagógica, manutenção de infraestrutura e captação de alunos.",
		descricao: "Era responsável por preparar e ministrar aulas de Informática básica e avançada, Desenvolvimento WEB e Gráfico, Criação de jogos, Marketing Digital (Google ADS, Meta Ads), edição de Vídeos, Administração e gestão, Ministrava palestras. Também era responsável pela manutenção dos computadores e rede da escola, Também fazia campanha e captação de alunos."
	},
	{
		empresa: "IRON MOUNTAIN", periodo: "2011 – 2013", cargo: "Analista de Arquivos",
		resumo: "Recepção e digitalização de documentos bancários e gestão de sistemas.",
		descricao: "Fazia recepção e digitalização de documentos bancários, fazia planilhas de controle e atualização nos sistema interno da empresa."
	}
];

const listaSkills = [
	{ categoria: "Desenvolvedor & dev", itens: ["PHP", "JAVASCRIPT", "MYSQL", "ASP", "C#", "C++", "JAVA", "VBA", "JSON", "GIT", "GITHUB", "DOCKER", "SQL", "DEVOPS"] },
	{ categoria: "Web designer & gráfico", itens: ["HTML5", "CSS", "WORDPRESS", "MOODLE", "MAGENTO", "PHOTOSHOP", "ILLUSTRATOR", "CANVA", "CORELDRAW"] },
	{ categoria: "Dados, bi & ia", itens: ["POWER BI", "ANALISTA DE DADOS", "IA COMPUTACIONAL", "GEMINI", "CHATGPT", "DEEPSEEK", "CLAUDE", "EXCEL AVANÇADO", "ACCESS"] },
	{ categoria: "Ads & marketing", itens: ["GOOGLE ADS", "META ADS", "MARKETING DIGITAL", "NEUROCIÊNCIA", "PNL"] },
	{ categoria: "Edição & infraestrutura", itens: ["SONY VEGAS", "PREMIERE", "CAPCUT", "FILMORA", "HARDWARE", "REDES", "WINDOWS", "WORD", "TRELLO"] }
];

export default function Home() {
	const idade = calculateDateDiff("1992-07-30");
	const anosExp = calculateDateDiff("2009-01-01");

	const [selectedCert, setSelectedCert] = useState<any>(null);
	const [selectedExp, setSelectedExp] = useState<any>(null);
	const [showAboutModal, setShowAboutModal] = useState(false);

	return (
		<main className="min-h-screen bg-slate-50 font-sans text-gray-900 overflow-x-hidden scroll-smooth relative">

			{/* WHATSAPP FLUTUANTE */}
			<a href="https://wa.me/5541997390107" target="_blank" className="fixed bottom-8 right-8 z-[90] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform border-4 border-white flex items-center justify-center">
				<svg className="w-8 h-8 fill-current" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.6-2.8-23.6-8.7-45-27.7-16.6-14.8-27.8-33.1-31.1-38.6-3.2-5.6-.3-8.6 2.5-11.4 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.2 3.7-5.5 5.6-9.2 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg>
			</a>

			{/* NAV COM ÍCONES RESTAURADOS */}
			<nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 py-4 px-8 flex justify-between items-center uppercase font-black text-[10px] tracking-[0.2em]">
				<span className="text-blue-600 text-2xl tracking-tighter uppercase font-bold">DEV FULL STACK</span>
				<ul className="flex gap-8 items-center text-slate-400">
					<li><a href="#sobre" className="hover:text-blue-600 transition-colors">Sobre</a></li>
					<li><a href="#formacao">Formação</a></li>
					<li><a href="#certificados">Certificados</a></li>
					<li><a href="#experiencia">Experiência</a></li>
					<li><a href="#skills">Skills</a></li>
					<li className="h-4 w-[1px] bg-slate-200 mx-2"></li>
					<li className="flex gap-5 items-center lowercase tracking-normal font-bold">
						<a href="https://github.com/leodepaula92" target="_blank" className="hover:text-blue-600 flex items-center gap-1">
							<svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>github</a>
						<a href="https://linkedin.com/in/leopsilva" target="_blank" className="hover:text-blue-600 flex items-center gap-1">
							<svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>linkedin</a>
					</li>
				</ul>
			</nav>

			{/* HERO */}
			<section id="sobre" className="pt-48 pb-24 px-6 max-w-6xl mx-auto md:text-left text-center">
				<div className="flex flex-col md:flex-row gap-16 items-center">
					<motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative w-64 h-64 rounded-full border-[12px] border-white shadow-2xl overflow-hidden flex-shrink-0">
						<img src="img/perfil/foto-perfil.jpg" alt="Perfil" className="w-full h-full object-cover scale-110" />
						<div className="absolute bottom-6 right-6 bg-green-500 w-10 h-10 rounded-full border-8 border-white animate-pulse"></div>
					</motion.div>
					<div className="flex-1 overflow-hidden">
						<h1 className="text-2xl lg:text-4xl font-black tracking-tighter leading-none mb-6 uppercase whitespace-nowrap text-slate-900">Leonardo de Paula</h1>
						<p className="text-3xl text-blue-600 font-bold min-h-[40px] mb-8 tracking-tight italic uppercase"><Typewriter texts={["Full Stack Developer", "BI Specialist", "Curitiba/PR", `${idade} Anos`]} /></p>
						<p className="text-slate-400 text-xl font-medium leading-relaxed max-w-2xl text-justify mb-8">Atuo com tecnologia desde 2009. Especialista em resolver problemas complexos através do código com foco em Full Stack e BI.</p>
						<button onClick={() => setShowAboutModal(true)} className="bg-blue-600 text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-700 transition-all hover:scale-105 shadow-xl shadow-blue-600/20">Ver mais sobre mim</button>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 text-center">
					{[{ v: "+100", t: "Projetos" }, { v: `${anosExp} ANOS`, t: "Experiência" }, { v: "+50", t: "Certificações" }].map((stat, i) => (
						<motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className="bg-white p-12 rounded-[48px] shadow-sm border border-slate-100 hover:shadow-xl transition-all">
							<span className="block text-5xl font-black text-blue-600 mb-2 uppercase">{stat.v}</span>
							<span className="text-slate-400 font-bold uppercase text-xs tracking-widest">{stat.t}</span>
						</motion.div>
					))}
				</div>
			</section>

			<Formacao graduacoes={graduacoes} />

			{/* SEÇÃO ÚNICA DE CERTIFICADOS COM FILTROS INTEGRADOS */}
			<Certificados certificados={listaCertificados} onSelect={setSelectedCert} />

			<Experiencia experiencias={listaExperiencias} onSelect={setSelectedExp} />

			<Skills skills={listaSkills} />

			{/* SEÇÃO POWER BI ADAPTADA (SUAVE E SEM BORDAS) */}
			<section id="projetos-bi" className="py-24 bg-slate-50 px-6">
				<div className="max-w-7xl mx-auto">
					<motion.h2 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-5xl font-black mb-16 flex items-center gap-6 text-slate-800 uppercase tracking-tighter">
						<span className="w-16 h-2 bg-blue-600 rounded-full"></span>Projetos Power BI
					</motion.h2>

					<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative w-full overflow-hidden shadow-xl" style={{ aspectRatio: '16 / 9' }}>
						<iframe
							title="Projetos Power BI"
							className="absolute top-0 left-0 w-full h-full border-0"
							src="https://app.powerbi.com/view?r=eyJrIjoiNTJiZjUwMmYtNzg3ZS00ZWQ5LWE1MmUtODgyNmZlNGYwMmIwIiwidCI6ImI3Yzk2N2UyLWU2NDEtNDU0My05ZDUyLTNiMjFlMmJkNjA2NSJ9"
							allowFullScreen={true}
							loading="lazy"
						></iframe>
					</motion.div>
				</div>
			</section>

			{/* MODAIS (CERTIFICADOS, CARREIRA E SOBRE) */}
			<AnimatePresence>
				{showAboutModal && (
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAboutModal(false)} className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-6 cursor-zoom-out">
						<motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-[56px] p-10 md:p-16 max-w-3xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
							<button onClick={() => setShowAboutModal(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors text-2xl">✕</button>
							<span className="text-blue-600 font-black text-xs uppercase tracking-[0.2em] mb-4 block">Minha História</span>
							<h3 className="text-4xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Sobre Leonardo de Paula</h3>
							<div className="space-y-8">
								<div><h4 className="font-black text-blue-600 uppercase text-xs mb-3 tracking-widest">Resumo Profissional</h4><p className="text-slate-600 text-lg leading-relaxed text-justify">{resumoProfissional}</p></div>
								<div className="h-[1px] bg-slate-100 w-full"></div>
								<div><h4 className="font-black text-blue-600 uppercase text-xs mb-3 tracking-widest">Vida Pessoal & Hobbies</h4><p className="text-slate-600 text-lg leading-relaxed text-justify">{hobbiesDetalhado}</p></div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{selectedCert && (
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedCert(null)} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out">
						<motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} onClick={(e) => e.stopPropagation()} className="relative max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl">
							<button onClick={() => setSelectedCert(null)} className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/10 rounded-full flex items-center justify-center text-black font-bold">✕</button>
							<img src={selectedCert.img} alt={selectedCert.titulo} className="w-full h-auto max-h-[80vh] object-contain" />
							<div className="p-6 bg-white text-center font-black uppercase tracking-widest">{selectedCert.titulo}</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{selectedExp && (
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedExp(null)} className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-6 cursor-zoom-out">
						<motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-[56px] p-12 max-w-2xl w-full shadow-2xl relative">
							<button onClick={() => setSelectedExp(null)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors text-2xl">✕</button>
							<span className="text-blue-600 font-black text-xs uppercase tracking-[0.2em] mb-4 block">Histórico Profissional</span>
							<h3 className="text-4xl font-black text-slate-900 mb-2 uppercase">{selectedExp.empresa}</h3>
							<p className="text-xl font-bold text-slate-400 mb-8 uppercase">{selectedExp.cargo} • {selectedExp.periodo}</p>
							<div className="h-[1px] bg-slate-100 w-full mb-8"></div>
							<p className="text-slate-600 text-lg leading-relaxed text-justify whitespace-pre-line">{selectedExp.descricao}</p>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			<footer className="py-20 bg-white text-center text-slate-300 font-black text-[10px] uppercase tracking-[0.8em]">© {new Date().getFullYear()} Leonardo de Paula Silva</footer>
		</main>
	);
}