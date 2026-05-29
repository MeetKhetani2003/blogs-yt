import Image from 'next/image';
import { Award, CodeXml, Briefcase, Play } from 'lucide-react';

export const metadata = {
    title: 'About | Technical Rahul Pandey',
    description: 'Demystifying Technology For The Modern Builder',
};

export default function About() {
    return (
        <div className="relative bg-slate-50 min-h-screen py-20 lg:py-24 px-6 lg:px-20 animate-fadeIn w-full flex-grow overflow-hidden">
            {/* Ambient background */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gold-400/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow"></div>
            <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-accent-red/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

            <div className="max-w-5xl mx-auto w-full space-y-24 relative z-10">

                <div className="text-center space-y-6 mt-10 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200/60 w-fit mx-auto shadow-sm">
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
                        </span>
                        <span className="text-[11px] font-bold text-slate-800 tracking-wider uppercase">Our Story</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                        Architecting The <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-amber-400 to-accent-red">Future of Engineering</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto">
                        We believe that understanding complex computer science shouldn't require a Ph.D. We break down the most sophisticated architectures into elegant, digestible, and actionable systems.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative w-full aspect-square lg:aspect-auto lg:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white rotate-1 hover:rotate-0 transition-transform duration-700">
                        <Image fill src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" alt="Team collaborating" className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                    </div>
                    
                    <div className="space-y-8 px-4 lg:px-8">
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                                <span className="w-8 h-1 bg-gold-500 rounded-full"></span> The Mission
                            </h3>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                Starting as a small initiative in 2018, Technical Rahul Pandey has grown into a premium digital platform trusted by over a million engineers globally. 
                            </p>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                Our core philosophy is to strip away unnecessary technical jargon, providing first-principles mental models that give developers the confidence to build world-class, highly scalable applications.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-200">
                            <div>
                                <h4 className="text-4xl font-black text-slate-900">1M+</h4>
                                <p className="text-xs uppercase tracking-widest font-bold text-gold-600 mt-1">Engineers</p>
                            </div>
                            <div>
                                <h4 className="text-4xl font-black text-slate-900">500+</h4>
                                <p className="text-xs uppercase tracking-widest font-bold text-gold-600 mt-1">Masterclasses</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mb-10 pt-10 border-t border-slate-200">
                    <h3 className="text-3xl font-bold text-slate-900 mb-12">The Editorial Standards</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        <div className="glass-card p-10 rounded-[2rem] border border-slate-100 text-left space-y-5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all bg-white group">
                            <div className="w-14 h-14 rounded-2xl bg-gold-50 text-gold-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-white transition-all">
                                <Award className="w-7 h-7" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900">Premium Fidelity</h4>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">Every tutorial is crafted with extreme attention to visual details, ensuring that the interface is as educational as the code.</p>
                        </div>
                        <div className="glass-card p-10 rounded-[2rem] border border-slate-100 text-left space-y-5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all bg-white group">
                            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-accent-red transition-all">
                                <CodeXml className="w-7 h-7" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900">Actionable Systems</h4>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">No fluff. Just real-world applicable architectural blueprints and code snippets that deploy instantly to production.</p>
                        </div>
                        <div className="glass-card p-10 rounded-[2rem] border border-slate-100 text-left space-y-5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all bg-white group">
                            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <Briefcase className="w-7 h-7" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900">Career Trajectory</h4>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">Designed explicitly to elevate your systems mindset, ace structural interviews, and propel your tech career forward.</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* YouTube Showcase Block */}
            <div className="max-w-7xl mx-auto w-full relative z-10 pt-20 border-t border-slate-200 mt-20">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
                    <div>
                        <p className="text-xs uppercase tracking-widest font-bold text-accent-red mb-2">The Visual Channel</p>
                        <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Technical Rahul on YouTube</h3>
                    </div>
                    <p className="text-sm text-slate-600 max-w-sm mt-3 md:mt-0 font-medium">
                        Join over 100k+ engineers discovering complex architectures simplified through high-end visual masterclasses.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 relative group rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-800">
                        <div className="aspect-video w-full h-full relative">
                            <Image
                                fill
                                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80"
                                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                                alt="PlaySquare featured preview"
                            />

                            <a href="https://youtube.com/@technicalrahulpandey88?si=3A9H5kv1jDVotrpy" target="_blank" rel="noreferrer" className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 rounded-full bg-white text-accent-red flex items-center justify-center shadow-[0_8px_32px_rgba(229,57,53,0.3)] scale-100 group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                                    <Play className="w-8 h-8 fill-accent-red translate-x-0.5" />
                                </div>
                            </a>

                            <div className="absolute bottom-4 left-6 right-6 flex items-center gap-3">
                                <span className="text-white text-xs font-bold">12:35</span>
                                <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                                    <div className="w-1/3 h-full bg-gold-500 rounded-full"></div>
                                </div>
                                <span className="text-white/80 text-[10px] font-bold">LIVE METRIC SIMULATION</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 space-y-6">
                        <div className="space-y-3">
                            <span className="text-xs font-bold text-accent-red flex items-center gap-1">
                                <Play className="w-4 h-4" /> OFFICIAL CHANNEL
                            </span>
                            <h4 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug tracking-tight">
                                Complete Local Large Language Model Deployment Framework
                            </h4>
                            <p className="text-sm text-slate-600 font-medium leading-relaxed">
                                Step-by-step visual roadmap breaking down parameters, local quant structures, setting up custom API inference endpoints, and running offline integrations.
                            </p>
                        </div>

                        <div className="space-y-3">
                            {[
                                { id: "v1", title: "Configuring AWQ Quantization inside Docker Containers", length: "14:20" },
                                { id: "v2", title: "Building next-generation UI with Container Query Hooks", length: "10:45" },
                                { id: "v3", title: "Mastering system optimization for high frame rates", length: "18:15" }
                            ].map(item => (
                                <a
                                    href="https://youtube.com/@technicalrahulpandey88?si=3A9H5kv1jDVotrpy"
                                    target="_blank"
                                    rel="noreferrer"
                                    key={item.id}
                                    className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/60 hover:border-gold-300 hover:bg-gold-50/30 cursor-pointer transition-all shadow-sm"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-accent-red border border-slate-100">
                                            <Play className="w-4 h-4" />
                                        </div>
                                        <span className="text-xs font-bold text-slate-900 max-w-xs truncate">{item.title}</span>
                                    </div>
                                    <span className="text-[10px] text-slate-500 font-bold tracking-wider">{item.length}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
