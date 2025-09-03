import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertCircle, Info } from "lucide-react";

// 데이터 모델 정의
type Region = "Seoul" | string;
type PropertyType = "주택" | "오피스텔(주거용)" | "비주택" | "분양권" | "기타";
type DealType = "매매" | "전세" | "월세";

interface CommissionResult {
  transactionAmount: number;
  appliedRateCap: number;
  usedRate: number;
  commission: number;
  vat: number;
  commissionWithVAT: number;
  capNote: string;
  sourceRegionTable: string;
}

interface RateTable {
  minAmount: number;
  maxAmount?: number;
  rate: number;
  capLimit?: number;
}

// 지역별 구간표 데이터 (서울 기본)
const REGIONAL_TABLES: Record<Region, Record<PropertyType, Record<DealType, RateTable[]>>> = {
  Seoul: {
    "주택": {
      "매매": [
        { minAmount: 0, maxAmount: 50_000_000, rate: 0.006, capLimit: 250_000 },
        { minAmount: 50_000_000, maxAmount: 200_000_000, rate: 0.005, capLimit: 800_000 },
        { minAmount: 200_000_000, maxAmount: 900_000_000, rate: 0.004 },
        { minAmount: 900_000_000, maxAmount: 1_200_000_000, rate: 0.005 },
        { minAmount: 1_200_000_000, maxAmount: 1_500_000_000, rate: 0.006 },
        { minAmount: 1_500_000_000, rate: 0.007 }
      ],
      "전세": [
        { minAmount: 0, maxAmount: 50_000_000, rate: 0.005, capLimit: 200_000 },
        { minAmount: 50_000_000, maxAmount: 100_000_000, rate: 0.004, capLimit: 300_000 },
        { minAmount: 100_000_000, maxAmount: 600_000_000, rate: 0.003 },
        { minAmount: 600_000_000, maxAmount: 1_200_000_000, rate: 0.004 },
        { minAmount: 1_200_000_000, maxAmount: 1_500_000_000, rate: 0.005 },
        { minAmount: 1_500_000_000, rate: 0.006 }
      ],
      "월세": [
        { minAmount: 0, maxAmount: 50_000_000, rate: 0.005, capLimit: 200_000 },
        { minAmount: 50_000_000, maxAmount: 100_000_000, rate: 0.004, capLimit: 300_000 },
        { minAmount: 100_000_000, maxAmount: 600_000_000, rate: 0.003 },
        { minAmount: 600_000_000, maxAmount: 1_200_000_000, rate: 0.004 },
        { minAmount: 1_200_000_000, maxAmount: 1_500_000_000, rate: 0.005 },
        { minAmount: 1_500_000_000, rate: 0.006 }
      ]
    },
    "오피스텔(주거용)": {
      "매매": [
        { minAmount: 0, rate: 0.005 } // 상한 0.5%, 한도 없음
      ],
      "전세": [
        { minAmount: 0, rate: 0.004 } // 상한 0.4%, 한도 없음
      ],
      "월세": [
        { minAmount: 0, rate: 0.004 } // 상한 0.4%, 한도 없음
      ]
    },
    "비주택": {
      "매매": [
        { minAmount: 0, rate: 0.009 } // 상한 0.9%
      ],
      "전세": [
        { minAmount: 0, rate: 0.009 } // 상한 0.9%
      ],
      "월세": [
        { minAmount: 0, rate: 0.009 } // 상한 0.9%
      ]
    },
    "분양권": {
      "매매": [
        { minAmount: 0, maxAmount: 50_000_000, rate: 0.006, capLimit: 250_000 },
        { minAmount: 50_000_000, maxAmount: 200_000_000, rate: 0.005, capLimit: 800_000 },
        { minAmount: 200_000_000, maxAmount: 900_000_000, rate: 0.004 },
        { minAmount: 900_000_000, maxAmount: 1_200_000_000, rate: 0.005 },
        { minAmount: 1_200_000_000, maxAmount: 1_500_000_000, rate: 0.006 },
        { minAmount: 1_500_000_000, rate: 0.007 }
      ],
      "전세": [
        { minAmount: 0, maxAmount: 50_000_000, rate: 0.005, capLimit: 200_000 },
        { minAmount: 50_000_000, maxAmount: 100_000_000, rate: 0.004, capLimit: 300_000 },
        { minAmount: 100_000_000, maxAmount: 600_000_000, rate: 0.003 },
        { minAmount: 600_000_000, maxAmount: 1_200_000_000, rate: 0.004 },
        { minAmount: 1_200_000_000, maxAmount: 1_500_000_000, rate: 0.005 },
        { minAmount: 1_500_000_000, rate: 0.006 }
      ],
      "월세": [
        { minAmount: 0, maxAmount: 50_000_000, rate: 0.005, capLimit: 200_000 },
        { minAmount: 50_000_000, maxAmount: 100_000_000, rate: 0.004, capLimit: 300_000 },
        { minAmount: 100_000_000, maxAmount: 600_000_000, rate: 0.003 },
        { minAmount: 600_000_000, maxAmount: 1_200_000_000, rate: 0.004 },
        { minAmount: 1_200_000_000, maxAmount: 1_500_000_000, rate: 0.005 },
        { minAmount: 1_500_000_000, rate: 0.006 }
      ]
    },
    "기타": {
      "매매": [
        { minAmount: 0, rate: 0.009 } // 상한 0.9%
      ],
      "전세": [
        { minAmount: 0, rate: 0.009 } // 상한 0.9%
      ],
      "월세": [
        { minAmount: 0, rate: 0.009 } // 상한 0.9%
      ]
    }
  }
};

