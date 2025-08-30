import { useState, useEffect, useCallback, useRef } from 'react';

interface UseFullPageScrollProps {
  sections: number;
  threshold?: number;
}

export const useFullPageScroll = ({ sections, threshold = 10 }: UseFullPageScrollProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const scrollToSection = useCallback((sectionIndex: number) => {
    if (sectionIndex < 0 || sectionIndex >= sections || isScrolling) return;

    console.log('Scrolling to section:', sectionIndex);
    setIsScrolling(true);
    setCurrentSection(sectionIndex);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Reset scrolling state after animation
    timeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  }, [sections, isScrolling]);

  useEffect(() => {
    console.log('🚀 Setting up full page scroll');
    
    // 휠 이벤트 핸들러
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('🎯 Wheel event detected:', {
        deltaY: e.deltaY,
        currentSection,
        isScrolling,
        sections
      });
      
      if (isScrolling) {
        console.log('⏳ Currently scrolling, ignoring event');
        return;
      }

      const { deltaY } = e;
      
      if (Math.abs(deltaY) > threshold) {
        if (deltaY > 0 && currentSection < sections - 1) {
          console.log('⬇️ Scrolling down to section:', currentSection + 1);
          scrollToSection(currentSection + 1);
        } else if (deltaY < 0 && currentSection > 0) {
          console.log('⬆️ Scrolling up to section:', currentSection - 1);
          scrollToSection(currentSection - 1);
        }
      }
    };

    // 키보드 이벤트 핸들러
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          if (currentSection < sections - 1) {
            scrollToSection(currentSection + 1);
          }
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          if (currentSection > 0) {
            scrollToSection(currentSection - 1);
          }
          break;
        case 'Home':
          e.preventDefault();
          scrollToSection(0);
          break;
        case 'End':
          e.preventDefault();
          scrollToSection(sections - 1);
          break;
      }
    };

    // 스크롤 방지
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    // 이벤트 리스너 등록 - window 객체 사용
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    document.addEventListener('scroll', preventScroll, { passive: false });
    
    // body overflow 설정
    document.body.style.overflow = 'hidden';

    console.log('✅ Event listeners registered');

    return () => {
      console.log('🧹 Cleaning up event listeners');
      
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('scroll', preventScroll);
      
      // body overflow 복원
      document.body.style.overflow = '';
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentSection, sections, threshold, scrollToSection, isScrolling]);

  return {
    currentSection,
    scrollToSection,
    isScrolling
  };
};
