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
        const email = this.emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) { this.showError('email', 'Email siswa wajib diisi'); return false; }
        if (!emailRegex.test(email)) { this.showError('email', 'Format email tidak valid'); return false; }
        this.clearError('email'); return true;
    }
    
    validatePassword() {
        const password = this.passwordInput.value;
        if (!password) { this.showError('password', 'Kata sandi diperlukan'); return false; }
        if (password.length < 6) { this.showError('password', 'Minimal 6 karakter'); return false; }
        this.clearError('password'); return true;
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
            // Simulasi loading 2 detik
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
            // Redirect langsung untuk social login
            window.location.replace("../../website2"); 
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
        // Efek transisi keluar
        this.form.style.transform = 'scale(0.95)';
        this.form.style.opacity = '0';
        
        setTimeout(() => {
            this.form.style.display = 'none';
            if(document.querySelector('.neural-social')) document.querySelector('.neural-social').style.display = 'none';
            if(document.querySelector('.signup-section')) document.querySelector('.signup-section').style.display = 'none';
            if(document.querySelector('.auth-separator')) document.querySelector('.auth-separator').style.display = 'none';
            
            this.successMessage.classList.add('show');
        }, 300);
        
        // Redirect otomatis
        setTimeout(() => {
            // CARA PALING AMAN UNTUK GITHUB PAGES:
            // Ini akan langsung mengarahkan ke halaman depan domain kamu (astegar-coder.github.io)
            window.location.href = window.location.origin + "/"; 
        }, 3200);
    }
document.addEventListener('DOMContentLoaded', () => {
    new AIAssistantLoginForm();
});
