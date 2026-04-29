// Portal Login Siswa SMAN 8 Yogyakarta - script.js
class AIAssistantLoginForm {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.submitButton = this.form.querySelector('.neural-button');
        this.successMessage = document.getElementById('successMessage');
        this.socialButtons = document.querySelectorAll('.social-neural');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupPasswordToggle();
        this.setupSocialButtons();
        this.setupAIEffects();
    }
    
    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.emailInput.addEventListener('blur', () => this.validateEmail());
        this.passwordInput.addEventListener('blur', () => this.validatePassword());
        this.emailInput.addEventListener('input', () => this.clearError('email'));
        this.passwordInput.addEventListener('input', () => this.clearError('password'));
        
        this.emailInput.setAttribute('placeholder', ' ');
        this.passwordInput.setAttribute('placeholder', ' ');
    }
    
    setupPasswordToggle() {
        this.passwordToggle.addEventListener('click', () => {
            const type = this.passwordInput.type === 'password' ? 'text' : 'password';
            this.passwordInput.type = type;
            this.passwordToggle.classList.toggle('toggle-active', type === 'text');
        });
    }
    
    setupSocialButtons() {
        this.socialButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const provider = button.querySelector('span').textContent.trim();
                this.handleSocialLogin(provider, button);
            });
        });
    }
    
    setupAIEffects() {
        [this.emailInput, this.passwordInput].forEach(input => {
            input.addEventListener('focus', (e) => {
                this.triggerNeuralEffect(e.target.closest('.smart-field'));
            });
        });
    }
    
    triggerNeuralEffect(field) {
        const indicator = field.querySelector('.ai-indicator');
        if(indicator) {
            indicator.style.opacity = '1';
            setTimeout(() => {
                indicator.style.opacity = '';
            }, 2000);
        }
    }
    
   validateEmail() {
    const username = this.emailInput.value.trim(); // Sekarang fungsinya jadi username
    if (!username) { 
        this.showError('email', 'Username wajib diisi'); 
        return false; 
    }
    this.clearError('email'); 
    return true;
}
    
  validatePassword() {
    const password = this.passwordInput.value;
    if (!password) { 
        this.showError('password', 'Kata sandi diperlukan'); 
        return false; 
    }
    this.clearError('password'); 
    return true;
}
    
    showError(field, message) {
        const smartField = document.getElementById(field).closest('.smart-field');
        const errorElement = document.getElementById(`${field}Error`);
        smartField.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    clearError(field) {
        const smartField = document.getElementById(field).closest('.smart-field');
        const errorElement = document.getElementById(`${field}Error`);
        smartField.classList.remove('error');
        errorElement.classList.remove('show');
        setTimeout(() => { errorElement.textContent = ''; }, 200);
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        if (!this.validateEmail() || !this.validatePassword()) return;
        
        this.setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            this.showNeuralSuccess();
        } catch (error) {
            this.showError('password', 'Koneksi gagal.');
        } finally {
            this.setLoading(false);
        }
    }
    
    async handleSocialLogin(provider, button) {
        button.style.pointerEvents = 'none';
        button.style.opacity = '0.7';
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            // Redirect langsung menggunakan path relatif yang benar
            window.location.href = "../index.html"; 
        } catch (error) {
            button.style.pointerEvents = 'auto';
            button.style.opacity = '1';
        }
    }
    
    setLoading(loading) {
        this.submitButton.classList.toggle('loading', loading);
        this.submitButton.disabled = loading;
    }
    
    showNeuralSuccess() {
        this.form.style.transform = 'scale(0.95)';
        this.form.style.opacity = '0';
        
        setTimeout(() => {
            this.form.style.display = 'none';
            const targets = ['.neural-social', '.signup-section', '.auth-separator'];
            targets.forEach(selector => {
                const el = document.querySelector(selector);
                if(el) el.style.display = 'none';
            });
            this.successMessage.classList.add('show');
        }, 300);
        
        // REDIRECT POINT
        setTimeout(() => {
            /* Karena file login kamu ada di DALAM sebuah folder 
               dan index.html ada di LUAR folder tersebut (sejajar dengan foldernya), 
               maka gunakan "../index.html".
            */
            window.location.href = "../index.html";
        }, 3200);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AIAssistantLoginForm();
});
