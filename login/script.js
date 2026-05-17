// Portal Login Siswa SMAN 8 Yogyakarta - script.js
class AIAssistantLoginForm {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.emailInput = document.getElementById('username'); // DIUBAH: dari 'email' ke 'username'
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
        this.emailInput.addEventListener('input', () => this.clearError('username')); // DIUBAH: ke 'username'
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
            if(input) { // Proteksi tambahan agar tidak crash
                input.addEventListener('focus', (e) => {
                    this.triggerNeuralEffect(e.target.closest('.smart-field'));
                });
            }
        });
    }
    
    triggerNeuralEffect(field) {
        if(!field) return;
        const indicator = field.querySelector('.ai-indicator');
        if(indicator) {
            indicator.style.opacity = '1';
            setTimeout(() => {
                indicator.style.opacity = '';
            }, 2000);
        }
    }
    
    validateEmail() {
        const username = this.emailInput.value.trim();
        if (!username) { 
            this.showError('username', 'Username wajib diisi'); // DIUBAH: ke 'username'
            return false; 
        }
        this.clearError('username'); // DIUBAH: ke 'username'
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
        const element = document.getElementById(field);
        if(!element) return;
        const smartField = element.closest('.smart-field');
        const errorElement = document.getElementById(`emailError`); // Disamakan dengan span id di HTML kamu
        if(smartField) smartField.classList.add('error');
        if(errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }
    
    clearError(field) {
        const element = document.getElementById(field);
        if(!element) return;
        const smartField = element.closest('.smart-field');
        const errorElement = document.getElementById(`emailError`);
        if(smartField) smartField.classList.remove('error');
        if(errorElement) {
            errorElement.classList.remove('show');
            setTimeout(() => { errorElement.textContent = ''; }, 200);
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        if (!this.validateEmail() || !this.validatePassword()) return;
        
        this.setLoading(true);
        try {
            const inputtedUsername = this.emailInput.value.trim();
            // Simpan nama tersebut ke dalam sessionStorage browser
            sessionStorage.setItem('loggedInUser', inputtedUsername);
            sessionStorage.setItem('isLoggedIn', 'true');

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
            window.location.href = "../index.html"; 
        } catch (error) {
            button.style.pointerEvents = 'auto';
            button.style.opacity = '1';
        }
    }
    
    setLoading(loading) {
        if(this.submitButton) {
            this.submitButton.classList.toggle('loading', loading);
            this.submitButton.disabled = loading;
        }
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
            if(this.successMessage) this.successMessage.classList.add('show');
        }, 300);
        
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 3200);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AIAssistantLoginForm();
});
