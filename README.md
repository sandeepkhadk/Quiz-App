# 🧠 Quiz App

> A fast, interactive quiz application to test your knowledge — built with a clean UI and smooth question flow.

---

## ✨ Features

- 📋 **Multiple Choice Questions** — Four answer options per question with instant feedback
- ✅ **Score Tracking** — Live score updates as you progress through the quiz
- ⏱️ **Timer** — Countdown timer to keep each round challenging
- 📊 **Results Screen** — Final score summary with correct/incorrect breakdown
- 🔄 **Restart & Replay** — Retake the quiz without refreshing the page
- 📱 **Responsive Design** — Works seamlessly on desktop and mobile

---

## 🛠️ Tech Stack

| Layer      | Technology             |
|------------|------------------------|
| Markup     | HTML5                  |
| Styling    | CSS3                   |
| Logic      | JavaScript (ES6+)      |
| Questions  | Local JSON / API       |

---

## 📁 Project Structure

```
Quiz-App/
├── index.html          # Main HTML entry point
├── style.css           # Stylesheet
├── script.js           # Core quiz logic
├── questions.js        # Question bank (or API fetch)
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- No installations or dependencies required

### Run Locally

1. **Clone the repository**

```bash
git clone https://github.com/sandeepkhadk/Quiz-App.git
cd Quiz-App
```

2. **Open in browser**

Simply open `index.html` in your browser:

```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

Or use the **Live Server** extension in VS Code for hot reloading.

---

## 🎮 How to Play

1. Click **Start Quiz** on the welcome screen
2. Read each question carefully and select your answer
3. Instant feedback shows whether your answer was correct or wrong
4. Your score updates after every question
5. After the last question, view your **final results**
6. Click **Restart** to play again

---

## 📸 Screenshots

> _Add screenshots of your app here_

| Welcome Screen | Question View | Results Screen |
|:--------------:|:-------------:|:--------------:|
| _(screenshot)_ | _(screenshot)_ | _(screenshot)_ |

---

## 🔧 Customization

### Adding Your Own Questions

Edit `questions.js` (or the questions array in `script.js`) to add, remove, or modify questions:

```js
const questions = [
  {
    question: "What is the capital of France?",
    answers: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: "Paris"
  },
  // Add more questions here...
];
```

### Changing the Timer Duration

Find the timer variable in `script.js` and update the value (in seconds):

```js
let timeLimit = 30; // seconds per question
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

**Sandeep Khadk**
- GitHub: [@sandeepkhadk](https://github.com/sandeepkhadk)

---

> *Think fast. Answer smart. Quiz on! 🚀*
