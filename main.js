const dlg = document.getElementById("contactDialog");
const openBtn = document.getElementById("openDialog");
const closeBtn = document.getElementById("closeDialog");
const form = document.getElementById("contactForm"); // ← Одно объявление
let lastActive = null;

openBtn.addEventListener("click", () => {
  lastActive = document.activeElement;
  dlg.showModal();
  dlg.querySelector("input,select,textarea,button")?.focus();
});

closeBtn.addEventListener("click", () => dlg.close("cancel"));

form?.addEventListener("submit", (e) => {
  // 1) Сброс кастомных сообщений
  [...form.elements].forEach(el => el.setCustomValidity?.(''));
  
  // 2) Проверка встроенных ограничений
  if (!form.checkValidity()) {
    e.preventDefault();
    
    const email = form.elements.email;
    if (email?.validity.typeMismatch) {
      email.setCustomValidity('Введите корректный e-mail, например name@example.com');
    }
    
    form.reportValidity();
    
    [...form.elements].forEach(el => {
      if (el.willValidate) el.toggleAttribute('aria-invalid', !el.checkValidity());
    });
    return;
  }
  
  // 3) Успешная «отправка»
  e.preventDefault();
  document.getElementById('contactDialog')?.close('success');
  form.reset();
});

dlg.addEventListener("close", () => {
  lastActive?.focus();
});

// Остальной код с телефоном...
const phone = document.getElementById('phone');
phone?.addEventListener('input', () => {
  // форматирование телефона
});
phone?.setAttribute('pattern', '^\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}$');