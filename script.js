const questions = [
    {
        id: 1,
        text: "What's your ideal weekend activity?",
        image: "https://images.unsplash.com/photo-1599488394810-ed1fea1b9c74?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        options: ["Reading a book", "Going on an adventure", "Relaxing at home", "Party with friends"]
    },
    {
        id: 2,
        text: "Which season speaks to your soul?",
        image: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        options: ["Spring", "Summer", "Fall", "Winter"]
    },
    {
        id: 3,
        text: "Pick your favorite time of day:",
        image: "https://images.unsplash.com/photo-1652610522112-0c547be001bb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        options: ["Dawn", "Midday", "Sunset", "Night"]
    },
    {
        id: 4,
        text: "Choose your comfort drink:",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800",
        options: ["Coffee", "Tea", "Wine", "Fresh juice"]
    },
    {
        id: 5,
        text: "What's your dream vacation?",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
        options: ["Beach paradise", "Mountain retreat", "City exploration", "Forest cabin"]
    },
    {
        id: 6,
        text: "Pick a mood:",
        image: "https://images.unsplash.com/photo-1517582082532-16a092d47074?auto=format&fit=crop&q=80&w=800",
        options: ["Romantic", "Energetic", "Peaceful", "Mysterious"]
    }
];

const scentProfiles = {
    romantic: {
        title: "Romantic Floral",
        notes: ["Rose", "Jasmine", "Vanilla", "Peony"],
        description: "A delicate blend of romantic florals with a sweet vanilla base."
    },
    fresh: {
        title: "Fresh Citrus",
        notes: ["Bergamot", "Lemon", "Orange Blossom", "Fresh Mint"],
        description: "An invigorating blend of citrus notes with a fresh, clean finish."
    },
    woody: {
        title: "Warm Woods",
        notes: ["Sandalwood", "Cedar", "Amber", "Musk"],
        description: "A sophisticated woody blend with warm, comforting undertones."
    },
    oriental: {
        title: "Exotic Oriental",
        notes: ["Oud", "Patchouli", "Spices", "Amber"],
        description: "A rich and mysterious blend of exotic spices and deep woods."
    }
};

class PersonalityScentTest {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        
        // DOM elements
        this.quizContainer = document.getElementById('quiz-container');
        this.resultContainer = document.getElementById('result-container');
        this.questionCounter = document.querySelector('.question-counter');
        this.questionImage = document.querySelector('.question-image');
        this.questionText = document.querySelector('.question-text');
        this.optionsGrid = document.querySelector('.options-grid');
        this.progressDots = document.querySelector('.progress-dots');
        this.questionProgress = document.querySelector('.question-progress');
        
        this.initializeQuiz();
        this.showQuestion();
    }

    initializeQuiz() {
        // Create progress dots
        for (let i = 0; i < questions.length; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            this.progressDots.appendChild(dot);
        }

        // Add event listener for reset button
        document.querySelector('.reset-button').addEventListener('click', () => this.resetQuiz());
    }

    showQuestion() {
        const question = questions[this.currentQuestion];
        
        this.questionCounter.textContent = `Question ${this.currentQuestion + 1} of ${questions.length}`;
        this.questionImage.src = question.image;
        this.questionImage.alt = question.text;
        this.questionText.textContent = question.text;
        
        // Update progress
        this.questionProgress.textContent = `${this.currentQuestion + 1} of ${questions.length}`;
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.className = `dot ${index === this.currentQuestion ? 'active' : ''}`;
        });

        // Create option buttons
        this.optionsGrid.innerHTML = '';
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.textContent = option;
            button.addEventListener('click', () => this.handleAnswer(option));
            this.optionsGrid.appendChild(button);
        });
    }

    handleAnswer(answer) {
        this.answers.push(answer);

        if (this.currentQuestion < questions.length - 1) {
            this.currentQuestion++;
            this.showQuestion();
        } else {
            this.showResult();
        }
    }

    determineProfile() {
        const scores = {
            romantic: this.answers.filter(a => ['Reading a book', 'Spring', 'Sunset', 'Tea', 'Beach paradise', 'Romantic'].includes(a)).length,
            fresh: this.answers.filter(a => ['Going on an adventure', 'Summer', 'Dawn', 'Fresh juice', 'Mountain retreat', 'Energetic'].includes(a)).length,
            woody: this.answers.filter(a => ['Relaxing at home', 'Fall', 'Midday', 'Coffee', 'Forest cabin', 'Peaceful'].includes(a)).length,
            oriental: this.answers.filter(a => ['Party with friends', 'Winter', 'Night', 'Wine', 'City exploration', 'Mysterious'].includes(a)).length
        };

        return Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    }

    showResult() {
        const profile = scentProfiles[this.determineProfile()];
        
        document.querySelector('.profile-title').textContent = profile.title;
        document.querySelector('.profile-description').textContent = profile.description;
        
        const notesGrid = document.querySelector('.notes-grid');
        notesGrid.innerHTML = '';
        profile.notes.forEach(note => {
            const noteDiv = document.createElement('div');
            noteDiv.className = 'note-item';
            noteDiv.textContent = note;
            notesGrid.appendChild(noteDiv);
        });

        this.quizContainer.classList.add('hidden');
        this.resultContainer.classList.remove('hidden');
    }

    resetQuiz() {
        this.currentQuestion = 0;
        this.answers = [];
        this.quizContainer.classList.remove('hidden');
        this.resultContainer.classList.add('hidden');
        this.showQuestion();
    }
}

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PersonalityScentTest();
});