const CalculatorSection = () => {
  // 상태 변수들
  const [region, setRegion] = useState<Region>("Seoul");
  const [dealType, setDealType] = useState<DealType | "">("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [price, setPrice] = useState<string>(""); // 매매/전세용
  const [deposit, setDeposit] = useState<string>(""); // 월세용
  const [monthlyRent, setMonthlyRent] = useState<string>(""); // 월세용
  const [negotiatedRate, setNegotiatedRate] = useState<string>(""); // 협의요율
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<CommissionResult | null>(null);
  const [error, setError] = useState<string>("");

  const dealTypes: DealType[] = ["매매", "전세", "월세"];
  const propertyTypes = ["주택", "오피스텔", "분양권", "기타"];
  const regions = ["Seoul"]; // 추후 확장 가능

  // 매물 유형 매핑 함수
  const mapPropertyType = (uiType: string): PropertyType => {
    switch (uiType) {
      case "오피스텔": return "오피스텔(주거용)";
      case "분양권": return "분양권";
      case "기타": return "기타";
      default: return "주택";
    }
  };

  // 숫자 포맷팅 함수
  const formatNumber = (value: string) => {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // 만원을 원으로 변환
  const convertToKRW = (amountStr: string): number => {
    const cleanAmount = amountStr.replace(/,/g, "");
    return parseInt(cleanAmount) * 10_000;
  };

  // 구간별 상한요율/한도 찾기
  const findRateTable = (transactionAmount: number, mappedPropertyType: PropertyType, dealType: DealType): RateTable => {
    const tables = REGIONAL_TABLES[region][mappedPropertyType][dealType];
    
    for (const table of tables) {
      if (transactionAmount >= table.minAmount && 
          (table.maxAmount === undefined || transactionAmount < table.maxAmount)) {
        return table;
      }
    }
    
    // 마지막 구간 (상한 없음)
    return tables[tables.length - 1];
  };

  // 월세 환산식 적용
  const calculateMonthlyRentAmount = (depositKRW: number, monthlyRentKRW: number): number => {
    const base = depositKRW + monthlyRentKRW * 100;
    return base < 50_000_000 ? depositKRW + monthlyRentKRW * 70 : base;
  };

  // 메인 계산 함수
  const calculateCommission = (): CommissionResult | null => {
    try {
      setError("");
      
      // 입력 검증
      if (!dealType || !propertyType) {
        setError("거래 유형과 매물 유형을 선택해주세요.");
        return null;
      }

      const mappedPropertyType = mapPropertyType(propertyType);
      let transactionAmount: number;

      // 거래금액 산정
      if (dealType === "월세") {
        if (!deposit || !monthlyRent) {
          setError("보증금과 월세를 모두 입력해주세요.");
          return null;
        }
        const depositKRW = convertToKRW(deposit);
        const monthlyRentKRW = convertToKRW(monthlyRent);
        transactionAmount = calculateMonthlyRentAmount(depositKRW, monthlyRentKRW);
      } else {
        if (!price) {
          setError("거래 금액을 입력해주세요.");
          return null;
        }
        transactionAmount = convertToKRW(price);
      }

      if (transactionAmount <= 0) {
        setError("거래 금액이 올바르지 않습니다.");
        return null;
      }

      // 상한요율/한도 결정
      const rateTable = findRateTable(transactionAmount, mappedPropertyType, dealType);
      const appliedRateCap = rateTable.rate;
      const capLimit = rateTable.capLimit;

      // 협의요율 처리
      let usedRate = appliedRateCap;
      if (negotiatedRate) {
        const negotiatedRateNum = parseFloat(negotiatedRate);
        if (!isNaN(negotiatedRateNum) && negotiatedRateNum > 0) {
          usedRate = Math.min(negotiatedRateNum, appliedRateCap);
        }
      }

      // 중개보수 계산
      let commission = Math.round(transactionAmount * usedRate);
      if (capLimit) {
        commission = Math.min(commission, capLimit);
      }

      // VAT 계산 (10%)
      const vat = Math.round(commission * 0.10);
      const commissionWithVAT = commission + vat;

      // capNote 생성
      let capNote = "";
      if (capLimit) {
        capNote = `${dealType} ${(rateTable.minAmount / 10_000).toLocaleString()}만원~${rateTable.maxAmount ? (rateTable.maxAmount / 10_000).toLocaleString() : '∞'}만원: ${(appliedRateCap * 100).toFixed(1)}%, 한도 ${(capLimit / 10_000).toLocaleString()}만원`;
      } else {
        capNote = `${dealType} ${(rateTable.minAmount / 10_000).toLocaleString()}만원~${rateTable.maxAmount ? (rateTable.maxAmount / 10_000).toLocaleString() : '∞'}만원: ${(appliedRateCap * 100).toFixed(1)}%`;
      }

      const result: CommissionResult = {
        transactionAmount,
        appliedRateCap,
        usedRate,
        commission,
        vat,
        commissionWithVAT,
        capNote,
        sourceRegionTable: `${region} – municipal cap table (verify latest)`
      };

      return result;
    } catch (error) {
      setError("계산 중 오류가 발생했습니다.");
      return null;
    }
  };

  const calculateFee = () => {
    const calculationResult = calculateCommission();
    if (calculationResult) {
      setResult(calculationResult);
      setShowResult(true);
    }
  };

  // 부수다 할인 계산
  const getBaroFee = () => {
    return result ? Math.round(result.commission * 0.5) : 0;
  };

  const getSavings = () => {
    return result ? result.commission - getBaroFee() : 0;
  };

  // 테스트 케이스 검증 함수 (개발용)
  const validateTestCases = () => {
    console.log("=== 테스트 케이스 검증 ===");
    
    // 테스트 케이스 1: 매매·주택·9억 (Seoul)
    // 예상: 구간 2억~9억 미만 0.4% → 36,000,000원 / VAT: 3,600,000 / 합계: 39,600,000
    const test1 = {
      dealType: "매매" as DealType,
      propertyType: "주택",
      price: "90,000", // 9억원
      region: "Seoul" as Region
    };
    
    // 테스트 케이스 2: 전세·주택·3억 (Seoul)  
    // 예상: 임대차 1억~6억: 0.3% → 900,000 / VAT 90,000 / 합계 990,000
    const test2 = {
      dealType: "전세" as DealType,
      propertyType: "주택", 
      price: "30,000", // 3억원
      region: "Seoul" as Region
    };
    
    // 테스트 케이스 3: 월세·주택·보증금 1,000만원·월 50만원 (Seoul)
    // 예상: 환산 60,000,000(≥5천만 → 100배 유지) → 임대차 5천만~1억: 0.4%(한도 30만) → 240,000 / VAT 24,000 / 합계 264,000
    const test3 = {
      dealType: "월세" as DealType,
      propertyType: "주택",
      deposit: "1,000", // 1,000만원
      monthlyRent: "50", // 50만원
      region: "Seoul" as Region
    };
    
    console.log("테스트 케이스 정의 완료. 실제 계산은 UI에서 확인하세요.");
  };

  // 개발 모드에서만 테스트 케이스 실행
  if (process.env.NODE_ENV === 'development') {
    // validateTestCases();
  }

  return (
    <TooltipProvider>
      <section className="h-full flex items-start justify-center py-4 px-4 bg-background pt-8 pb-32 sm:pt-8 sm:pb-32 md:pt-8 md:pb-32 lg:pt-8 lg:pb-32">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
              한국 공인중개사 수수료 계산기
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              법정 상한요율과 구간별 한도를 반영한 정확한 계산
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* 계산기 섹션 */}
            <Card className="p-4 hover-lift">
              <CardContent className="space-y-4">
              {/* 지역 선택 */}
              <div>
                <Label className="text-sm sm:text-base font-semibold text-foreground mb-2 block">지역</Label>
                <Select value={region} onValueChange={(value) => setRegion(value as Region)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="지역을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region === "Seoul" ? "서울특별시" : region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 거래 유형 */}
              <div>
                <Label className="text-sm sm:text-base font-semibold text-foreground mb-2 block">거래 유형</Label>
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
                <Label className="text-sm sm:text-base font-semibold text-foreground mb-2 block">매물 유형</Label>
                <div className="flex flex-wrap gap-3">
                  {propertyTypes.map((type) => (
                    <div key={type} className="flex items-center gap-2">
                      <Button
                        variant={propertyType === type ? "secondary" : "outline"}
                        onClick={() => setPropertyType(type)}
                        className="min-w-24"
                      >
                        {type}
                      </Button>
                      {type === "분양권" && (
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>분양권은 주택-매매 표로 계산됩니다</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                      {type === "기타" && (
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>기타는 비주택 표로 계산됩니다</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 금액 입력 - 거래 유형에 따라 분기 */}
              {dealType === "월세" ? (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm sm:text-base font-semibold text-foreground mb-2 block">보증금</Label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="예: 1,000"
                        value={deposit}
                        onChange={(e) => setDeposit(formatNumber(e.target.value))}
                        className="text-lg pr-12"
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                        만원
                      </span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm sm:text-base font-semibold text-foreground mb-2 block">월세</Label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="예: 50"
                        value={monthlyRent}
                        onChange={(e) => setMonthlyRent(formatNumber(e.target.value))}
                        className="text-lg pr-12"
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                        만원
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <Label className="text-sm sm:text-base font-semibold text-foreground mb-2 block">거래 금액</Label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="예: 50,000"
                      value={price}
                      onChange={(e) => setPrice(formatNumber(e.target.value))}
                      className="text-lg pr-12"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                      만원
                    </span>
                  </div>
                </div>
              )}

              {/* 협의요율 입력 */}
              <div>
                <Label className="text-sm sm:text-base font-semibold text-foreground mb-2 block">
                  협의요율 (선택사항)
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.0001"
                    placeholder="예: 0.0035"
                    value={negotiatedRate}
                    onChange={(e) => setNegotiatedRate(e.target.value)}
                    className="text-lg pr-8"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    %
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                  협의요율을 입력하지 않으면 법정 상한요율이 적용됩니다
                </p>
              </div>

              {/* 에러 메시지 */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <p className="text-destructive text-sm">{error}</p>
                </div>
              )}

              <Button
                onClick={calculateFee}
                disabled={
                  !dealType || 
                  !propertyType || 
                  (dealType === "월세" ? (!deposit || !monthlyRent) : !price)
                }
                className="w-full"
                size="lg"
              >
                수수료 계산하기
              </Button>
              </CardContent>
            </Card>

            {/* 결과 섹션 */}
            <div className="lg:sticky lg:top-4 lg:h-fit">
              {showResult && result ? (
                <div className="space-y-4">
                  {/* 정확한 계산 결과 */}
                  <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                    <h3 className="text-lg font-bold text-primary text-center mb-4">
                      계산 결과
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">거래금액</p>
                          <p className="text-sm font-bold text-foreground">
                            {(result.transactionAmount / 10_000).toLocaleString()}만원
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">상한요율</p>
                          <p className="text-sm font-bold text-foreground">
                            {(result.appliedRateCap * 100).toFixed(1)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">적용요율</p>
                          <p className="text-sm font-bold text-foreground">
                            {(result.usedRate * 100).toFixed(1)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">중개보수</p>
                          <p className="text-sm font-bold text-foreground">
                            {result.commission.toLocaleString()}원
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">VAT (10%)</p>
                          <p className="text-sm font-bold text-foreground">
                            {result.vat.toLocaleString()}원
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">합계</p>
                          <p className="text-base font-bold text-primary">
                            {result.commissionWithVAT.toLocaleString()}원
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">
                        <strong>적용 구간:</strong> {result.capNote}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <strong>근거:</strong> {result.sourceRegionTable}
                      </p>
                    </div>
                  </div>

                  {/* 부수다 할인 비교 */}
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <h3 className="text-lg font-bold text-green-700 text-center mb-3">
                      부수다에서는 {getSavings().toLocaleString()}원을 절약할 수 있습니다!
                    </h3>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">
                          기존 중개수수료 ({(result.usedRate * 100).toFixed(1)}%)
                        </p>
                        <p className="text-sm font-bold text-foreground">
                          {result.commission.toLocaleString()}원
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">부수다 수수료 (50% 할인)</p>
                        <p className="text-sm font-bold text-green-700">
                          {getBaroFee().toLocaleString()}원
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 w-full">
                        계산된 비용으로 안전 계약하기
                      </Button>
                      <p className="text-xs text-muted-foreground mt-1">
                        1분 신청으로 베테랑 공인중개사를 배정해드립니다
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <Card className="p-4">
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">
                      왼쪽에서 정보를 입력하고 계산하기 버튼을 눌러주세요
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default CalculatorSection;