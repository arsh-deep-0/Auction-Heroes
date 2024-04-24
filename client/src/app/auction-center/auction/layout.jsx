export default function AuctionLayout({ children }) {
    return (
      <>
        <div className="min-h-screen h-screen max-h-screen  box-border flex flex-col min-w-full max-w-full bg-light-blue p-4 justify-between">
          <header className="bg-white shadow-lg text-black py-1 px-2 rounded-lg gray-border poppins-medium flex items-center justify-between ">
            <div className="flex items-center gap-2 ">
              <img className="h-8 w-8" src="/images/components/game-logo.svg" alt="" />
              <span className="text-blue ">Auction Heroes</span>
            </div>
  
            <img className="h-6 w-6 gray-border rounded-full" src="/images/components/profile.svg" alt="" />
          </header>
          
          <div className="flex h-full w-full p-8 gap-12">
          {children}
          <footer className="text-white flex  justify-center items-center  ">
            <div className="flex  flex-col h-72 items-center justify-center gap-8 gray-border w-full rounded-md p-4  text-black poppins-light text-[0.7rem] text-blue">
              <div className="flex flex-col items-center">
                <img src="/images/components/teams.svg" alt="" />
                <span>Teams</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="/images/components/player-cards.svg" alt="" />
                <span>Players</span>
              </div>
              <div className="flex flex-col items-center bg-blue text-white rounded-md px-2">
                <img src="/images/components/hammer.svg" alt="" />
                <span>Auction</span>
              </div>
            </div>
          </footer>
          </div>
         
        </div>
      </>
    );
  }
  