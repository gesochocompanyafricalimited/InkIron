import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wrench, 
  ChevronRight, 
  MessageSquare, 
  Send, 
  Info, 
  Settings, 
  Layers, 
  Zap,
  ArrowRight,
  Bike,
  CheckCircle2,
  X,
  Instagram
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { VEHICLE_STYLES, PART_OPTIONS, type VehicleStyle, type StyleInfo } from './types';
import { getMotoAdvice } from './services/motoAdvice';

// --- Components ---

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
          <Wrench className="w-5 h-5 text-black" />
        </div>
        <span className="font-bold text-xl tracking-tighter uppercase italic">Iron & Ink</span>
      </div>
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
        <a href="#styles" className="hover:text-white transition-colors">Styles</a>
        <a href="#configurator" className="hover:text-white transition-colors">Configurator</a>
        <a href="#assistant" className="hover:text-white transition-colors">AI Assistant</a>
        <a 
          href="https://www.instagram.com/machinerykq/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-orange-500 transition-colors"
        >
          <Instagram className="w-4 h-4" />
          <span>Contact</span>
        </a>
      </nav>
      <Button variant="outline" className="border-orange-500/50 text-orange-500 hover:bg-orange-500 hover:text-black">
        Start Build
      </Button>
    </div>
  </header>
);

const Hero = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
    <div className="absolute inset-0 z-0">
<img 
            src="/images/Scrambler.jpg" 
            alt="Custom Motorcycle" 
            className="w-full h-full object-cover opacity-40"
          />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
    </div>
    
    <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Badge className="mb-4 bg-orange-500 text-black hover:bg-orange-600 px-4 py-1">Premium Customization</Badge>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic mb-6 leading-none">
          Forge Your <span className="text-orange-500">Legacy</span>
        </h1>
        <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
          The ultimate platform for designing, exploring, and building world-class custom motorcycles. From the streets of London to the dirt tracks of California.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-orange-500 text-black hover:bg-orange-600 px-8 h-14 text-lg font-bold uppercase italic">
            Explore Styles <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 px-8 h-14 text-lg font-bold uppercase italic">
            View Gallery
          </Button>
        </div>
      </motion.div>
    </div>

    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
      <div className="w-1 h-12 rounded-full bg-gradient-to-b from-orange-500 to-transparent" />
    </div>
  </section>
);

