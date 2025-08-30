const Footer = () => {
  return (
    <footer className="w-full py-4 px-4 bg-muted/60 backdrop-blur-sm border-t border-border/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-1 text-muted-foreground">
          <h3 className="text-base font-bold text-foreground mb-2">위디드</h3>
          <p className="text-xs">사업자등록번호: 713-55-00881</p>
          <p className="text-xs">주소: 서울 강북구 노해로 23길 123, 강북청년창업마루 401호</p>
          <p className="text-xs pt-2 opacity-70">
            © 2025 위디드. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;