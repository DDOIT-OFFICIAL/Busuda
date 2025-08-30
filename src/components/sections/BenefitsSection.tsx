import { TrendingDown, FileCheck, Shield, Star, Clock, Users } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: TrendingDown,
      title: "수수료 50% 절약",
      description: "권리분석 리포트 + 책임 중개 시스템",
      highlight: "최대 120만원 절약"
    },
    {
      icon: FileCheck,
      title: "매물 현장 실사",
      description: "엄선된 베테랑 공인중개사가 직접 검증",
      highlight: "100% 현장 확인"
    },
    {
      icon: Shield,
      title: "법적 보장 유지",
      description: "은행 대출 + 보증보험 + 법적 효력 보장",
      highlight: "직거래 위험 제로"
    }
  ];

  const trustIndicators = [
    {
      icon: Star,
      label: "엄선된 베테랑",
      value: "공인중개사"
    },
    {
      icon: Clock,
      label: "평균 처리시간",
      value: "3일 완료"
    },
    {
      icon: Users,
      label: "고객 만족도",
      value: "98%"
    }
  ];

  return (
    <section className="h-full flex items-center justify-center py-8 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            부수다만의 <span className="text-primary">3가지 보장</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center hover-lift bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
                <benefit.icon className="w-10 h-10 text-primary-foreground" />
              </div>
              <div className="bg-primary/10 rounded-full px-4 py-1 inline-block mb-4">
                <span className="text-primary font-semibold text-sm">{benefit.highlight}</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {benefit.title}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* 신뢰 지표 */}
        <div className="bg-white rounded-2xl p-8 border border-primary/20">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            🏆 바로집 신뢰 지표
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                  <indicator.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">{indicator.label}</p>
                <p className="text-xl font-bold text-primary">{indicator.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;