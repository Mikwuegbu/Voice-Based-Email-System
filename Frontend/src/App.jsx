import { useState } from 'react';
import axios from 'axios';

const App = () => {
	const [emailData, setEmailData] = useState({
		to: '',
		subject: '',
		text: '',
	});

	const recognition = new window.webkitSpeechRecognition();
	recognition.continuous = false;
	recognition.lang = 'en-US';

	const startListening = () => {
		recognition.start();
		recognition.onresult = (event) => {
			setEmailData({ ...emailData, text: event.results[0][0].transcript });
		};
	};

	const sendEmail = async () => {
		try {
			const response = await axios.post(
				'http://localhost:5000/send-email',
				emailData
			);
			alert(response.data.message);
		} catch (error) {
			alert('Error sending email');
		}
	};

	return (
		<div style={{ padding: '20px' }}>
			<h2>Voice Email System</h2>
			<input
				type="email"
				name="to"
				placeholder="Recipient Email"
				onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
			/>
			<input
				type="text"
				name="subject"
				placeholder="Subject"
				onChange={(e) =>
					setEmailData({ ...emailData, subject: e.target.value })
				}
			/>
			<textarea
				name="text"
				placeholder="Email Body"
				value={emailData.text}
				onChange={(e) => setEmailData({ ...emailData, text: e.target.value })}
			/>
			<button onClick={startListening}>🎙 Speak</button>
			<button onClick={sendEmail}>Send Email</button>
		</div>
	);
};

export default App;
