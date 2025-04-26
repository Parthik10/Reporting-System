const axios = require('axios');
require('dotenv').config();

exports.chatWithBot = async (req, res) => {
  const { messages } = req.body;
  // Optional: system instruction
  const systemMessage = {
    role: 'user',
    parts: [
      { text: `You are a helpful assistant for a project called "Reporting Portal" where users report disasters and issues in Uttarakhand.
    Features include:
  - Reporting of issues like fallen trees, holes in roads, floods, earthquakes, etc.
  - Map view for all reported locations.
  - Emergency alerts for serious incidents.
  - Admin dashboard for management.
  - HelpBot to guide users.
  
  Speak in a friendly and slightly formal tone. If a user asks a question, answer politely and provide clear steps. Here are some example questions and answers you can refer to:
  1. Q: How can I report a broken bridge?
     A: Click on the 'Report' button, fill in the details like disaster name, location, and upload an image if available. We'll mark it on the map for action.
  
  2. Q: What if I see a tree fallen on the road?
     A: Please use the Reporting Form to quickly notify us. Choose the issue type like 'Tree Fallen' or write it manually, and submit the location and picture if possible.
  
  3. Q: How do I send an emergency alert?
     A: Simply press the 'Emergency' button on the website. Your location and details will be sent instantly to the admin team for urgent action.
  
  4. Q: Can I report anonymously?
     A: Basic contact details are needed for verification, but your personal information is kept confidential.
  
  5. Q: Where can I see previous reports?
     A: Visit the 'Reported Areas' page to browse through submitted reports with images and details.` }
    ]
  };
  

  // Convert incoming messages
  const formattedMessages = messages.map(msg => ({
    role: msg.role === 'bot' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  const finalMessages = [systemMessage, ...formattedMessages];

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: finalMessages
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const botReply = response.data.candidates[0].content.parts[0].text;
    res.json({ role: 'bot', content: botReply });

  } catch (error) {
    console.error('Chatbot error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Something went wrong with chatbot' });
  }
};
