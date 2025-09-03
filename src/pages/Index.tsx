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
  const [showFooter, setShowFooter] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionIndex: number) => {
    if (sectionIndex < 0 || sectionIndex >= sections.length || isScrolling) return;
    
    console.log('🎯 Scrolling to section:', sectionIndex);
    setIsScrolling(true);
    setCurrentSection(sectionIndex);
    setIsMobileMenuOpen(false); // 모바일 메뉴 닫기
    
    // 애니메이션 시간에 맞춰 스크롤 상태 리셋 (0.6s + 여유분)
    setTimeout(() => {
      setIsScrolling(false);
      console.log('✅ Animation completed, scroll state reset');
    }, 700);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    console.log('🏠 Index component mounted');
    
    const handleWheel = (e: WheelEvent) => {
      // Footer가 표시된 상태에서 위로 스크롤 시 Footer만 숨김 (최우선 처리)
      if (showFooter && e.deltaY < 0) {
        e.preventDefault();
        e.stopPropagation();
        console.log('📄 Hiding footer - preventing page scroll');
        setShowFooter(false);
        return;
      }

      // 스크롤링 중이면 무시
      if (isScrolling) {
        console.log('⏳ Currently scrolling, ignoring event');
        return;
      }

      // ProcessSection에서 내부 스크롤을 처리 중이면 전체 섹션 스크롤 비활성화
      const processIndex = sections.findIndex(s => s.id === 'process');
      if (currentSection === processIndex && processScrollEnabled) {
        return; // ProcessSection이 자체적으로 스크롤을 처리하도록 함
      }

      // 현재 섹션의 콘텐츠 높이 확인 - 가장 윗부분과 아랫부분에서만 애니메이션
      const currentSectionElement = document.getElementById(`section-${currentSection}`);
      if (currentSectionElement) {
        // 더 정확한 높이 계산
        const sectionHeight = currentSectionElement.scrollHeight;
        const clientHeight = currentSectionElement.clientHeight;
        const viewportHeight = window.innerHeight;
        const isContentOverflowing = sectionHeight > clientHeight;
        
        console.log('📏 Section scroll check:', {
          sectionHeight,
          clientHeight,
          viewportHeight,
          isContentOverflowing,
          scrollTop: currentSectionElement.scrollTop,
          offsetHeight: currentSectionElement.offsetHeight
        });
        
        // 콘텐츠가 넘치는 경우에만 내부 스크롤 처리
        if (isContentOverflowing) {
          const scrollTop = currentSectionElement.scrollTop;
          const maxScrollTop = sectionHeight - clientHeight;
          const edgeThreshold = 30; // 가장자리 감지 임계값을 더 늘림
          
          console.log('📊 Scroll details:', {
            scrollTop,
            maxScrollTop,
            edgeThreshold,
            deltaY: e.deltaY,
            isAtTop: scrollTop <= edgeThreshold,
            isAtBottom: scrollTop >= maxScrollTop - edgeThreshold,
            remainingScroll: maxScrollTop - scrollTop
          });
          
          // 위로 스크롤할 때 - 맨 위가 아니면 내부 스크롤 허용
          if (e.deltaY < 0 && scrollTop > edgeThreshold) {
            console.log('⬆️ Internal scroll up - not at top');
            return; // 내부 스크롤 허용, 섹션 전환 방지
          }
          
          // 아래로 스크롤할 때 - 맨 아래가 아니면 내부 스크롤 허용
          if (e.deltaY > 0 && scrollTop < maxScrollTop - edgeThreshold) {
            console.log('⬇️ Internal scroll down - not at bottom');
            return; // 내부 스크롤 허용, 섹션 전환 방지
          }
          
          // 가장자리에 도달했을 때만 섹션 전환 허용
          if (e.deltaY < 0 && scrollTop <= edgeThreshold) {
            console.log('🎯 At top edge - allowing section transition up');
            // 섹션 전환 허용 - 위로
          } else if (e.deltaY > 0 && scrollTop >= maxScrollTop - edgeThreshold) {
            console.log('🎯 At bottom edge - allowing section transition down');
            // 섹션 전환 허용 - 아래로
          } else {
            console.log('🚫 Not at edge - blocking section transition');
            return; // 가장자리가 아니면 섹션 전환 방지
          }
        } else {
          // 콘텐츠가 넘치지 않는 경우 - 항상 섹션 전환 허용
          console.log('📄 Content fits in viewport - allowing section transition');
        }
      }

      e.preventDefault();
      e.stopPropagation();
      
      console.log('🎯 Wheel event detected:', {
        deltaY: e.deltaY,
        currentSection,
        isScrolling,
        showFooter
      });

      const { deltaY } = e;
      
      if (Math.abs(deltaY) > 10) {
        if (deltaY > 0 && currentSection < sections.length - 1) {
          console.log('⬇️ Scrolling down to section:', currentSection + 1);
          scrollToSection(currentSection + 1);
        } else if (deltaY > 0 && currentSection === sections.length - 1 && !showFooter) {
          // 마지막 섹션(FAQ)에서 아래로 스크롤 시 Footer 표시
          console.log('📄 Showing footer');
          setShowFooter(true);
        } else if (deltaY < 0 && currentSection > 0 && !showFooter) {
          console.log('⬆️ Scrolling up to section:', currentSection - 1);
          scrollToSection(currentSection - 1);
        }
        // Footer가 표시된 상태에서 위로 스크롤은 이미 위에서 처리됨
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
          } else if (currentSection === sections.length - 1 && !showFooter) {
            setShowFooter(true);
          }
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          if (showFooter) {
            setShowFooter(false);
          } else if (currentSection > 0) {
            scrollToSection(currentSection - 1);
          }
          break;
      }
    };

    // 스크롤 이벤트 핸들러 추가
    const handleScroll = (e: Event) => {
      const currentSectionElement = document.getElementById(`section-${currentSection}`);
      if (currentSectionElement) {
        const sectionHeight = currentSectionElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        const isContentOverflowing = sectionHeight > viewportHeight;
        
        if (isContentOverflowing) {
          const scrollTop = currentSectionElement.scrollTop;
          const maxScrollTop = sectionHeight - viewportHeight;
          
          // 스크롤이 끝에 도달했을 때 섹션 전환 허용
          if (scrollTop >= maxScrollTop - 15) {
            // 섹션 끝에 도달했음을 표시
            currentSectionElement.setAttribute('data-scroll-end', 'true');
          } else {
            currentSectionElement.removeAttribute('data-scroll-end');
          }
          
          if (scrollTop <= 15) {
            // 섹션 시작에 도달했음을 표시
            currentSectionElement.setAttribute('data-scroll-start', 'true');
          } else {
            currentSectionElement.removeAttribute('data-scroll-start');
          }
        }
      }
    };

    // 터치 이벤트 처리 (모바일)
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        (e.target as any).touchStartY = touch.clientY;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      const touchStartY = (e.target as any).touchStartY;
      
      if (touch && touchStartY !== undefined) {
        const deltaY = touchStartY - touch.clientY;
        const threshold = 50; // 최소 스와이프 거리
        
        if (Math.abs(deltaY) > threshold) {
          // 현재 섹션의 가장자리 확인
          const currentSectionElement = document.getElementById(`section-${currentSection}`);
          if (currentSectionElement) {
            const sectionHeight = currentSectionElement.scrollHeight;
            const clientHeight = currentSectionElement.clientHeight;
            const isContentOverflowing = sectionHeight > clientHeight;
            
            if (isContentOverflowing) {
              const scrollTop = currentSectionElement.scrollTop;
              const maxScrollTop = sectionHeight - clientHeight;
              const edgeThreshold = 30; // 마우스 휠과 동일한 임계값
              
              // 가장자리에 있을 때만 섹션 전환 허용
              const isAtTop = scrollTop <= edgeThreshold;
              const isAtBottom = scrollTop >= maxScrollTop - edgeThreshold;
              
              if ((deltaY > 0 && isAtBottom) || (deltaY < 0 && isAtTop)) {
                // 터치 스와이프를 휠 이벤트로 변환
                const wheelEvent = new WheelEvent('wheel', {
                  deltaY: deltaY > 0 ? 100 : -100,
                  bubbles: true,
                  cancelable: true
                });
                
                handleWheel(wheelEvent);
              }
            } else {
              // 콘텐츠가 넘치지 않는 경우 - 항상 섹션 전환 허용
              const wheelEvent = new WheelEvent('wheel', {
                deltaY: deltaY > 0 ? 100 : -100,
                bubbles: true,
                cancelable: true
              });
              
              handleWheel(wheelEvent);
            }
          }
        }
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // body overflow 설정
    document.body.style.overflow = 'hidden';

    console.log('✅ Event listeners registered');

    return () => {
      console.log('🧹 Cleaning up event listeners');
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      document.body.style.overflow = '';
    };
  }, [currentSection, isScrolling, processScrollEnabled]);

  useEffect(() => {
    console.log('📍 Current section changed to:', currentSection);
    // ProcessSection인지 확인하여 상태 업데이트
    const processIndex = sections.findIndex(s => s.id === 'process');
    setProcessScrollEnabled(currentSection === processIndex);
    
    // 마지막 섹션이 아닌 다른 섹션으로 이동 시 Footer 상태 리셋
    if (currentSection !== sections.length - 1) {
      setShowFooter(false);
    }
  }, [currentSection]);

  // Footer 상태가 변경될 때 스크롤 상태 리셋
  useEffect(() => {
    if (!showFooter) {
      // Footer가 숨겨진 후 스크롤 상태를 리셋하여 정상적인 스크롤 동작 보장
      setTimeout(() => {
        setIsScrolling(false);
        console.log('🔄 Footer hidden - scroll state reset');
      }, 100); // 약간의 지연을 두어 Footer 애니메이션 완료 후 리셋
    }
  }, [showFooter]);

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
    <div ref={containerRef} className="responsive-fullpage-container">
      {/* 상단 네비게이션 */}
      <nav className="top-navigation">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">부수다</span>
          </div>
          
          {/* 데스크톱 메뉴 */}
          <div className="nav-menu desktop-menu">
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
          
          {/* 모바일 메뉴 토글 버튼 */}
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="메뉴 토글"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
        
        {/* 모바일 메뉴 */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(index)}
              className={`mobile-nav-item ${
                currentSection === index ? 'active' : ''
              }`}
              aria-label={`${section.name} 섹션으로 이동`}
            >
              {section.name}
            </button>
          ))}
        </div>
      </nav>

      {/* 메인 콘텐츠 영역 */}
      <div className="main-content-area">
        {sections.map((section, index) => {
          const SectionComponent = section.component;
          return (
            <div
              key={section.id}
              id={`section-${index}`}
              className="responsive-fullpage-section"
              style={{
                transform: `translateY(${(index - currentSection) * 100}vh)`,
                zIndex: index === currentSection ? 10 : 0,
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
                <SectionComponent />
              ) : (
                <SectionComponent />
              )}
            </div>
          );
        })}
      </div>
      
      {/* Footer Overlay */}
      <div className={`footer-overlay ${showFooter ? 'show' : ''}`}>
        <Footer />
      </div>
    </div>
  );
};

export default Index;