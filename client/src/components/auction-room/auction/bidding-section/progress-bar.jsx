export default function ProgressBar({soldPlayers,unsoldPlayers,totalPlayers}){
    return (
        <div className='bg-white gap-2 rounded-md text-white border-2 border-solid border-white black-shadow p-2 px-4 w-full flex-col flex  items-center'>
            <div className='text-black w-full justify-between rounded-md flex stat-text'>
                <div className='flex justify-center flex-col items-center aoboshi text-pink' >
                    <p>Sold</p>
                    <p>{soldPlayers}</p>
                </div>
                <div className='flex justify-center  flex-col items-center aoboshi text-blue' >
                    
                    <p>Unsold</p>
                    <p>{unsoldPlayers}</p>
                </div>
                <div className='flex justify-center  flex-col items-center aoboshi' >
                    
                    <p>Total</p>
                    <p>{totalPlayers}</p>
                </div>
            </div>
            <div className='bg-black w-full h-2 rounded-md flex overflow-hidden'>
                <div className='bg-pink h-2' style={{ width: soldPlayers / totalPlayers * 100 + "%" }}>

                </div>
                <div className='bg-blue border-r-4 border-l-4 border-solid border-white  h-2' style={{ width: unsoldPlayers / totalPlayers * 100 + "%" }}>

                </div>

            </div>
        </div>
    )
}