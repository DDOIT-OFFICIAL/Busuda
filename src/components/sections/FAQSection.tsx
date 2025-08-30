import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "바로집 서비스는 어떻게 이용하나요?",
      answer: "앱에서 회원가입 후 매물 정보를 입력하시면, 해당 지역 공인중개사가 배정되어 매물 검증부터 계약까지 도와드립니다."
    },
    {
      question: "수수료는 정말 반값인가요?",
      answer: "네, 일반 중개수수료의 50% 수준으로 서비스를 제공합니다. 직거래의 자유로움은 유지하면서도 법적 보장을 받을 수 있습니다."
    },
    {
      question: "계약서의 법적 효력은 어떻게 되나요?",
      answer: "공인중개사가 작성한 정식 부동산매매계약서로, 일반 중개계약과 동일한 법적 효력을 가집니다. 은행 대출과 보증보험 가입도 가능합니다."
    },
    {
      question: "서비스 이용 중 문제가 발생하면 어떻게 하나요?",
      answer: "앱 내 1:1 문의나 고객센터를 통해 언제든 상담받으실 수 있습니다. 또한 협력 공인중개사가 직접 문제 해결을 도와드립니다."
    }
  ];

  return (
    <section className="h-full flex items-center justify-center py-4 px-4 bg-secondary/20 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            자주 묻는 질문
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className={`cursor-pointer transition-all duration-300 hover-lift ${
                openIndex === index ? 'border-primary shadow-lg' : ''
              }`}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between text-left">
                  <span className="text-lg">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </CardTitle>
              </CardHeader>
              {openIndex === index && (
                <CardContent className="pt-0">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <div className="bg-primary/5 rounded-2xl p-4 border border-primary/20 mb-4">
            <p className="text-base text-muted-foreground">
              더 궁금한 점이 있으시거나 개인 상황에 맞는 상담이 필요하세요?
            </p>
          </div>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3">
            더 궁금한 점 1:1 문의하기
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            📞 평일 9시-18시 실시간 상담 가능
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;