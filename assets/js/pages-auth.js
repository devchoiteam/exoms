/**
 *  Pages Authentication
 */
'use strict';

document.addEventListener('DOMContentLoaded', function () {
  (() => {
    const formAuthentication = document.querySelector('#formAuthentication');

    // Form validation for Add new record
    if (formAuthentication && typeof FormValidation !== 'undefined') {
      FormValidation.formValidation(formAuthentication, {
        fields: {
          userid: {
            validators: {
              notEmpty: {
                message: '아이디를 입력하세요'
              },
              stringLength: {
                min: 6,
                message: '사내 회원 아이디를 입력해주세요(6글자 이상)'
              }
            }
          },
          password: {
            validators: {
              notEmpty: {
                message: '비밀번호를 입력하세요'
              },
              stringLength: {
                min: 6,
                message: '사내 회원 비밀번호를 입력해주세요(6글자 이상)'
              }
            }
          },
          'confirm-password': {
            validators: {
              notEmpty: {
                message: '비밀번호를 확인해주세요'
              },
              identical: {
                compare: () => formAuthentication.querySelector('[name="password"]').value,
                message: '비밀번호가 맞지 않습니다'
              },
              stringLength: {
                min: 6,
                message: '비밀번호는 최소 6글자 이상입니다'
              }
            }
          },
          terms: {
            validators: {
              notEmpty: {
                message: '약관에 동의해주세요'
              }
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap5: new FormValidation.plugins.Bootstrap5({
            eleValidClass: '',
            rowSelector: '.form-control-validation'
          }),
          submitButton: new FormValidation.plugins.SubmitButton(),
          defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
          autoFocus: new FormValidation.plugins.AutoFocus()
        },
        init: instance => {
          instance.on('plugins.message.placed', e => {
            if (e.element.parentElement.classList.contains('input-group')) {
              e.element.parentElement.insertAdjacentElement('afterend', e.messageElement);
            }
          });
        }
      });
    }

    // Two Steps Verification for numeral input mask
    const numeralMaskElements = document.querySelectorAll('.numeral-mask');

    // Format function for numeral mask
    const formatNumeral = value => value.replace(/\D/g, ''); // Only keep digits

    if (numeralMaskElements.length > 0) {
      numeralMaskElements.forEach(numeralMaskEl => {
        numeralMaskEl.addEventListener('input', event => {
          numeralMaskEl.value = formatNumeral(event.target.value);
        });
      });
    }

    // 로그인 실패 안내
    // Modal id
  const appModal = document.getElementById('createApp');

  // Credit Card
  const creditCardMask1 = document.querySelector('.app-credit-card-mask'),
    expiryDateMask1 = document.querySelector('.app-expiry-date-mask'),
    cvvMask1 = document.querySelector('.app-cvv-code-mask');
  let cleave;

  // Cleave JS card Mask
  setTimeout(() => {
    if (creditCardMask1) {
      creditCardMask1.addEventListener('input', event => {
        let cleanValue = event.target.value.replace(/\D/g, '');
        let cardType = getCreditCardType(cleanValue);
        creditCardMask1.value = formatCreditCard(cleanValue);
        if (cardType && cardType !== 'unknown' && cardType !== 'general') {
          document.querySelector('.app-card-type').innerHTML =
            `<img src="${assetsPath}img/icons/payments/${cardType}-cc.png" height="20"/>`;
        } else {
          document.querySelector('.app-card-type').innerHTML = '';
        }
      });

      registerCursorTracker({
        input: creditCardMask1,
        delimiter: ' '
      });
    }
  }, 200);

  // Expiry Date Mask
  if (expiryDateMask1) {
    expiryDateMask1.addEventListener('input', event => {
      expiryDateMask1.value = formatDate(event.target.value, {
        delimiter: '/',
        datePattern: ['m', 'y']
      });
    });
    registerCursorTracker({
      input: expiryDateMask1,
      delimiter: '/'
    });
  }

  // CVV
  if (cvvMask1) {
    cvvMask1.addEventListener('input', event => {
      const cleanValue = event.target.value.replace(/\D/g, '');
      cvvMask1.value = formatNumeral(cleanValue, {
        numeral: true,
        numeralPositiveOnly: true
      });
    });
  }
  appModal.addEventListener('show.bs.modal', function (event) {
    const wizardCreateApp = document.querySelector('#wizard-create-app');
    if (typeof wizardCreateApp !== undefined && wizardCreateApp !== null) {
      // Wizard next prev button
      const wizardCreateAppNextList = [].slice.call(wizardCreateApp.querySelectorAll('.btn-next'));
      const wizardCreateAppPrevList = [].slice.call(wizardCreateApp.querySelectorAll('.btn-prev'));
      const wizardCreateAppBtnSubmit = wizardCreateApp.querySelector('.btn-submit');

      const createAppStepper = new Stepper(wizardCreateApp, {
        linear: false
      });

      if (wizardCreateAppNextList) {
        wizardCreateAppNextList.forEach(wizardCreateAppNext => {
          wizardCreateAppNext.addEventListener('click', event => {
            createAppStepper.next();
          });
        });
      }
      if (wizardCreateAppPrevList) {
        wizardCreateAppPrevList.forEach(wizardCreateAppPrev => {
          wizardCreateAppPrev.addEventListener('click', event => {
            createAppStepper.previous();
          });
        });
      }

      if (wizardCreateAppBtnSubmit) {
        wizardCreateAppBtnSubmit.addEventListener('click', event => {
          alert('Submitted..!!');
        });
      }
    }

  })();
});