const StyleExplorer = ({ activeStyle, setActiveStyle }: { activeStyle: VehicleStyle, setActiveStyle: (s: VehicleStyle) => void }) => {
  const style = VEHICLE_STYLES.find(s => s.id === activeStyle)!;

  return (
    <section id="styles" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-2">Style Explorer</h2>
            <p className="text-zinc-500">Choose the foundation of your custom build.</p>
          </div>
          <Tabs value={activeStyle} onValueChange={(v) => setActiveStyle(v as VehicleStyle)} className="w-full md:w-auto">
            <TabsList className="bg-zinc-900 border border-white/5 p-1">
              {VEHICLE_STYLES.map(s => (
                <TabsTrigger 
                  key={s.id} 
                  value={s.id}
                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-black uppercase font-bold text-xs tracking-widest px-6"
                >
                  {s.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            key={activeStyle + '-img'}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group"
          >
            <img 
              src={style.image} 
              alt={style.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 mb-2">Featured Build</Badge>
              <h3 className="text-2xl font-bold uppercase italic">{style.name} Concept</h3>
            </div>
          </motion.div>

          <motion.div
            key={activeStyle + '-content'}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold mb-4 text-orange-500">{style.name}</h3>
              <p className="text-xl text-zinc-400 leading-relaxed">
                {style.description}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Key Characteristics</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {style.keyFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 bg-zinc-900/50 p-4 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-5 h-5 text-orange-500" />
                    <span className="text-zinc-300 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/5">
              <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Technical Specifications</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                <div className="group/spec">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-600 block mb-1 group-hover/spec:text-orange-500 transition-colors">Engine Type</span>
                  <span className="text-sm text-zinc-300 font-mono">{style.specs.engineType}</span>
                </div>
                <div className="group/spec">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-600 block mb-1 group-hover/spec:text-orange-500 transition-colors">Suspension</span>
                  <span className="text-sm text-zinc-300 font-mono">{style.specs.suspension}</span>
                </div>
                <div className="group/spec">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-600 block mb-1 group-hover/spec:text-orange-500 transition-colors">Clutch</span>
                  <span className="text-sm text-zinc-300 font-mono">{style.specs.clutch}</span>
                </div>
                <div className="group/spec">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-600 block mb-1 group-hover/spec:text-orange-500 transition-colors">Exhaust</span>
                  <span className="text-sm text-zinc-300 font-mono">{style.specs.exhaust}</span>
                </div>
                <div className="group/spec">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-600 block mb-1 group-hover/spec:text-orange-500 transition-colors">Controls</span>
                  <span className="text-sm text-zinc-300 font-mono">{style.specs.controls}</span>
                </div>
                <div className="group/spec">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-600 block mb-1 group-hover/spec:text-orange-500 transition-colors">Corrosion Resistance</span>
                  <span className="text-sm text-zinc-300 font-mono">{style.specs.corrosionResistance}</span>
                </div>
                <div className="group/spec">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-600 block mb-1 group-hover/spec:text-orange-500 transition-colors">Radiator</span>
                  <span className="text-sm text-zinc-300 font-mono">{style.specs.radiator}</span>
                </div>
              </div>
            </div>

            <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 font-bold uppercase italic">
              Start {style.name} Project
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Configurator = ({ activeStyle }: { activeStyle: VehicleStyle }) => {
  const [selections, setSelections] = useState<Record<string, string>>({
    tank: 't-1',
    seat: 's-1',
    exhaust: 'e-1',
    tires: 'tr-1',
    hull: 'h-1',
    impeller: 'i-1',
    canopy: 'c-1',
    chassis: 'ch-1'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  const categories = activeStyle === 'jetski' 
    ? ['hull', 'impeller', 'seat', 'exhaust'] 
    : activeStyle === 'tuktuk'
    ? ['chassis', 'canopy', 'seat', 'exhaust']
    : ['tank', 'seat', 'exhaust', 'tires'];

  const handleGenerateImage = async () => {
    setIsGenerating(true);
    setGeneratedImageUrl(null);
    
    const localImages: Record<VehicleStyle, string> = {
      'cafe-racer': '/images/Cafe Racer.jpg',
      'bobber': '/images/Bobber.png',
      'scrambler': '/images/Scrambler.jpg',
      'jetski': '/images/Custom Jetski.jpg',
      'tuktuk': '/images/Custom Tuktuk.jpg'
    };

    await new Promise(resolve => setTimeout(resolve, 500));
    setGeneratedImageUrl(localImages[activeStyle]);
    setIsGenerating(false);
  };

  const getVehicleIcon = () => {
    switch(activeStyle) {
      case 'jetski': return <Bike className="w-64 h-64 text-white/5 rotate-12" />; // Use bike as placeholder with rotation or find better
      case 'tuktuk': return <Bike className="w-64 h-64 text-white/5 scale-x-125" />;
      default: return <Bike className="w-64 h-64 text-white/5" />;
    }
  };

  return (
    <section id="configurator" className="py-24 bg-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4">Build Configurator</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">Select your components and visualize the transformation. Every choice defines the ride.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Visual Preview */}
          <div className="lg:col-span-2 bg-zinc-950 rounded-3xl border border-white/10 p-8 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden group">
            {/* Blueprint Grid */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
              style={{ backgroundImage: 'linear-gradient(#ffffff0a 1px, transparent 1px), linear-gradient(90deg, #ffffff0a 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
            />
            
            {/* Background Glow */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-orange-500/10 blur-[100px] rounded-full" />
            </div>

            {/* Generated Image or Placeholder */}
            <AnimatePresence mode="wait">
              {generatedImageUrl ? (
                <motion.div 
                  key="generated"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="relative z-10 w-full h-full flex items-center justify-center"
                >
                  <img 
                    src={generatedImageUrl} 
                    alt="Build visualization" 
                    className="max-h-[400px] rounded-2xl shadow-2xl border border-white/10"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-orange-500 text-black font-bold">AI RENDER</Badge>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="placeholder"
                  className="relative z-10 w-full max-w-lg aspect-video flex flex-col items-center justify-center"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Scanning Line */}
                  {(isGenerating || !generatedImageUrl) && (
                    <motion.div 
                      className="absolute top-0 bottom-0 w-px bg-orange-500/40 z-20 shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                      animate={{ left: ['0%', '100%', '0%'] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}

                  <div className="relative">
                    {getVehicleIcon()}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Bike className="w-64 h-64 text-orange-500/10" strokeWidth={1} />
                    </motion.div>
                  </div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <div className="bg-black/60 backdrop-blur-md border border-orange-500/20 px-6 py-3 rounded-full mb-4 shadow-xl">
                      <span className="text-orange-500 font-mono text-[11px] uppercase tracking-[0.4em] animate-pulse">
                        {isGenerating ? "Synthesizing Render..." : "System Standby: Awaiting Input"}
                      </span>
                    </div>
                    {!isGenerating && (
                      <div className="text-zinc-500 text-[10px] uppercase tracking-widest mt-2">
                        Select parts and click Render below
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 w-full relative z-20">
              {categories.map(cat => (
                <div key={cat} className="bg-zinc-900/80 backdrop-blur-sm p-4 rounded-xl border border-white/10 text-center hover:border-orange-500/50 transition-colors group/item">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1 group-hover/item:text-orange-400 transition-colors">{cat}</span>
                  <span className="text-sm font-bold text-zinc-200 truncate block">
                    {PART_OPTIONS.find(p => p.id === selections[cat])?.name || 'Standard'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-8">
                {categories.map(cat => (
                  <div key={cat} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-orange-500" />
                      <h4 className="text-sm font-bold uppercase tracking-widest">{cat} Options</h4>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {PART_OPTIONS.filter(p => p.category === cat).map(option => (
                        <button
                          key={option.id}
                          onClick={() => {
                            setSelections(prev => ({ ...prev, [cat]: option.id }));
                          }}
                          className={`text-left p-4 rounded-xl border transition-all ${
                            selections[cat] === option.id 
                              ? 'bg-orange-500/10 border-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.1)]' 
                              : 'bg-zinc-900 border-white/5 text-zinc-400 hover:border-white/20'
                          }`}
                        >
                          <div className="font-bold mb-1">{option.name}</div>
                          <div className="text-xs opacity-60">{option.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="flex flex-col gap-3">
              <Button 
                onClick={handleGenerateImage} 
                disabled={isGenerating}
                className="w-full bg-white text-black hover:bg-zinc-200 h-14 font-bold uppercase italic shadow-xl disabled:opacity-50"
              >
                {isGenerating ? "Processing..." : "Generate AI Visual"}
              </Button>
              <Button className="w-full bg-orange-500 text-black hover:bg-orange-600 h-14 font-bold uppercase italic">
                Finalize Build
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AIAssistant = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: "Welcome to the shop. I'm the Master Builder. What are we wrenching on today? Need help with a Cafe Racer, Bobber, Scrambler, Jetski, or a custom Tuktuk?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await getMotoAdvice(userMsg, messages);
      setMessages(prev => [...prev, { role: 'model', text: response || "The shop is a bit noisy right now. Try again?" }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Lost my wrench for a second. What was that?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="assistant" className="py-24 bg-zinc-950">
      <div className="max-w-4xl mx-auto px-6">
        <Card className="bg-zinc-900 border-white/10 overflow-hidden">
          <CardHeader className="bg-zinc-800/50 border-b border-white/5 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-black" />
              </div>
              <div>
                <CardTitle className="text-lg uppercase italic font-black">The Master Builder</CardTitle>
                <CardDescription className="text-orange-500/70 text-xs font-bold uppercase tracking-widest">AI Custom Consultant</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="border-orange-500/30 text-orange-500">Online</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px] p-6" ref={scrollRef}>
              <div className="space-y-6">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-4 rounded-2xl ${
                      m.role === 'user' 
                        ? 'bg-orange-500 text-black font-medium' 
                        : 'bg-zinc-800 text-zinc-300 border border-white/5'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-zinc-800 p-4 rounded-2xl border border-white/5 animate-pulse text-zinc-500 italic">
                      Master Builder is thinking...
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-4 bg-zinc-800/30 border-t border-white/5">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex w-full gap-2"
            >
              <Input 
                placeholder="Ask about parts, styles, or technical tips..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-zinc-950 border-white/10 focus:border-orange-500 transition-colors h-12"
              />
              <Button type="submit" size="icon" className="h-12 w-12 bg-orange-500 text-black hover:bg-orange-600">
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 bg-black border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex items-center gap-2">
        <Wrench className="w-5 h-5 text-orange-500" />
        <span className="font-bold tracking-tighter uppercase italic">Iron & Ink Custom</span>
      </div>
      <div className="text-zinc-500 text-sm">
        © 2024 Iron & Ink Custom. Built for the bold.
      </div>
      <div className="flex items-center gap-6">
        <a href="https://www.instagram.com/machinerykq/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-orange-500 transition-colors">
          <Instagram className="w-5 h-5" />
        </a>
        <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Settings className="w-5 h-5" /></a>
        <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Info className="w-5 h-5" /></a>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [activeStyle, setActiveStyle] = useState<VehicleStyle>('cafe-racer');

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-black">
      <Header />
      <main>
        <Hero />
        <StyleExplorer activeStyle={activeStyle} setActiveStyle={setActiveStyle} />
        <Configurator activeStyle={activeStyle} />
        <AIAssistant />
      </main>
      <Footer />
    </div>
  );
}
