document.getElementById('payment-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    document.getElementById('message').innerText = 'Processing payment...';

    const userId = document.getElementById('user-id').value;
    const courseId = document.getElementById('course-id').value;
    const amount = document.getElementById('amount').value;

    const response = await fetch('/dummy-payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, courseId, amount })
    });

    const result = await response.json();
    document.getElementById('message').innerText = result.message + ' Payment ID: ' + result.paymentId;
});
