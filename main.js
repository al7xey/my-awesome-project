const dlg = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const xClose = document.getElementById('xClose');
const form = document.getElementById('contactForm');
let lastActive = null;

function openDialog() {
  lastActive = document.activeElement;
  if (typeof dlg.showModal === 'function') {
    dlg.showModal();
  } else {
    dlg.setAttribute('open', '');
  }
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    dlg.querySelector('input,textarea,select,button')?.focus();
  }, 10);
}


function closeDialog(reason = 'cancel') {
  try {
    if (typeof dlg.close === 'function') dlg.close(reason);
    else dlg.removeAttribute('open');
  } catch (e) {
    dlg.removeAttribute('open');
  }
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';

  lastActive?.focus?.();
}

openBtn?.addEventListener('click', openDialog);
closeBtn?.addEventListener('click', () => closeDialog('cancel'));
xClose?.addEventListener('click', () => closeDialog('cancel'));


dlg?.addEventListener('cancel', (ev) => {
  
  closeDialog('cancel');
});


dlg?.addEventListener('close', () => {
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  lastActive?.focus?.();
});

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  [...form.querySelectorAll('.form__error')].forEach(el => el.textContent = '');

  if (!form.checkValidity()) {
    const name = form.elements.name;
    const email = form.elements.email;
    const phone = form.elements.phone;
    const message = form.elements.message;

    if (!name.checkValidity()) {
      document.getElementById('nameError').textContent = name.validity.valueMissing ? 'Введите имя' : 'Минимум 2 символа';
    }
    if (!email.checkValidity()) {
      document.getElementById('emailError').textContent = email.validity.valueMissing ? 'Введите e-mail' : 'Некорректный e-mail';
    }
    if (!phone.checkValidity()) {
      document.getElementById('phoneError').textContent = phone.validity.valueMissing ? 'Введите телефон' : 'Телефон в формате +7 (900) 000-00-00';
    }
    if (!message.checkValidity()) {
      document.getElementById('messageError').textContent = 'Введите сообщение';
    }

    const invalid = form.querySelector(':invalid');
    invalid?.focus();
    return;
  }

  setTimeout(() => {
    form.reset();
    closeDialog('success');
    alert('Сообщение отправлено. Спасибо!');
  }, 250);
});
