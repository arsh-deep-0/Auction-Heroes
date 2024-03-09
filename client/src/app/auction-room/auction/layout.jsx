export default function AuctionLayout({children}){
    return <>
    <div className="min-h-screen h-screen max-h-screen flex flex-col min-w-full max-w-full bg-white p-4 justify-between">
    <header className="bg-blue-pink shadow-lg text-white py-1 px-2 rounded-lg border-white border-solid border-2 gabriela">Auction Heroes</header>
    {children}
    <footer className="bg-blue-pink shadow-lg text-white py-2 px-2 rounded-md border-white border-solid border-2  ">Bottom Navbar</footer>
    </div>
    
    </>
}