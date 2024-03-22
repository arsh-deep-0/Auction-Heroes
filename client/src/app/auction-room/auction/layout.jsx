export default function AuctionLayout({ children }) {
  return (
    <>
      <div className="min-h-screen h-screen max-h-screen  box-border flex flex-col min-w-full max-w-full bg-light-blue p-4 justify-between">
        <header className="bg-white shadow-lg text-black py-1 px-8 rounded-lg gray-border gabriela flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white"></div>
            <p>Auction Heroes</p>
          </div>

          <div className="w-4 h-4 rounded-full bg-white"></div>
        </header>
        {children}
        <footer className="text-white flex justify-center  ">
          <div className="flex items-center justify-between gray-border w-full rounded-md p-1 text-black poppins-light text-xs">
            <div className="flex flex-col items-center">
              <img src="/images/components/teams.svg" alt="" />
              <p>Teams</p>
            </div>
            <div className="flex flex-col items-center">
              <img src="/images/components/player-cards.svg" alt="" />
              <p>Players</p>
            </div>
            <div className="flex flex-col items-center bg-blue text-white rounded-md px-2">
              <img src="/images/components/hammer.svg" alt="" />
              <p>Auction</p>
            </div>
            <div className="flex flex-col items-center">
              <img src="/images/components/rules-book.svg" alt="" />
              <p>Rules</p>
            </div>
            <div className="flex flex-col items-center">
              <img src="/images/components/profile.svg" alt="" />
              <p>My Team</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
