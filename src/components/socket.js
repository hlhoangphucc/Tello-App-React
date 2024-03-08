import io from 'socket.io-client';

// const socket = io('http://10.0.3.2:3000');
const socket = io('https://tello-server-nodejs.onrender.com');

// Set up event listeners
socket.on('connect', () => {
  console.log('Connected to the server nodejs');
});

socket.on('disconnect', () => {
  console.log('Disconnected to the server');
});

// You can add more event listeners as needed

export default socket;
