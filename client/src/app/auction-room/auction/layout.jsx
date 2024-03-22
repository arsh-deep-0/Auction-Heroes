export default function AuctionLayout({ children }) {
  return (
    <>
      <div className="min-h-screen h-screen max-h-screen  box-border flex flex-col min-w-full max-w-full bg-light-blue p-4 justify-between">
        <header className="bg-white shadow-lg text-black  px-2 rounded-lg gray-border poppins-medium flex items-center justify-between ">
          <div className="flex items-center gap-2 ">
            <img className="h-10 w-10" src="/images/components/game-logo.svg" alt="" />
            <p>Auction Heroes</p>
          </div>

          <img className="h-7 w-7 gray-border rounded-full" src="/images/components/profile.svg" alt="" />
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
