class SignLanguageApp {
    constructor() {
        this.video = document.getElementById('video');
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.symbolDisplay = document.getElementById('symbol');
        this.sentenceDisplay = document.getElementById('sentence');
        this.suggestionButtons = [
            document.getElementById('suggestion1'),
            document.getElementById('suggestion2'),
            document.getElementById('suggestion3'),
            document.getElementById('suggestion4')
        ];

        this.initCamera();
        this.setupEventListeners();
        this.startPredictionLoop();
    }

    initCamera() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                this.video.srcObject = stream;
                this.video.play();
            })
            .catch(err => {
                console.error("Error accessing camera: ", err);
            });
    }

    setupEventListeners() {
        // Xử lý sự kiện cho các nút gợi ý
        this.suggestionButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                this.replaceLastWord(btn.textContent);
            });
        });

        document.getElementById('clearBtn').addEventListener('click', () => {
            this.clearSentence();
        });

        document.getElementById('speakBtn').addEventListener('click', () => {
            this.speakSentence();
        });
    }

    startPredictionLoop() {
        setInterval(async () => {
            if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
                // Chụp ảnh từ video
                this.canvas.width = this.video.videoWidth;
                this.canvas.height = this.video.videoHeight;
                this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);

                // Gửi ảnh lên server
                const blob = await new Promise(resolve =>
                    this.canvas.toBlob(resolve, 'image/jpeg', 0.95)
                );

                const formData = new FormData();
                formData.append('image', blob, 'frame.jpg');

                try {
                    const response = await fetch('http://localhost:5000/predict', {
                        method: 'POST',
                        body: formData
                    });

                    const data = await response.json();

                    // Cập nhật UI
                    this.symbolDisplay.textContent = data.symbol;
                    this.sentenceDisplay.textContent = data.sentence;

                    // Cập nhật các nút gợi ý
                    data.suggestions.forEach((suggestion, index) => {
                        if (index < 4) {
                            this.suggestionButtons[index].textContent = suggestion;
                            this.suggestionButtons[index].style.display = 'block';
                        }
                    });

                    // Ẩn các nút không có gợi ý
                    for (let i = data.suggestions.length; i < 4; i++) {
                        this.suggestionButtons[i].style.display = 'none';
                    }
                } catch (error) {
                    console.error('Error calling API:', error);
                }
            }
        }, 500); // Gửi ảnh mỗi 500ms
    }

    replaceLastWord(newWord) {
        // Gửi yêu cầu thay thế từ cuối cùng
        fetch('http://localhost:5000/replace_word', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ new_word: newWord })
        })
        .then(response => response.json())
        .then(data => {
            this.sentenceDisplay.textContent = data.updated_sentence;
        });
    }

    clearSentence() {
        fetch('http://localhost:5000/clear', {
            method: 'POST'
        })
        .then(() => {
            this.sentenceDisplay.textContent = '';
        });
    }

    speakSentence() {
        const sentence = this.sentenceDisplay.textContent;
        if (sentence) {
            const utterance = new SpeechSynthesisUtterance(sentence);
            window.speechSynthesis.speak(utterance);
        }
    }
}

// Khởi chạy ứng dụng khi trang tải xong
window.addEventListener('DOMContentLoaded', () => {
    new SignLanguageApp();
});