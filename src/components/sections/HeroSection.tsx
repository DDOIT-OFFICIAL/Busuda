import { Button } from "@/components/ui/button";
import { Calculator, TrendingDown, Shield } from "lucide-react";

interface HeroSectionProps {
  scrollToCalculator?: () => void;
}

const HeroSection = ({ scrollToCalculator }: HeroSectionProps) => {
  const defaultScrollToCalculator = () => {
    const calculatorSection = document.getElementById('calculator-section');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToCalculator = scrollToCalculator || defaultScrollToCalculator;

  return (
    <section className="h-full flex items-start md:items-start lg:items-center justify-center bg-background px-4 pt-8 pb-24 lg:pt-0 lg:pb-0">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 sm:mb-6 fade-in-up">
            <span>
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-primary">부</span><span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black">동산</span>{" "}
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-primary">수</span><span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black">수료</span>{" "}
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-primary">다</span><span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black">이어트</span>
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground mb-6 sm:mb-8 fade-in-up delay-1">
            직거래는 불안하고, 중개는 비용 부담이 크시나요? <br />
            <span className="font-semibold text-foreground">부수다가 해결책입니다.</span>
          </p>
          
          {/* 핵심 가치 시각화 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-primary/20 fade-in-up delay-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                <div className="text-left">
                  <p className="text-xs sm:text-sm text-muted-foreground">수수료 절약</p>
                  <p className="text-sm sm:text-base md:text-lg font-bold text-green-600">최대 120만원</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                <div className="text-left">
                  <p className="text-xs sm:text-sm text-muted-foreground">법적 보장</p>
                  <p className="text-sm sm:text-base md:text-lg font-bold text-blue-600">100% 유지</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                <div className="text-left">
                  <p className="text-xs sm:text-sm text-muted-foreground">처리 시간</p>
                  <p className="text-sm sm:text-base md:text-lg font-bold text-purple-600">3일 완료</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center fade-in-up delay-3">
            <Button 
              onClick={handleScrollToCalculator}
              variant="default" 
              size="lg" 
              className="text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              내가 아낄 수 있는 수수료, 지금 바로 확인
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-primary text-primary hover:bg-primary/5"
              onClick={() => window.open('https://walla.my/v/l7SVKwpsGjQMUue10hcm', '_blank')}
            >
              1분만에 무료 상담 신청
            </Button>
          </div>
          
          <p className="text-xs sm:text-sm text-muted-foreground mt-3 sm:mt-4 fade-in-up delay-4">
            서울 아파트 평균 전세가 기준, 최대 120만원까지 절약 가능합니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;