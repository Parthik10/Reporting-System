// src/components/Chatbot.jsx
import { useState } from 'react';
import { Box, IconButton, TextField, Button, Paper, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false); // to open/close chat

  const sendMessage = async () => {
    if (!input) return;
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [...messages, userMessage],
      }, {
        headers: {
          Authorization: `Bearer YOUR_OPENAI_API_KEY`,
          'Content-Type': 'application/json',
        },
      });

      const botMessage = response.data.choices[0].message;
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
              <Box key={idx} sx={{ mb: 1 }}>
                <Typography variant="body2" color={msg.role === 'user' ? 'primary' : 'secondary'}>
                  <b>{msg.role}:</b> {msg.content}
                </Typography>
              </Box>
            ))}
          </Box>
          <TextField
            size="small"
            fullWidth
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            sx={{ mb: 1 }}
          />
          <Button variant="contained" onClick={sendMessage} sx={{backgroundColor: '#31572c',}}>
            Send
          </Button>
        </Paper>
      )}
    </>
  );
}

export default Chatbot;
