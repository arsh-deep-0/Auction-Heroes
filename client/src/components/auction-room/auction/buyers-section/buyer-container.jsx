import Buyer from "./buyer";

export default function BuyersContainer(){
    const buyersData = [
        {
          teamName: "mi",
          currentWallet: 23.6,
          totalWallet: 50,
          playersBought: 7,
          playerName: "Arshdeep Singh",
          order:1
        },
        {
          teamName: "csk",
          currentWallet: 33.6,
          totalWallet: 50,
          playersBought: 4,
          playerName: "Bhavya Vohra",
          order:2
        },
        {
          teamName: "srh",
          currentWallet: 17.7,
          totalWallet: 50,
          playersBought: 4,
          playerName: "Akash Choudary",
          order:3
        },
        {
          teamName: "rr",
          currentWallet: 40.2,
          totalWallet: 50,
          playersBought: 3,
          playerName: "Manik Raj",
          order:4
        },
        {
            teamName: "pbks",
            currentWallet: 23.6,
            totalWallet: 50,
            playersBought: 7,
            playerName: "Bhaskar Mishra",
            order:5
          },
        
      ];

    return <>
    <div className="pink-shadow h-full w-full rounded-md overflow-y-scroll bg-blue py-2 px-1 flex flex-col gap-2 border-solid border-white border-b-4 border-t-4">
    {buyersData.map((buyer) => {
        const buyerData = {
          teamName: buyer.teamName,
          currentWallet: buyer.currentWallet,
          totalWallet: buyer.totalWallet,
          playersBought: buyer.playersBought,
          playerName: buyer.playerName,
          order:buyer.order
        };
        return <Buyer key={buyer.teamName} {...buyerData} />;
      })}
    </div>
   
    </>
}