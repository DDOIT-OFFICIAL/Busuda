import { useEffect, useRef, useState } from "react";
import { FileText, Calendar, Search, ClipboardCheck, PenTool, CheckCircle2, Smartphone } from "lucide-react";

interface ProcessSectionProps {
  onNavigateToSection?: (direction: 'prev' | 'next') => void;
}

const ProcessSection = ({ onNavigateToSection }: ProcessSectionProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const processes = [
    {
      icon: FileText,
      title: "의뢰 신청",
      description: "서비스 접속, 본인인증, 매물 입력",
      screenContent: {
        header: "BaroDeal",
        title: "새로운 매물 등록",
        fields: ["주소 입력", "매물 유형 선택", "가격 정보", "연락처 입력"],
        buttonText: "등록하기"
      }
    },
    {
      icon: Calendar,
      title: "일정 조율",
      description: "공인중개사 연락, 일정 협의",
      screenContent: {
        header: "일정 관리",
        title: "방문 일정 선택",
        fields: ["희망 날짜", "시간대 선택", "특이사항", "연락 방법"],
        buttonText: "일정 확정"
      }
    },
    {
      icon: Search,
      title: "매물 검증",
      description: "현장 방문, 사진/영상, 등기부·건축물대장 검토",
      screenContent: {
        header: "검증 진행",
        title: "매물 현장 조사",
        fields: ["현장 사진", "등기부 확인", "건축물대장", "리스크 분석"],
        buttonText: "검증 완료"
      }
    },
    {
      icon: ClipboardCheck,
      title: "리포트 확인",
      description: "결과 및 리스크 알림, 임대인/임차인 열람 가능",
      screenContent: {
        header: "검증 결과",
        title: "매물 분석 리포트",
        fields: ["안전도 평가", "리스크 요소", "추천 사항", "상세 보고서"],
        buttonText: "리포트 확인"
      }
    },
    {
      icon: PenTool,
      title: "계약 체결",
      description: "법적 효력 있는 계약서, 전자서명",
      screenContent: {
        header: "계약 체결",
        title: "전자 계약서",
        fields: ["계약 조건", "특약 사항", "서명 확인", "결제 정보"],
        buttonText: "계약 완료"
      }
    },
    {
      icon: CheckCircle2,
      title: "거래 완료",
      description: "계약서 보관, 변경/연장 기능 제공",
      screenContent: {
        header: "완료",
        title: "거래 성공!",
        fields: ["계약서 보관함", "연장 옵션", "문의하기", "평가하기"],
        buttonText: "완료"
      }
    }
  ];

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // 섹션이 화면에 보이는지 확인
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
      
      if (!isInView || isScrolling) return;

      const { deltaY } = e;
      
      if (Math.abs(deltaY) > 10) {
        // 현재 스크롤 위치 확인
        const scrollTop = sectionRef.current.scrollTop;
        const scrollHeight = sectionRef.current.scrollHeight;
        const clientHeight = sectionRef.current.clientHeight;
        const maxScrollTop = scrollHeight - clientHeight;
        const edgeThreshold = 10; // 경계 감지 임계값
        
        // 스크롤이 가능한지 확인 (콘텐츠가 넘치는지)
        const isScrollable = scrollHeight > clientHeight;
        
        if (isScrollable) {
          // 스크롤 가능한 경우 - 경계에서만 단계/섹션 전환
          if (deltaY > 0) {
            // 아래로 스크롤
            if (scrollTop >= maxScrollTop - edgeThreshold) {
              // 맨 아래에서 아래로 스크롤
              e.preventDefault();
              e.stopPropagation();
              setIsScrolling(true);
              
              if (currentStep < processes.length - 1) {
                // 다음 단계로 이동
                setCurrentStep(prev => prev + 1);
                // 맨 위로 스크롤
                sectionRef.current.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                // 마지막 단계에서 아래로 스크롤 - 다음 섹션으로
                onNavigateToSection?.('next');
              }
              
              setTimeout(() => setIsScrolling(false), 300);
            }
            // 그 외에는 기본 스크롤 허용
          } else if (deltaY < 0) {
            // 위로 스크롤
            if (scrollTop <= edgeThreshold) {
              // 맨 위에서 위로 스크롤
              e.preventDefault();
              e.stopPropagation();
              setIsScrolling(true);
              
              if (currentStep > 0) {
                // 이전 단계로 이동
                setCurrentStep(prev => prev - 1);
                // 맨 아래로 스크롤
                const scrollHeight = sectionRef.current.scrollHeight;
                const clientHeight = sectionRef.current.clientHeight;
                const maxScrollTop = scrollHeight - clientHeight;
                sectionRef.current.scrollTo({ top: maxScrollTop, behavior: 'smooth' });
              } else {
                // 첫 번째 단계에서 위로 스크롤 - 이전 섹션으로
                onNavigateToSection?.('prev');
              }
              
              setTimeout(() => setIsScrolling(false), 300);
            }
            // 그 외에는 기본 스크롤 허용
          }
        } else {
          // 스크롤 불가능한 경우 - 즉시 단계/섹션 전환
          e.preventDefault();
          e.stopPropagation();
          setIsScrolling(true);
          
          if (deltaY > 0) {
            // 아래로 스크롤
            if (currentStep < processes.length - 1) {
              // 다음 단계로 이동
              setCurrentStep(prev => prev + 1);
            } else {
              // 마지막 단계에서 아래로 스크롤 - 다음 섹션으로
              onNavigateToSection?.('next');
            }
          } else if (deltaY < 0) {
            // 위로 스크롤
            if (currentStep > 0) {
              // 이전 단계로 이동
              setCurrentStep(prev => prev - 1);
            } else {
              // 첫 번째 단계에서 위로 스크롤 - 이전 섹션으로
              onNavigateToSection?.('prev');
            }
          }
          
          setTimeout(() => setIsScrolling(false), 300);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // 섹션이 화면에 보이는지 확인
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
      
      if (!isInView || isScrolling) return;

      // 현재 스크롤 위치 확인
      const scrollTop = sectionRef.current.scrollTop;
      const scrollHeight = sectionRef.current.scrollHeight;
      const clientHeight = sectionRef.current.clientHeight;
      const maxScrollTop = scrollHeight - clientHeight;
      const edgeThreshold = 10;
      
      // 스크롤이 가능한지 확인
      const isScrollable = scrollHeight > clientHeight;

      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          if (isScrollable && scrollTop > edgeThreshold) {
            // 스크롤 가능하고 맨 위가 아닌 경우 - 스크롤 위로
            sectionRef.current.scrollBy({ top: -100, behavior: 'smooth' });
          } else {
            // 맨 위이거나 스크롤 불가능한 경우 - 단계/섹션 전환
            setIsScrolling(true);
            if (currentStep > 0) {
              // 이전 단계로 이동
              setCurrentStep(prev => prev - 1);
              // 맨 위로 스크롤
              sectionRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              // 첫 번째 단계에서 위로 키보드 - 이전 섹션으로
              onNavigateToSection?.('prev');
            }
            setTimeout(() => setIsScrolling(false), 300);
          }
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          if (isScrollable && scrollTop < maxScrollTop - edgeThreshold) {
            // 스크롤 가능하고 맨 아래가 아닌 경우 - 스크롤 아래로
            sectionRef.current.scrollBy({ top: 100, behavior: 'smooth' });
          } else {
            // 맨 아래이거나 스크롤 불가능한 경우 - 단계/섹션 전환
            setIsScrolling(true);
            if (currentStep < processes.length - 1) {
              // 다음 단계로 이동
              setCurrentStep(prev => prev + 1);
              // 맨 위로 스크롤
              sectionRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              // 마지막 단계에서 아래로 키보드 - 다음 섹션으로
              onNavigateToSection?.('next');
            }
            setTimeout(() => setIsScrolling(false), 300);
          }
          break;
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
      
      if (touch && touchStartY !== undefined && !isScrolling && sectionRef.current) {
        const deltaY = touchStartY - touch.clientY;
        const threshold = 50; // 최소 스와이프 거리
        
        if (Math.abs(deltaY) > threshold) {
          // 현재 스크롤 위치 확인
          const scrollTop = sectionRef.current.scrollTop;
          const scrollHeight = sectionRef.current.scrollHeight;
          const clientHeight = sectionRef.current.clientHeight;
          const maxScrollTop = scrollHeight - clientHeight;
          const edgeThreshold = 10;
          
          // 스크롤이 가능한지 확인
          const isScrollable = scrollHeight > clientHeight;
          
          if (isScrollable) {
            // 스크롤 가능한 경우 - 경계에서만 단계/섹션 전환
            if (deltaY > 0 && scrollTop >= maxScrollTop - edgeThreshold) {
              // 맨 아래에서 아래로 스와이프
              setIsScrolling(true);
              
              if (currentStep < processes.length - 1) {
                // 다음 단계로 이동
                setCurrentStep(prev => prev + 1);
                // 맨 위로 스크롤
                sectionRef.current.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                // 마지막 단계에서 아래로 스와이프 - 다음 섹션으로
                onNavigateToSection?.('next');
              }
              
              setTimeout(() => setIsScrolling(false), 300);
            } else if (deltaY < 0 && scrollTop <= edgeThreshold) {
              // 맨 위에서 위로 스와이프
              setIsScrolling(true);
              
              if (currentStep > 0) {
                // 이전 단계로 이동
                setCurrentStep(prev => prev - 1);
                // 맨 아래로 스크롤
                const scrollHeight = sectionRef.current.scrollHeight;
                const clientHeight = sectionRef.current.clientHeight;
                const maxScrollTop = scrollHeight - clientHeight;
                sectionRef.current.scrollTo({ top: maxScrollTop, behavior: 'smooth' });
              } else {
                // 첫 번째 단계에서 위로 스와이프 - 이전 섹션으로
                onNavigateToSection?.('prev');
              }
              
              setTimeout(() => setIsScrolling(false), 300);
            }
            // 그 외에는 기본 스크롤 허용
          } else {
            // 스크롤 불가능한 경우 - 즉시 단계/섹션 전환
            setIsScrolling(true);
            
            if (deltaY > 0) {
              // 아래로 스와이프
              if (currentStep < processes.length - 1) {
                // 다음 단계로 이동
                setCurrentStep(prev => prev + 1);
              } else {
                // 마지막 단계에서 아래로 스와이프 - 다음 섹션으로
                onNavigateToSection?.('next');
              }
            } else if (deltaY < 0) {
              // 위로 스와이프
              if (currentStep > 0) {
                // 이전 단계로 이동
                setCurrentStep(prev => prev - 1);
              } else {
                // 첫 번째 단계에서 위로 스와이프 - 이전 섹션으로
                onNavigateToSection?.('prev');
              }
            }
            
            setTimeout(() => setIsScrolling(false), 300);
          }
        }
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('wheel', handleWheel, { passive: false });
      section.addEventListener('touchstart', handleTouchStart, { passive: true });
      section.addEventListener('touchend', handleTouchEnd, { passive: true });
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (section) {
        section.removeEventListener('wheel', handleWheel);
        section.removeEventListener('touchstart', handleTouchStart);
        section.removeEventListener('touchend', handleTouchEnd);
        window.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [currentStep, isScrolling, processes.length, onNavigateToSection]);

  return (
    <section ref={sectionRef} className="h-full w-full relative overflow-y-auto overflow-x-hidden bg-background pt-8 pb-32 sm:pt-8 sm:pb-32 md:pt-8 md:pb-32 lg:pt-8 lg:pb-32">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl floating-bg"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl floating-bg"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent/5 rounded-full blur-2xl floating-bg"></div>
      </div>

      {/* 메인 콘텐츠 영역 - 스크롤 가능 */}
      <div className="relative z-10 w-full min-h-full flex flex-col items-center justify-center py-4 sm:py-6 md:py-8 px-2 sm:px-4 md:px-6">
        {/* 섹션 제목 */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground mb-1 sm:mb-2">
            앱 안에서 간편하게
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
            복잡한 절차 없이, 단 6단계로 안전한 계약 완료
          </p>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 sm:space-y-8 lg:space-y-0 lg:space-x-8 xl:space-x-12 w-full max-w-5xl">
          
          {/* 휴대폰 모크업 */}
          <div className="relative order-1 lg:order-1 flex-shrink-0">
            {/* 휴대폰 외곽 */}
            <div className="relative w-32 h-[240px] sm:w-40 sm:h-[320px] md:w-48 md:h-[400px] lg:w-64 lg:h-[500px] xl:w-72 xl:h-[550px] bg-gray-900 rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[2rem] p-1.5 sm:p-2 shadow-2xl">
              {/* 화면 베젤 */}
              <div className="w-full h-full bg-black rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[2rem] overflow-hidden relative">
                {/* 노치 */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 md:w-24 lg:w-28 h-2.5 sm:h-3 md:h-4 lg:h-5 bg-black rounded-b-md sm:rounded-b-lg md:rounded-b-xl z-20"></div>
                
                {/* 화면 콘텐츠 */}
                <div 
                  className="w-full h-full bg-white flex flex-col transition-all duration-300 ease-out"
                >
                  {/* 상태바 */}
                  <div className="flex justify-between items-center px-1 sm:px-2 md:px-3 lg:px-6 py-1 sm:py-2 md:py-3 bg-white text-black text-xs sm:text-sm">
                    <span className="font-medium">9:41</span>
                    <div className="flex space-x-0.5 sm:space-x-1">
                      <div className="w-1 h-1 bg-black rounded-full"></div>
                      <div className="w-1 h-1 bg-black rounded-full"></div>
                      <div className="w-1 h-1 bg-black rounded-full"></div>
                    </div>
                  </div>

                  {/* 앱 헤더 */}
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-1 sm:px-2 md:px-3 lg:px-6 py-1.5 sm:py-2 md:py-3 lg:py-4 text-white transition-all duration-300 ease-out">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold transition-all duration-300 ease-out">{processes[currentStep].screenContent.header}</h3>
                      <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 transition-all duration-300 ease-out">
                        {(() => {
                          const IconComponent = processes[currentStep].icon;
                          return <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />;
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* 앱 콘텐츠 */}
                  <div className="flex-1 p-1.5 sm:p-2 md:p-3 lg:p-6 bg-gray-50 transition-all duration-300 ease-out">
                    <h4 className="text-xs sm:text-sm md:text-base lg:text-xl font-bold text-gray-800 mb-1.5 sm:mb-2 md:mb-3 lg:mb-6 text-center transition-all duration-300 ease-out">
                      {processes[currentStep].screenContent.title}
                    </h4>
                    
                    <div className="space-y-1.5 sm:space-y-2 md:space-y-3 lg:space-y-4">
                      {processes[currentStep].screenContent.fields.map((field, index) => (
                        <div 
                          key={index} 
                          className="bg-white rounded-lg p-1.5 sm:p-2 md:p-3 lg:p-4 shadow-sm border transition-all duration-300 ease-out"
                        >
                          <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3">
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 lg:w-3 lg:h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                            <span className="text-gray-700 text-xs sm:text-xs md:text-sm lg:text-sm transition-all duration-300 ease-out leading-tight">{field}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button 
                      className="w-full bg-blue-500 text-white py-1.5 sm:py-2 md:py-3 lg:py-4 rounded-lg font-medium mt-2 sm:mt-3 md:mt-4 lg:mt-8 shadow-lg transition-all duration-300 hover:bg-blue-600 active:scale-95 text-xs sm:text-xs md:text-sm lg:text-base ease-out"
                    >
                      {processes[currentStep].screenContent.buttonText}
                    </button>
                  </div>

                  {/* 홈 인디케이터 */}
                  <div className="flex justify-center py-0.5 sm:py-1 md:py-2">
                    <div className="w-16 sm:w-20 md:w-24 lg:w-32 h-0.5 sm:h-0.5 md:h-1 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 프로세스 설명 카드 */}
          <div 
            className="w-full max-w-[240px] sm:max-w-sm md:max-w-md lg:max-w-lg bg-card/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-border/50 transition-all duration-300 ease-out p-2 sm:p-4 md:p-6 lg:p-8 order-2 lg:order-2"
          >
            {/* 단계 표시 */}
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 mb-3 sm:mb-4 md:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base md:text-lg">
                {currentStep + 1}
              </div>
              <div>
                <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-1">
                  {processes[currentStep].title}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  STEP {currentStep + 1} OF {processes.length}
                </p>
              </div>
            </div>

            {/* 설명 */}
            <p className="text-foreground/90 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6 md:mb-8">
              {processes[currentStep].description}
            </p>

            {/* 진행 바 */}
            <div className="space-y-1.5 sm:space-y-2 md:space-y-3 mb-3 sm:mb-4 md:mb-6">
              <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                <span>진행률</span>
                <span>{Math.round(((currentStep + 1) / processes.length) * 100)}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-1 sm:h-1.5 md:h-2 overflow-hidden">
                <div 
                  className="progress-bar-fill h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${((currentStep + 1) / processes.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* 네비게이션 버튼 */}
            <div className="flex items-center justify-center space-x-3 sm:space-x-4 md:space-x-6">
              <button
                onClick={() => {
                  if (currentStep > 0) {
                    setCurrentStep(prev => prev - 1);
                  } else {
                    onNavigateToSection?.('prev');
                  }
                }}
                disabled={currentStep === 0 && !onNavigateToSection}
                className={`flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm transition-all duration-300 px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 rounded-lg ${
                  currentStep > 0 || onNavigateToSection
                    ? 'text-muted-foreground hover:text-primary hover:bg-primary/10 cursor-pointer' 
                    : 'text-muted-foreground/40 cursor-not-allowed'
                }`}
              >
                <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border border-current rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                  <span className="text-xs">↑</span>
                </div>
                <span>이전</span>
              </button>
              <button
                onClick={() => {
                  if (currentStep < processes.length - 1) {
                    setCurrentStep(prev => prev + 1);
                  } else {
                    onNavigateToSection?.('next');
                  }
                }}
                disabled={currentStep === processes.length - 1 && !onNavigateToSection}
                className={`flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm transition-all duration-300 px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 rounded-lg ${
                  currentStep < processes.length - 1 || onNavigateToSection
                    ? 'text-muted-foreground hover:text-primary hover:bg-primary/10 cursor-pointer' 
                    : 'text-muted-foreground/40 cursor-not-allowed'
                }`}
              >
                <span>다음</span>
                <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border border-current rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                  <span className="text-xs">↓</span>
                </div>
              </button>
            </div>
          </div>

        </div>




      </div>
    </section>
  );
};

export default ProcessSection;