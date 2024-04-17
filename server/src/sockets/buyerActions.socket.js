 const buyerActionsSocket = (io, socket) => {
  return () => {
    socket.on('BID_UP',(bidData)=>{
      console.log('got bid data', bidData);
      console.log(socket.userID,socket.rooms)
        bidData.currentAmount=bidData.currentAmount+1
        socket.join(bidData.auctionRoomID)
        io.to(bidData.auctionRoomID).emit('BID_INC',bidData)
    });
  };
};
export default buyerActionsSocket