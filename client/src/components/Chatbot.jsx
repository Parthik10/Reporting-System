import { useState } from 'react';
import { Box, IconButton, TextField, Button, Paper, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

function Chatbot() {
  const isLocal = window.location.hostname === 'localhost';
  const API= isLocal
    ? import.meta.env.VITE_APP_URI_API 
    : import.meta.env.VITE_BACKEND_URL;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false); // to open/close chat

  // Handle sending message
  const sendMessage = async () => {
    if (!input.trim()) return; // Ignore empty or spaces

    const newUserMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInput('');

    try {
      const response = await axios.post(`${API}/api/chat`, {
        messages: updatedMessages,
      });

      const botMessage = response.data;
      setMessages(prev => [...prev, botMessage]);
      
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <IconButton
        sx={{
          position: 'fixed',
          bottom: 40,
          right: 40,
          backgroundColor: '#31572c',
          color: 'white',
          '&:hover': { backgroundColor:"#31572c" },
          zIndex: 9999,
          height: '50px',
          width: '50px',
        }}
        onClick={() => setOpen(!open)}
      >
        {open ? <CloseIcon /> : <AddCircleIcon />}
      </IconButton>

      {/* Chatbox */}
      {open && (
        <Paper
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 20,
            width: 300,
            height: 400,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 9998,
          }}
          elevation={4}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>helpbot</Typography>
          <Box sx={{ flex: 1, overflowY: 'auto', mb: 2}}>
            {messages.map((msg, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    p: 1,
                    bgcolor: msg.role === 'user' ? '#DCF8C6' : '#F1F0F0',
                    borderRadius: 2,
                    maxWidth: '80%',
                  }}
                >
                  <Typography variant="body2" color="text.primary">
                    {msg.content}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <TextField
            size="small"
            fullWidth
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
              }
            }}
            sx={{ mb: 1 }}
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            sx={{ backgroundColor: '#31572c', }}
          >
            Send
          </Button>
        </Paper>
      )}
    </>
  );
}

export default Chatbot;
