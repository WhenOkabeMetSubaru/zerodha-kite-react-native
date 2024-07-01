import { StyleSheet, Text, View } from 'react-native'
import React,{useContext,createContext, useRef, useEffect, ReactNode} from 'react'
import { Socket,io } from 'socket.io-client';
import auth from '../../features/helpers/auth';

export interface SocketProviderProps {
    emit:(event:string,data?:any)=>void;
    on:(event:string,callback:(data:any)=>void)=>void;
    off:(event:string)=>void;
    initializeSocket:()=>void;
    removeListener:(listenerInfo:string)=>void;
}

const SOCKET_URL_LOCAL = "http://192.168.29.241:4200";
const SOCKET_URL_PRODUCTION = "";

const SocketContextProvider = createContext<SocketProviderProps | undefined>(undefined);

const SocketProvider = ({children}:{children:ReactNode}) => {

    const socket = useRef<Socket>();

    useEffect(()=>{

        socket.current = io(SOCKET_URL_LOCAL,
            {
                transports:["websocket"],
                
            }
        )

        return ()=>{
            socket.current?.disconnect();
        }

    },[])

    const on = (event:string,callback:(data:any)=>void):void=>{
        socket.current?.on(event,callback);
    }

    const off = (event:string):void=>{
        socket.current?.off(event);
    }

    const emit = (event:string,data:any):void=>{
        socket.current?.emit(event,data);
    }

    const removeListener = (listenerInfo:string):void=>{
        socket.current?.removeListener(listenerInfo);
    }

    const socketServiceSetup:SocketProviderProps = {
        initializeSocket:()=>{},
        on,
        off,
        emit,
        removeListener
    }

  return (
    <SocketContextProvider.Provider value={socketServiceSetup}>
        {children}
    </SocketContextProvider.Provider>
  )
}

export default SocketProvider

const styles = StyleSheet.create({})

export const useSocketProviderFinal =():SocketProviderProps | undefined =>{

    const socketService = useContext(SocketContextProvider);

    if(!socketService){
        console.log("socket error")
    }
  

    return socketService;
}