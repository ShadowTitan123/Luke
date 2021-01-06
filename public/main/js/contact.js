$(document).ready(function () {

  (function ($) {
    "use strict";

    jQuery.validator.addMethod(
      "answercheck",
      function (value, element) {
        return this.optional(element) || /^\bcat\b$/.test(value);
      },
      "type the correct answer -_-"
    );

    // validate contactForm form
    $(function () {
      $("#contactForm").validate({
        rules: {
          name: {
            required: true,
            minlength: 4,
          },
          subject: {
            required: true,
            minlength: 6,
          },
          number: {
            required: true,
            minlength: 5,
          },
          email: {
            required: true,
            email: true,
          },
          message: {
            required: true,
            minlength: 20,
          },
        },
        messages: {
          name: {
            required: "enter a valid full name",
            minlength: "your name must consist of at least 4 characters",
          },
          subject: {
            required: "enter a valid subject",
            minlength: "your subject must consist of at least 6 characters",
          },
          number: {
            required: "enter a valid mobile number",
            minlength: "your number must consist of at least 5 characters",
          },
          email: {
            required: "enter a valid email address",
          },
          message: {
            required: "enter a valid message to send this form.",
            minlength: "your message must consist of atleast 10 characters",
          },
        },
      });
    });

    (function ($) {
      
    });
  })(jQuery);
});
