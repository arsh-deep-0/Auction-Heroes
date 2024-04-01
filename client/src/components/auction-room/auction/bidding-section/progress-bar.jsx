export default function ProgressBar({soldPlayers,unsoldPlayers,totalPlayers}){
    return (
        <div className='bg-white gap-2 rounded-md text-white border-2 border-solid border-white black-shadow p-2 px-4 w-full flex-col flex  items-center'>
            <div className='text-black w-full justify-between rounded-md flex text-sm'>
                <div className='flex justify-center flex-col items-center poppins-medium text-sky-blue' >
                    <span>Sold</span>
                    <span>{soldPlayers}</span>
                </div>
                <div className='flex justify-center  flex-col items-center poppins-medium text-blue' >
                    
                    <span>Unsold</span>
                    <span>{unsoldPlayers}</span>
                </div>
                <div className='flex justify-center  flex-col items-center poppins-medium' >
                    
                    <span>Total</span>
                    <span>{totalPlayers}</span>
                </div>
            </div>
            <div className='bg-black w-full h-2 rounded-md flex overflow-hidden'>
                <div className='bg-sky-blue h-2' style={{ width: soldPlayers / totalPlayers * 100 + "%" }}>

                </div>
                <div className='bg-blue border-r-4 border-l-4 border-solid border-white  h-2' style={{ width: unsoldPlayers / totalPlayers * 100 + "%" }}>

                </div>

            </div>
        </div>
    )
}