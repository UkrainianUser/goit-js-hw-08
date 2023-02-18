import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageTextarea = feedbackForm.querySelector('textarea[name="message"]');
const STORAGE_KEY = 'feedback-form-state';

try {
	const feedbackState = JSON.parse(localStorage.getItem(STORAGE_KEY));

	if (feedbackState) {
		emailInput.value = feedbackState.email || '';
		messageTextarea.value = feedbackState.message || '';
		}
	} catch (error) {
	console.error('Error:', error);
}

const saveFeedbackState = throttle(() => {
	const feedbackState = {
		email: emailInput.value,
		message: messageTextarea.value,
	};

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackState));
	} catch (error) {
		console.error('Error:', error);
	}
}, 500);

emailInput.addEventListener('input', saveFeedbackState);
messageTextarea.addEventListener('input', saveFeedbackState);

feedbackForm.addEventListener('submit', event => {
	event.preventDefault();
	const feedbackState = {
		email: '',
		message: '',
	};

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackState));
	} catch (error) {
		console.error('Error:', error);
	}

	emailInput.value = '';
   messageTextarea.value = '';
});
