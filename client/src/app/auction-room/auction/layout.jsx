export default function AuctionLayout({ children }) {
  return (
    <>
      <div className="min-h-screen h-screen max-h-screen flex flex-col min-w-full max-w-full bg-white p-4 justify-between">
        <header className="bg-blue-pink shadow-lg text-white py-1 px-2 rounded-lg border-white border-solid border-2 gabriela flex items-center justify-between ">
          <div className="flex items-center gap-2">
            
            <div className="w-3 h-3 rounded-full bg-white"></div>
            <p>Auction Heroes</p>
          </div>

          <div className="w-4 h-4 rounded-full bg-white"></div>
        </header>
        {children}
        <footer className="bg-blue-pink shadow-lg text-white py-2 px-2 rounded-md border-white border-solid border-2  ">
          Bottom Navbar
        </footer>
      </div>
    </>
  );
}
