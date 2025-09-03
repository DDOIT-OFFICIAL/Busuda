import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "부수다 서비스는 어떻게 이용하나요?",
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
    <section className="h-full flex items-start justify-center py-4 px-4 bg-background pt-8 pb-32 sm:pt-8 sm:pb-32 md:pt-8 md:pb-32 lg:pt-8 lg:pb-32">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            자주 묻는 질문
          </h2>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className={`cursor-pointer transition-all duration-300 hover-lift ${
                openIndex === index ? 'border-primary shadow-lg' : ''
              }`}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6">
                <CardTitle className="flex items-center justify-between text-left">
                  <span className="text-sm sm:text-base md:text-lg pr-2">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </CardTitle>
              </CardHeader>
              {openIndex === index && (
                <CardContent className="pt-0 p-4 sm:p-6">
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <div className="text-center mt-6 sm:mt-8">
          <div className="bg-primary/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-primary/20 mb-3 sm:mb-4">
            <p className="text-sm sm:text-base text-muted-foreground">
              더 궁금한 점이 있으시거나 개인 상황에 맞는 상담이 필요하세요?
            </p>
          </div>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
            onClick={() => window.open('https://walla.my/v/l7SVKwpsGjQMUue10hcm', '_blank')}
          >
            더 궁금한 점 1:1 문의하기
          </Button>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-3">
            📞 평일 9시-18시 실시간 상담 가능
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;