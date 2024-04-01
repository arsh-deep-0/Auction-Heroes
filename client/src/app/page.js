'use client'
import { StartGame } from "@/components/landing-page/start-game";
import { socket } from './socket';
import { useState,useEffect } from "react";


export default function Home() {

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  function connectSocket() {
    socket.connect();
  }

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log('connected')
    }

    function onDisconnect() {
      setIsConnected(false);
    }

   

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between text-black">
      <StartGame/>
      <p>{isConnected}</p>
      <button onClick={connectSocket}>Connect</button>
    </main>
  );
}
