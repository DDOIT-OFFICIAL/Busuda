import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "김○○님",
      age: "32세",
      area: "서울 강남구",
      type: "전세 계약",
      content: "온라인 플랫폼에서 만난 분과 계약하려니 막막했는데, 부수다 덕분에 수수료도 절약하고 안심하고 계약했습니다. 공인중개사님이 꼼꼼히 체크해주셔서 정말 만족스럽습니다.",
      savings: "85만원 절약",
      rating: 5
    },
    {
      name: "박○○님", 
      age: "28세",
      area: "경기 성남시",
      type: "매매 계약",
      content: "처음엔 반신반의했는데, 정말 반값으로 안전하게 계약이 되었습니다. 은행 대출도 문제없이 승인되었고, 계약서도 완벽합니다. 주변에 추천하고 있습니다.",
      savings: "120만원 절약",
      rating: 5
    },
    {
      name: "이○○님",
      age: "35세", 
      area: "인천 연수구",
      type: "전세 계약",
      content: "직거래로 진행하다가 불안해서 부수다로 바꾸었습니다. 매물 검증부터 계약까지 모든 과정이 투명하고 전문적입니다. 앱으로 실시간 확인도 가능해서 편리합니다.",
      savings: "75만원 절약",
      rating: 5
    }
  ];

  return (
    <section className="h-full flex items-center justify-center py-8 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="text-primary">실제 고객</span> 이용 후기
          </h2>
          <p className="text-xl text-muted-foreground">
            이미 수많은 분들이 부수다로 안전하고 저렴하게 계약하고 있습니다
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover-lift bg-white border border-gray-100 relative overflow-hidden">
              <CardContent className="p-6">
                {/* 별점 */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* 인용 아이콘 */}
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                
                {/* 후기 내용 */}
                <p className="text-gray-700 leading-relaxed mb-6 text-sm">
                  "{testimonial.content}"
                </p>

                {/* 절약 금액 강조 */}
                <div className="bg-green-50 rounded-lg p-3 mb-4 border border-green-200">
                  <p className="text-green-700 font-bold text-center">
                    {testimonial.savings}
                  </p>
                </div>

                {/* 고객 정보 */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p>{testimonial.age} • {testimonial.area}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-primary font-semibold">{testimonial.type}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 통계 정보 */}
        <div className="mt-16 bg-white rounded-2xl p-8 border border-primary/20">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">평균 95만원</div>
              <div className="text-sm text-muted-foreground">고객 절약 금액</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-sm text-muted-foreground">고객 만족도</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">3일</div>
              <div className="text-sm text-muted-foreground">평균 처리 시간</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
