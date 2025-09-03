import { AlertTriangle, Home, CreditCard, FileX } from "lucide-react";

const ProblemSection = () => {
  return (
    <section className="h-full flex items-start justify-center py-4 px-4 bg-background pt-8 pb-32 sm:pt-8 sm:pb-32 md:pt-8 md:pb-32 lg:pt-8 lg:pb-32">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            "혹시 깡통전세는 아닐까? <br />
            집에 압류가 걸려있진 않을까?"
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            직거래, 이런 걱정 때문에 망설이고 계신가요?
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="text-center p-3 sm:p-4 bg-red-50 rounded-xl sm:rounded-2xl border border-red-200">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 bg-red-100 rounded-full flex items-center justify-center">
              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-red-700 mb-2 sm:mb-3">은행 대출 거절</h3>
            <p className="text-xs sm:text-sm text-red-600">
              "직거래 계약서로는 <br />
              대출 승인이 어렵습니다"
            </p>
          </div>
          
          <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-xl sm:rounded-2xl border border-orange-200">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 bg-orange-100 rounded-full flex items-center justify-center">
              <FileX className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-orange-700 mb-2 sm:mb-3">보증보험 불가</h3>
            <p className="text-xs sm:text-sm text-orange-600">
              "전세보증금을 보장받을 <br />
              방법이 없습니다"
            </p>
          </div>
          
          <div className="text-center p-3 sm:p-4 bg-red-50 rounded-xl sm:rounded-2xl border border-red-200 sm:col-span-2 md:col-span-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 bg-red-100 rounded-full flex items-center justify-center">
              <Home className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-red-700 mb-2 sm:mb-3">분쟁 시 문제</h3>
            <p className="text-xs sm:text-sm text-red-600">
              "계약서에 문제가 생기면 <br />
              누가 책임집니까?"
            </p>
          </div>
        </div>

        <div className="text-center mb-4 sm:mb-6">
          <div className="bg-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-4">
            <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-700">
              결국 다시 중개사 방문 → 풀 수수료 지불
            </p>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">
              "처음부터 중개사에게 맡겼어야 했습니다"
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-primary/30">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-3 sm:mb-4">
              부수다의 해결책
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-left">
              <div className="flex items-center space-x-2">
                <span className="text-green-600 text-base sm:text-lg">✅</span>
                <span className="text-sm sm:text-base font-semibold">반값 비용으로 안전 계약</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-600 text-base sm:text-lg">✅</span>
                <span className="text-sm sm:text-base font-semibold">은행 대출 100% 가능</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-600 text-base sm:text-lg">✅</span>
                <span className="text-sm sm:text-base font-semibold">보증보험 가입 보장</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-600 text-base sm:text-lg">✅</span>
                <span className="text-sm sm:text-base font-semibold">법적 효력 100% 유지</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;