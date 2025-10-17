greetUser();

function greetUser() {
    let userName = prompt("Enter your name:");
    document.getElementById("welcome-speech").innerHTML = userName;
}
function validateForm() {
    let name = document.getElementById("name").value; 

}
const form = document.getElementById('feedbackForm');
const feedbackList = document.getElementById('feedbackList');

// ambil data lama dari localStorage //
let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

// fungsi buat nampilin feedback
function renderFeedback() {
  feedbackList.innerHTML = feedbacks.map(f => `
    <div class="bg-white p-3 rounded shadow">
      <p class="font-semibold">${f.name} - ${'⭐'.repeat(f.rating)}</p>
      <p class="text-gray-700">${f.comment}</p>
    </div>
  `).join('');
}

// render pertama kali
renderFeedback();

// kalo form disubmit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const rating = document.getElementById('rating').value;
  const comment = document.getElementById('comment').value;

  const newFeedback = { name, rating, comment };
  feedbacks.push(newFeedback);

  // simpen ke localStorage
  localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

  // render ulang
  renderFeedback();

    // reset form
    form.reset();
});