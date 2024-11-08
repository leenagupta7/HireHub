import { createContext, useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client'; // Corrected import statement
import { useAuthContext } from './AuthContext';

export const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        // Check for authenticated user to initialize socket
        if (authUser) {
            const userId = localStorage.getItem('Id');
            if (userId) {
                const newSocket = io('http://localhost:4000', {
                    query: { userId }, // Passing the userId in query
                });
                
                setSocket(newSocket);
                console.log('socket',socket);
                // Listen for the 'getOnlineUsers' event to update online users
                newSocket.on('getOnlineUsers', (users) => {
                    setOnlineUsers(users);
                });

                // Log successful connection
                newSocket.on('connect', () => {
                    console.log('Socket connected:', newSocket.id);
                });

                // Handle any socket errors
                newSocket.on('connect_error', (err) => {
                    console.error('Socket connection error:', err);
                });

                // Clean up on component unmount or when authUser changes
                return () => {
                    newSocket.close();
                    console.log('Socket disconnected');
                };
            } else {
                console.warn('User ID is missing. Socket connection not established.');
            }
        } else {
            // If user is not authenticated, close the existing socket if any
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
