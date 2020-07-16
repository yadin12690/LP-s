const $ = jQuery;

$(document).ready(function() {
    $('.sticky_form_section').css("display", "block");
    $('.download_btn').css("display", "none");

    //==============================
    // Form RegEx & Validation
    //==============================
    var assetsUrl = "https://digitalskills.miami.edu/";
    // $('head').append('<link rel="stylesheet" href="'+ assetsUrl +'css/animate.css" type="text/css" />');

    var nameReg = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i; // https://www.regextester.com/93648
    var phoneReg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    $('input').on('focusin', function () {
        $(this).removeClass('error');
    });



    $("form").submit(function () {
        var formId = '#' + $(this).attr('id');

        //   $(formId + ' .submit').after('<div class="submit-animate"><img src="'+ assetsUrl +'img/ajax-loader.gif"></div>');

        $('.formfeild').removeClass('error');
        $('.submit-animate').show();

        var isValid = true;

        var nf = $(formId + ' ' + "input[name = 'fullname']");
        var pf = $(formId + ' ' + "input[name = 'phone']");
        var ef = $(formId + ' ' + "input[name = 'email']");

        var name = nf.val().trim();
        var phone = pf.val().trim().replace(" ", "");
        var email = ef.val().trim();




        if (!phoneReg.test(phone)) {
            isValid = false;
            setTimeout(function () {
                $(pf).val('').addClass('error').attr('placeholder',
                    '* Valid phone required').css('color','red');
            }, 500);

        }

        if (phoneReg.test(phone)) {
            $.ajax({
                type: "POST",
                async: false,
                url: assetsUrl + "vendor/twilio_valid.php",
                data: {
                    tel: phone
                },
                success: function (response) {
                    console.log('success ' + response);
                    if (response != 'US') {
                        isValid = false;
                        setTimeout(function () {
                            $(pf).val('').addClass('error').attr('placeholder',
                                '* US phone number required');
                        }, 500);
                    }
                },
                error: function (response) {
                    // console.log(response.status)
                    if (response.status === 404) {
                        isValid = false;
                        setTimeout(function () {
                            $(pf).val('').addClass('error').attr('placeholder',
                                '* Valid phone required');
                        }, 500);
                    }
                }
            });
        }

        if (name.length < 2 || name.length > 50) {
            isValid = false;
            setTimeout(function () {
                $(nf).val('').addClass('error').attr('placeholder', '* Valid name required');
            }, 500);
        }

        if (!email || !emailReg.test(email)) {
            isValid = false;
            setTimeout(function () {
                $(ef).val('').addClass('error').attr('placeholder',
                    '* Valid email required');
            }, 500);
        }


        if (isValid == true) {
            // $(formId + ' .submit').addClass('submit-send').val('Sending...');
            dataLayer.push({
                'event': formId + '-steph'
            });
            return true;
        } else {
            setTimeout(function () {
                //   $('.submit-animate').remove();  was hidden before.
            }, 500);
            return false;
        }


        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true
        })


    });

    // $('.students__wrapper-box').bind("click", ToggleDisplay);
    // const iframeHTML = (embedCode) => {
    //     return `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${embedCode}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    // }

    // function ToggleDisplay(e) {
    //     console.log('the target',e.target);
    //     console.log('the parent', e.target.closest('.students__wrapper-box'));
    //     console.log('the url', e.target.closest('.students__wrapper-box').dataset.url);
    //     let embedCode = e.target.closest('.students__wrapper-box').dataset.url;
    //     display(embedCode);
    // }

    // function display(embedCode) {
    //     if ($(".popup").children().length > 0) {
    //         $(".popup").fadeIn(500, function () {
    //             $('.popup__video').html(iframeHTML(embedCode))
    //             $(document).bind("click", function (event) {
    //                 hide(event);
    //             });
    //         });
    //     }
    // }

    // function hide(event) {
    //     if (event.target.className.includes('popup') === false) {
    //         $('.popup__video').html('');
    //         $(".popup").fadeOut(500, function () {
    //             $(document).unbind("click");
    //         })
    //     }
    // }
    /* END POPUP */


    // $(document).scroll(function () {
        
    //     let y = $(this).scrollTop();
    //     if ( y < (document.body.offsetHeight - 1500)) {
    //         $('.sticky_form_section').fadeIn('slow');
    //         $('.close').fadeIn('slow');
    //     } else {
    //         $('.sticky_form_section').fadeOut('slow');
    //         $('.close').fadeOut('slow');
    //     }
    // });

    // $('.close').click(function(){
    //     $('.sticky_container').css("display", "none");
    //     $('.close').css("display", "none");
    //     $('.download_btn').css("display", "block");
    // })

    // $('.download_btn').click(function(){
    //     $('.sticky_container').fadeIn();
    //     $('.close').css("display", "block");
    //     $('.download_btn').css("display", "none");
    // })

    $(document).scroll(function () {
        const mq = window.matchMedia( "(max-width: 768px)" );


        let y = $(this).scrollTop();
        if ( y < (document.body.offsetHeight - 1500)) {
            $('.sticky_form_section').fadeIn('slow');

            if(mq.matches) {
                $('.close').fadeIn('slow');
            } else {
                $('.close').fadeOut('slow');
            }

        } else {
            $('.sticky_form_section').fadeOut('slow');
            $('.close').fadeOut('slow');
        }
    });

    $('.close').click(function(){
        $('.sticky_container').css("display", "none");
        $('.close').css("display", "none");
        $('.download_btn').css("display", "block");
    })

    $('.download_btn').click(function(){
        $('.sticky_container').fadeIn();
        $('.close').css("display", "block");
        $('.download_btn').css("display", "none");
    });

    $('.close_cooc').click(function (e) {
        $('.cockie_section').css("display", "none");
     });
});