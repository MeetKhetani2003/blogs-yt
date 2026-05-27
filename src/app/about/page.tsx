import Image from 'next/image';
import { Award, CodeXml, Briefcase } from 'lucide-react';

export const metadata = {
    title: 'About | Technical Rahul Pandey',
    description: 'Demystifying Technology For The Modern Builder',
};

export default function About() {
    return (
        <div className="bg-slate-50 min-h-[90vh] py-16 px-6 lg:px-20 animate-fadeIn w-full flex-grow">
            <div className="max-w-4xl mx-auto w-full space-y-16">

                <div className="text-center space-y-6">
                    <span className="bg-gold-50 text-gold-600 border border-gold-400/20 text-xs uppercase font-bold tracking-wider px-3 py-1.5 rounded-full">
                        The Story
                    </span>
                    <h1 className="text-2xl sm:text-6xl font-bold text-textPrimary tracking-tight">
                        Demystifying Technology <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-accent-red">For The Modern Builder</span>
                    </h1>
                    <p className="text-base sm:text-lg text-textSecondary font-normal leading-relaxed max-w-2xl mx-auto">
                        We believe that understanding complex computer science shouldn't require a Ph.D. We break down the most sophisticated architectures into elegant, digestible, and actionable components.
                    </p>
                </div>

                <div className="glass-card rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                    <div className="relative w-full h-80">
                        <Image fill src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" alt="Team collaborating" className="object-cover" />
                    </div>
                    <div className="p-8 sm:p-12 space-y-6 bg-white relative z-10">
                        <h3 className="text-xl sm:text-2xl font-bold text-textPrimary">Our Mission</h3>
                        <p className="text-textSecondary leading-relaxed font-normal">
                            Starting as a small initiative in 2018, Technical Rahul Pandey has grown into a premium digital platform trusted by over a million engineers. Our mission is simple: strip away the technical jargon, provide first-principles mental models, and give developers the confidence to build world-class applications.
                        </p>
                        <p className="text-textSecondary leading-relaxed font-normal">
                            From local large language model deployments to fluid container query designs, our masterclasses are meticulously structured to save you hundreds of hours of research and debugging.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="glass-card p-8 rounded-3xl border border-slate-100 text-center space-y-4 shadow-sm hover:shadow-md transition-all bg-white">
                        <div className="w-12 h-12 mx-auto rounded-full bg-gold-50 text-gold-600 flex items-center justify-center">
                            <Award className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-textPrimary">Premium Quality</h4>
                        <p className="text-xs text-textSecondary font-normal leading-relaxed">Every tutorial is crafted with extreme attention to visual and technical detail.</p>
                    </div>
                    <div className="glass-card p-8 rounded-3xl border border-slate-100 text-center space-y-4 shadow-sm hover:shadow-md transition-all bg-white">
                        <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                            <CodeXml className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-textPrimary">Actionable Code</h4>
                        <p className="text-xs text-textSecondary font-normal leading-relaxed">No fluff. Just real-world applicable code snippets that work instantly.</p>
                    </div>
                    <div className="glass-card p-8 rounded-3xl border border-slate-100 text-center space-y-4 shadow-sm hover:shadow-md transition-all bg-white">
                        <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                            <Briefcase className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-textPrimary">Career Growth</h4>
                        <p className="text-xs text-textSecondary font-normal leading-relaxed">Designed to elevate your architectural mindset and propel your tech career.</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
