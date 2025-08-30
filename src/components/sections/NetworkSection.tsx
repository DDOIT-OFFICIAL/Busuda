import { MapPin } from "lucide-react";

const NetworkSection = () => {
  const cities = [
    "서울", "부산", "인천", "대전", "청주", "광주", "대구", "울산",
    "수원", "성남", "고양", "용인", "천안", "전주", "창원", "포항"
  ];

  return (
    <section className="h-full flex items-center justify-center py-8 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          <span className="text-primary">엄선된 베테랑</span> 공인중개사와 함께
        </h2>
        <p className="text-xl text-muted-foreground mb-4">
          전국 주요 도시 협력 네트워크로 안전한 계약 보장
        </p>
        <div className="bg-primary/10 rounded-full px-6 py-2 inline-block mb-12">
          <span className="text-primary font-semibold">✅ 평균 15년 경력 • 검증된 전문성</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {cities.map((city, index) => (
            <div
              key={index}
              className="bg-card rounded-lg p-4 hover-lift border border-border"
            >
              <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="font-semibold text-foreground">{city}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-white rounded-2xl p-6 border border-primary/20">
          <p className="text-muted-foreground mb-4">
            🏆 엄격한 선별 기준을 통과한 협력 중개사만 함께합니다
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-primary">✓</span>
              <span>15년 이상 경력</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-primary">✓</span>
              <span>무사고 이력</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-primary">✓</span>
              <span>고객 만족도 95% 이상</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetworkSection;