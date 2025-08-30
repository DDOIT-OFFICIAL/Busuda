import { useEffect, useRef, useState } from "react";
import { useFullPageScroll } from "@/hooks/useFullPageScroll";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import NetworkSection from "@/components/sections/NetworkSection";
import CalculatorSection from "@/components/sections/CalculatorSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/sections/Footer";

const Index = () => {
  const sections = [
    { id: 'hero', component: HeroSection, name: '홈' },
    { id: 'problem', component: ProblemSection, name: '문제점' },
    { id: 'benefits', component: BenefitsSection, name: '혜택' },
    { id: 'process', component: ProcessSection, name: '진행과정' },
    { id: 'network', component: NetworkSection, name: '네트워크' },
    { id: 'calculator', component: CalculatorSection, name: '계산기' },
    { id: 'testimonial', component: TestimonialSection, name: '후기' },
    { id: 'faq', component: FAQSection, name: 'FAQ' }
  ];

  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [processScrollEnabled, setProcessScrollEnabled] = useState(false);
  const [faqScrolled, setFaqScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionIndex: number) => {
    if (sectionIndex < 0 || sectionIndex >= sections.length || isScrolling) return;
    
    console.log('🎯 Scrolling to section:', sectionIndex);
    setIsScrolling(true);
    setCurrentSection(sectionIndex);
    
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  useEffect(() => {
    console.log('🏠 Index component mounted');
    
    const handleWheel = (e: WheelEvent) => {
      // ProcessSection에서 내부 스크롤을 처리 중이면 전체 섹션 스크롤 비활성화
      const processIndex = sections.findIndex(s => s.id === 'process');
      if (currentSection === processIndex && processScrollEnabled) {
        return; // ProcessSection이 자체적으로 스크롤을 처리하도록 함
      }

      e.preventDefault();
      e.stopPropagation();
      
      console.log('🎯 Wheel event detected:', {
        deltaY: e.deltaY,
        currentSection,
        isScrolling
      });
      
      if (isScrolling) {
        console.log('⏳ Currently scrolling, ignoring event');
        return;
      }

      const { deltaY } = e;
      
      if (Math.abs(deltaY) > 10) {
        if (deltaY > 0 && currentSection < sections.length - 1) {
          console.log('⬇️ Scrolling down to section:', currentSection + 1);
          scrollToSection(currentSection + 1);
        } else if (deltaY > 0 && currentSection === sections.length - 1 && !faqScrolled) {
          // FAQ 섹션에서 아래로 스크롤 시 Footer 표시
          setFaqScrolled(true);
        } else if (deltaY < 0 && currentSection > 0 && !faqScrolled) {
          console.log('⬆️ Scrolling up to section:', currentSection - 1);
          scrollToSection(currentSection - 1);
        } else if (deltaY < 0 && faqScrolled) {
          // FAQ가 스크롤된 상태에서 위로 스크롤 시 원래 위치로
          setFaqScrolled(false);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          if (currentSection < sections.length - 1) {
            scrollToSection(currentSection + 1);
          } else if (currentSection === sections.length - 1 && !faqScrolled) {
            setFaqScrolled(true);
          }
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          if (faqScrolled) {
            setFaqScrolled(false);
          } else if (currentSection > 0) {
            scrollToSection(currentSection - 1);
          }
          break;
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    
    // body overflow 설정
    document.body.style.overflow = 'hidden';

    console.log('✅ Event listeners registered');

    return () => {
      console.log('🧹 Cleaning up event listeners');
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [currentSection, isScrolling, processScrollEnabled]);

  useEffect(() => {
    console.log('📍 Current section changed to:', currentSection);
    // ProcessSection인지 확인하여 상태 업데이트
    const processIndex = sections.findIndex(s => s.id === 'process');
    setProcessScrollEnabled(currentSection === processIndex);
    
    // FAQ 섹션이 아닌 다른 섹션으로 이동 시 FAQ 스크롤 상태 리셋
    if (currentSection !== sections.length - 1) {
      setFaqScrolled(false);
    }
  }, [currentSection]);

  // ProcessSection에서 섹션 네비게이션 핸들러
  const handleProcessNavigation = (direction: 'prev' | 'next') => {
    const processIndex = sections.findIndex(s => s.id === 'process');
    if (direction === 'prev' && processIndex > 0) {
      scrollToSection(processIndex - 1);
    } else if (direction === 'next' && processIndex < sections.length - 1) {
      scrollToSection(processIndex + 1);
    }
  };

  return (
    <div ref={containerRef} className="fullpage-container">
      {sections.map((section, index) => {
        const SectionComponent = section.component;
        return (
          <div
            key={section.id}
            id={`section-${index}`}
            className="fullpage-section"
            style={{
              transform: `translateY(${(index - currentSection) * 100}vh)`
            }}
          >
            {section.id === 'hero' ? (
              <HeroSection scrollToCalculator={() => {
                const calculatorIndex = sections.findIndex(s => s.id === 'calculator');
                if (calculatorIndex !== -1) {
                  scrollToSection(calculatorIndex);
                }
              }} />
            ) : section.id === 'process' ? (
              <ProcessSection onNavigateToSection={handleProcessNavigation} />
            ) : section.id === 'faq' ? (
              <div className="h-full relative overflow-hidden">
                <div 
                  className={`h-full transition-transform duration-700 ease-out ${
                    faqScrolled ? '-translate-y-16' : 'translate-y-0'
                  }`}
                >
                  <SectionComponent />
                </div>
                <div 
                  className={`absolute bottom-0 w-full transition-transform duration-700 ease-out ${
                    faqScrolled ? 'translate-y-0' : 'translate-y-full'
                  }`}
                >
                  <Footer />
                </div>
              </div>
            ) : (
              <SectionComponent />
            )}
          </div>
        );
      })}
      
      {/* 상단 네비게이션 */}
      <nav className="top-navigation">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">부수다</span>
          </div>
          <div className="nav-menu">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(index)}
                className={`nav-item ${
                  currentSection === index ? 'active' : ''
                }`}
                aria-label={`${section.name} 섹션으로 이동`}
              >
                {section.name}
              </button>
            ))}
          </div>
        </div>
      </nav>
      

    </div>
  );
};

export default Index;