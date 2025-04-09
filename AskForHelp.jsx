// import { useState } from 'react';

// function GroqChat() {
//   const [message, setMessage] = useState('');
//   const [reply, setReply] = useState('');
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('http://localhost:8000/groq', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ message })
//       });

//       const data = await response.json();
//       setReply(data.reply);
//     } catch (err) {
//       console.error('Error:', err);
//       setReply('Oops! Something went wrong.');
//     }
//     setLoading(false);
//   };

//   return (
//     <div style={{ padding: '1rem' }}>
//       <h2>If you need help With anything ask it here : </h2>
//       <textarea
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         rows="4"
//         cols="50"
//         placeholder="Type your question / message here..."
//       />
//       <br />
//       <button onClick={sendMessage} disabled={loading || !message}>
//         {loading ? 'Thinking...' : 'Send'}
//       </button>
//       {reply && (
//         <div style={{ marginTop: '1rem', background: '#eee', padding: '1rem' }}>
//           <strong>Groq says:</strong>
//           <p>{reply}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default GroqChat;


import { useState } from 'react';

function GroqChat() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/groq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      setReply(data.reply);
    } catch (err) {
      console.error('Error:', err);
      setReply('Oops! Something went wrong.');
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: '100vh',       // fill the browser vertically
        display: 'flex',
        alignItems: 'center',     // center vertically
        justifyContent: 'center', // center horizontally
        backgroundColor: '#f5f5f5',
        padding: '1rem',
      }}
    >
      {/* Card-like container */}
      <div
        style={{
          maxWidth: '600px',
          width: '100%',
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <h2>If you need help With anything ask it here : </h2>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="4"
          cols="50"
          placeholder="Type your question / message here..."
          style={{
            width: '100%',
            marginTop: '1rem',
            padding: '0.75rem',
            borderRadius: '4px',
            borderColor: '#ccc',
            fontSize: '1rem',
          }}
        />

        <br />

        <button
          onClick={sendMessage}
          disabled={loading || !message}
          style={{
            marginTop: '1rem',
            padding: '0.75rem 1.25rem',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: loading || !message ? 'not-allowed' : 'pointer',
            backgroundColor: loading || !message ? '#ccc' : '#007bff',
            color: '#fff',
          }}
        >
          {loading ? 'Thinking...' : 'Send'}
        </button>

        {reply && (
          <div
            style={{
              marginTop: '1rem',
              background: '#eee',
              padding: '1rem',
              borderRadius: '4px',
            }}
          >
            <strong>Help Bot says:</strong>
            <p>{reply}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default GroqChat;
