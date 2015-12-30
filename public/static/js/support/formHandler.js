document.addEventListener("DOMContentLoaded", function() {
  var form = document.getElementById('support-form');
  var email = form.querySelector('input[name=email_address]');
  var name = form.querySelector('input[name=full_name]');
  var companyName = form.querySelector('input[name=company_name]');
  var message = form.querySelector('textarea');
  var formSentNotification = document.getElementById('form-sent');
  var formErrorNotification = document.getElementById('form-error');

  form.addEventListener('submit', function(event) {
    hideNotifications();

    if (Groove) {
      if (email.value === '' || name.value === '' || message.value === '') {
        showError();

      } else {
        Groove.createTicket({
          email: email.value,
          name: name.value + (companyName.value !== '' ? '(' + companyName.value + ')' : ''),
          about: 'Support',
          subject: 'Support question',
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
});