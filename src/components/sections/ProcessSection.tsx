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

      e.preventDefault();
      e.stopPropagation();

      const { deltaY } = e;
      
      if (Math.abs(deltaY) > 10) {
        setIsScrolling(true);
        
        if (deltaY > 0) {
          if (currentStep < processes.length - 1) {
            // 아래로 스크롤 - 다음 스텝
            setCurrentStep(prev => prev + 1);
          } else {
            // 마지막 스텝에서 아래로 스크롤 - 다음 섹션으로
            setIsScrolling(false); // 즉시 스크롤 상태 해제
            onNavigateToSection?.('next');
            return;
          }
        } else if (deltaY < 0) {
          if (currentStep > 0) {
            // 위로 스크롤 - 이전 스텝
            setCurrentStep(prev => prev - 1);
          } else {
            // 첫 번째 스텝에서 위로 스크롤 - 이전 섹션으로
            setIsScrolling(false); // 즉시 스크롤 상태 해제
            onNavigateToSection?.('prev');
            return;
          }
        }

        // 스크롤 상태 리셋
        setTimeout(() => {
          setIsScrolling(false);
        }, 300);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // 섹션이 화면에 보이는지 확인
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
      
      if (!isInView || isScrolling) return;

      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
          } else {
            // 첫 번째 스텝에서 위로 키보드 - 이전 섹션으로
            onNavigateToSection?.('prev');
          }
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          if (currentStep < processes.length - 1) {
            setCurrentStep(prev => prev + 1);
          } else {
            // 마지막 스텝에서 아래로 키보드 - 다음 섹션으로
            onNavigateToSection?.('next');
          }
          break;
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (section) {
        section.removeEventListener('wheel', handleWheel);
        window.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [currentStep, isScrolling, processes.length]);

  return (
    <section ref={sectionRef} className="h-full relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl floating-bg"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl floating-bg"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent/5 rounded-full blur-2xl floating-bg"></div>
      </div>

      <div className="relative z-10 h-full flex items-center justify-center p-4 md:p-6">
        <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-16 w-full max-w-6xl">
          
          {/* 휴대폰 모크업 */}
          <div className="relative">
            {/* 휴대폰 외곽 */}
            <div className="relative w-56 h-[450px] md:w-72 md:h-[550px] lg:w-80 lg:h-[600px] bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
              {/* 화면 베젤 */}
              <div className="w-full h-full bg-black rounded-[2rem] overflow-hidden relative">
                {/* 노치 */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20"></div>
                
                {/* 화면 콘텐츠 */}
                <div 
                  className="w-full h-full bg-white flex flex-col transition-all duration-300 ease-out"
                >
                  {/* 상태바 */}
                  <div className="flex justify-between items-center px-4 md:px-6 py-2 md:py-3 bg-white text-black text-xs">
                    <span className="font-medium">9:41</span>
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-black rounded-full"></div>
                      <div className="w-1 h-1 bg-black rounded-full"></div>
                      <div className="w-1 h-1 bg-black rounded-full"></div>
                    </div>
                  </div>

                  {/* 앱 헤더 */}
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 md:px-6 py-3 md:py-4 text-white transition-all duration-300 ease-out">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base md:text-lg font-bold transition-all duration-300 ease-out">{processes[currentStep].screenContent.header}</h3>
                      <div className="w-5 h-5 md:w-6 md:h-6 transition-all duration-300 ease-out">
                        {(() => {
                          const IconComponent = processes[currentStep].icon;
                          return <IconComponent className="w-5 h-5 md:w-6 md:h-6" />;
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* 앱 콘텐츠 */}
                  <div className="flex-1 p-4 md:p-6 bg-gray-50 transition-all duration-300 ease-out">
                    <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 text-center transition-all duration-300 ease-out">
                      {processes[currentStep].screenContent.title}
                    </h4>
                    
                    <div className="space-y-4">
                      {processes[currentStep].screenContent.fields.map((field, index) => (
                        <div 
                          key={index} 
                          className="bg-white rounded-lg p-3 md:p-4 shadow-sm border transition-all duration-300 ease-out"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 md:w-3 md:h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-700 text-xs md:text-sm transition-all duration-300 ease-out">{field}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button 
                      className="w-full bg-blue-500 text-white py-3 md:py-4 rounded-lg font-medium mt-6 md:mt-8 shadow-lg transition-all duration-300 hover:bg-blue-600 active:scale-95 text-sm md:text-base ease-out"
                    >
                      {processes[currentStep].screenContent.buttonText}
                    </button>
                  </div>

                  {/* 홈 인디케이터 */}
                  <div className="flex justify-center py-2">
                    <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 프로세스 설명 카드 */}
          <div 
            className="max-w-md w-full bg-card/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-border/50 transition-all duration-300 ease-out p-6 md:p-8"
          >
            {/* 단계 표시 */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                {currentStep + 1}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {processes[currentStep].title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  STEP {currentStep + 1} OF {processes.length}
                </p>
              </div>
            </div>

            {/* 설명 */}
            <p className="text-foreground/90 text-lg leading-relaxed mb-8">
              {processes[currentStep].description}
            </p>

            {/* 진행 바 */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>진행률</span>
                <span>{Math.round(((currentStep + 1) / processes.length) * 100)}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div 
                  className="progress-bar-fill h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${((currentStep + 1) / processes.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* 네비게이션 버튼 */}
            <div className="flex items-center justify-center space-x-6">
              <button
                onClick={() => {
                  if (currentStep > 0) {
                    setCurrentStep(prev => prev - 1);
                  } else {
                    onNavigateToSection?.('prev');
                  }
                }}
                disabled={currentStep === 0 && !onNavigateToSection}
                className={`flex items-center space-x-2 text-sm transition-all duration-300 px-3 py-2 rounded-lg ${
                  currentStep > 0 || onNavigateToSection
                    ? 'text-muted-foreground hover:text-primary hover:bg-primary/10 cursor-pointer' 
                    : 'text-muted-foreground/40 cursor-not-allowed'
                }`}
              >
                <div className="w-6 h-6 border border-current rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
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
                className={`flex items-center space-x-2 text-sm transition-all duration-300 px-3 py-2 rounded-lg ${
                  currentStep < processes.length - 1 || onNavigateToSection
                    ? 'text-muted-foreground hover:text-primary hover:bg-primary/10 cursor-pointer' 
                    : 'text-muted-foreground/40 cursor-not-allowed'
                }`}
              >
                <span>다음</span>
                <div className="w-6 h-6 border border-current rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                  <span className="text-xs">↓</span>
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* 사이드 인디케이터 */}
        <div className="fixed right-4 md:right-8 top-1/2 transform -translate-y-1/2 space-y-2 md:space-y-3 z-20">
          {processes.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentStep(index);
              }}
              className={`block w-3 h-3 rounded-full transition-all duration-300 ${
                currentStep === index 
                  ? 'bg-primary scale-150 shadow-lg shadow-primary/50' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50 hover:scale-125'
              }`}
              aria-label={`스텝 ${index + 1}로 이동`}
            />
          ))}
        </div>

        {/* 상단 제목 */}
        <div className="absolute top-4 md:top-8 left-1/2 transform -translate-x-1/2 text-center z-20 px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            앱 안에서 간편하게
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            복잡한 절차 없이, 단 6단계로 안전한 계약 완료
          </p>
        </div>

        {/* 하단 안내 */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 text-center z-20 px-4">
          <p className="text-sm text-muted-foreground/70 mb-4">
            {currentStep === 0 
              ? "버튼 클릭 또는 스크롤하여 다음 단계를 확인하세요" 
              : currentStep === processes.length - 1 
                ? "버튼 클릭 또는 스크롤하여 다음 섹션으로 이동하세요" 
                : "버튼 클릭 또는 스크롤하여 단계를 탐색하세요"
            }
          </p>
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground/60">
            <span>키보드: ← → ↑ ↓</span>
            <span>•</span>
            <span>마우스: 스크롤</span>
            <span>•</span>
            <span>클릭: 버튼</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;