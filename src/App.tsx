import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavTab } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProgramsSection } from './components/ProgramsSection';
import { ProjectsExplorer } from './components/ProjectsExplorer';
import { GallerySection } from './components/GallerySection';
import { NewsSection } from './components/NewsSection';
import { TeamSection } from './components/TeamSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DonateModal } from './components/DonateModal';
import { SearchModal } from './components/SearchModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isDonateOpen, setIsDonateOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-600 selection:text-white antialiased">
      
      {/* Sticky Header Navigation in Green & White */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDonate={() => setIsDonateOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area with Page Transition Animation */}
      <main className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === 'home' && (
              <>
                <HeroSection
                  setActiveTab={setActiveTab}
                  onOpenDonate={() => setIsDonateOpen(true)}
                />
                <AboutSection />
                <ProgramsSection />
                <ProjectsExplorer />
                <GallerySection />
                <NewsSection />
                <TeamSection />
                <ContactSection />
              </>
            )}

            {activeTab === 'about' && (
              <div className="pt-2">
                <AboutSection />
                <TeamSection />
              </div>
            )}

            {activeTab === 'programs' && (
              <div className="pt-2">
                <ProgramsSection />
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="pt-2">
                <ProjectsExplorer />
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="pt-2">
                <GallerySection />
              </div>
            )}

            {activeTab === 'news' && (
              <div className="pt-2">
                <NewsSection />
              </div>
            )}

            {activeTab === 'team' && (
              <div className="pt-2">
                <TeamSection />
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="pt-2">
                <ContactSection />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer in Green and White */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenDonate={() => setIsDonateOpen(true)}
      />

      {/* Modals */}
      <DonateModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        setActiveTab={setActiveTab}
      />

    </div>
  );
}
