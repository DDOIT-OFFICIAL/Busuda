import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const CalculatorSection = () => {
  const [dealType, setDealType] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [showResult, setShowResult] = useState(false);

  const dealTypes = ["매매", "전세", "월세"];
  const propertyTypes = ["주택", "오피스텔", "분양권", "기타"];

  const calculateFee = () => {
    if (!dealType || !propertyType || !amount) return;
    
    const numAmount = parseInt(amount.replace(/,/g, ""));
    const originalFee = Math.floor(numAmount * 0.004); // 0.4%
    const baroFee = Math.floor(originalFee * 0.5); // 50%
    
    setShowResult(true);
  };

  const formatNumber = (value: string) => {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getOriginalFee = () => {
    if (!amount) return 0;
    const numAmount = parseInt(amount.replace(/,/g, ""));
    return Math.floor(numAmount * 0.004);
  };

  const getBaroFee = () => {
    return Math.floor(getOriginalFee() * 0.5);
  };

  const getSavings = () => {
    return getOriginalFee() - getBaroFee();
  };

  return (
    <section className="h-full flex items-start justify-center py-6 px-4 bg-background overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            수수료 계산기
          </h2>
        </div>

        <Card className="p-6 hover-lift">
          <CardContent className="space-y-6">
            {/* 거래 유형 */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">거래 유형</h3>
              <div className="flex flex-wrap gap-3">
                {dealTypes.map((type) => (
                  <Button
                    key={type}
                    variant={dealType === type ? "default" : "outline"}
                    onClick={() => setDealType(type)}
                    className="min-w-24"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            {/* 매물 유형 */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">매물 유형</h3>
              <div className="flex flex-wrap gap-3">
                {propertyTypes.map((type) => (
                  <Button
                    key={type}
                    variant={propertyType === type ? "secondary" : "outline"}
                    onClick={() => setPropertyType(type)}
                    className="min-w-24"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            {/* 거래 금액 */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">거래 금액</h3>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="예: 50,000"
                  value={amount}
                  onChange={(e) => setAmount(formatNumber(e.target.value))}
                  className="text-lg pr-12"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  만원
                </span>
              </div>
            </div>

            <Button
              onClick={calculateFee}
              disabled={!dealType || !propertyType || !amount}
              className="w-full"
              size="lg"
            >
              수수료 계산하기
            </Button>

            {/* 결과 표시 */}
            {showResult && (
              <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                <h3 className="text-xl font-bold text-primary text-center mb-4">
                  부수다에서는 {getSavings().toLocaleString()}원 아낄 수 있어요!
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">기존 중개수수료</p>
                    <p className="text-lg font-bold text-foreground">
                      {getOriginalFee().toLocaleString()}원
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">부수다 수수료</p>
                    <p className="text-lg font-bold text-primary">
                      {getBaroFee().toLocaleString()}원
                    </p>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3">
                    계산된 비용으로 안전 계약하기
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    💡 1분 신청으로 베테랑 공인중개사 배정
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CalculatorSection;