import { CheckCircle, MapPin, FileText } from "lucide-react";


const NetworkSection = () => {
  const services = [
    {
      icon: CheckCircle,
      title: "신뢰할 수 있는 공인중개사가",
      description: "엄격한 검증을 통과한 전문가와 함께"
    },
    {
      icon: MapPin,
      title: "직접 현장에 방문하여 매물 검증",
      description: "꼼꼼한 현장 확인으로 안전한 거래"
    },
    {
      icon: FileText,
      title: "계약서 작성, 특약사항 확인까지",
      description: "법적 검토를 통한 완벽한 계약 체결"
    }
  ];

  return (
    <section className="h-full flex items-start justify-center py-8 px-4 bg-background pt-8 pb-32 sm:pt-8 sm:pb-32 md:pt-8 md:pb-32 lg:pt-8 lg:pb-32">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
          <span className="text-primary">전문 공인중개사</span>와 함께하는 안전한 거래
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-8 sm:mb-12">
          처음부터 끝까지 전문가가 함께합니다
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-card rounded-xl sm:rounded-2xl p-6 sm:p-8 hover-lift border border-border"
            >
              <service.icon className="w-12 h-12 sm:w-16 sm:h-16 text-primary mx-auto mb-4 sm:mb-6" />
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">
                {service.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-8 sm:mt-12 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-primary/20">
          <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
            🏆 검증된 전문가와 함께하는 안전한 부동산 거래
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-primary">✓</span>
              <span>현장 방문 검증</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-primary">✓</span>
              <span>법적 검토 완료</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-primary">✓</span>
              <span>안전한 계약 보장</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetworkSection;