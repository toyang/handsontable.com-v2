function FormHandler(source) {
  var form, email, name, companyName, message, formSentNotification, formErrorNotification, about, subject;

  document.addEventListener("DOMContentLoaded", function() {
    form = document.getElementById('contact-form');
    email = form.querySelector('input[name=email_address]');
    name = form.querySelector('input[name=full_name]');
    companyName = form.querySelector('input[name=company_name]');
    message = form.querySelector('textarea');
    formSentNotification = document.getElementById('form-sent');
    formErrorNotification = document.getElementById('form-error');
    about = '';
    subject = '';

    switch (source) {
      case 'support':
        about = 'Support';
        subject = 'Support question';

        break;
      case 'contact':
        about = 'Contact';
        subject = 'Contact question';

        break;
    }

    form.addEventListener('submit', function(event) {
      hideNotifications();

      if (Groove) {
        if (email.value === '' || name.value === '' || message.value === '') {
          showError();

        } else {
          Groove.createTicket({
            email: email.value,
            name: name.value + (companyName.value !== '' ? ' (' + companyName.value + ')' : ''),
            about: about,
            subject: subject,
            message: message.value
          }, function(req) {
            if (req.statusText === 'OK') {
              clearForm();
              showConfirmation();
            } else {
              showError();
            }
          });
        }
      }

      event.preventDefault();
    });
  });

  function clearForm() {
    email.value = '';
    name.value = '';
    companyName.value = '';
    message.value = '';
  }

  function hideNotifications() {
    formSentNotification.style.display = 'none';
    formErrorNotification.style.display = 'none';
  }

  function showConfirmation() {
    formSentNotification.style.display = 'block';
  }

  function showError() {
    formErrorNotification.style.display = 'block';
  }
}