jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる

  // ハンバーガーメニュー
  $("#js-hamburger").click(function () {
    $("body").toggleClass("is-open");
    if ($(this).attr("aria-expanded") == "false") {
      $(this).attr("aria-expanded", "true");
      $("#js-sp-nav").attr("aria-hidden", "false");
    } else {
      $(this).attr("aria-expanded", "false");
      $("#js-sp-nav").attr("aria-hidden", "true");
    }
  });

  // ハンバーガーメニューアンカーリンク
  $(".js-sp-nav-item a").click(function () {
    $("body").removeClass("is-open");
    $("#js-hamburger").attr("aria-expanded", "false");
    $("#js-sp-nav").attr("aria-hidden", "true");
  });

  // スムーススクロール
  $(function () {
    const headerHeight = $("#js-header").outerHeight();
    $('a[href^="#"]').click(function () {
      const speed = 600;
      let href = $(this).attr("href");
      let target = $(href == "#" || href == "" ? "html" : href);
      let position = target.offset().top - headerHeight;
      $("body,html").animate({ scrollTop: position }, speed, "swing");
      return false;
    });
  });

  // モーダル
  var dialogOpenButtons = document.querySelectorAll(".js-modal-open");
  var dialogCloseButtons = document.querySelectorAll(".js-modal-close");

  dialogOpenButtons.forEach(function (button) {
    var dialog = document.querySelector(button.dataset.dialog);
    var openDelay = 100;
    button.addEventListener("click", function (e) {
      e.preventDefault();
      setTimeout(function () {
        dialog.showModal();
        document.body.classList.add("modal-open");
      }, openDelay);
    });
  });

  dialogCloseButtons.forEach(function (button) {
    var dialog = button.closest("dialog");
    var closeDelay = 100;
    button.addEventListener("click", function (e) {
      e.preventDefault();
      setTimeout(function () {
        dialog.close();
        document.body.classList.remove("modal-open");
      }, closeDelay);
    });
  });

  // about-swiper
  function cloneAndAppend(element, swiperWrap) {
    let clonedElement = element.cloneNode(true);
    swiperWrap.appendChild(clonedElement);
  }

  const swiperWrap = document.querySelector("#js-swiper-wrap");
  const swiperSlides = swiperWrap.querySelectorAll(".p-about-slide");

  for (let swiperSlide of swiperSlides) {
    cloneAndAppend(swiperSlide, swiperWrap);
  }

  const swiper = new Swiper(".p-about-swiper", {
    loop: true,
    slidesPerView: "auto",
    speed: 6000,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
    },
    on: {
      slideChangeTransitionEnd: function () {
        if (this.realIndex === 0) {
          this.autoplay.stop();
          this.slideToLoop(0, 0, false);
          this.autoplay.start();
        }
      },
    },
  });

  // アコーディオン
  $(function () {
    $(".qa-box:first-of-type .qa-box__bottom").css("display", "block");
    $(".qa-box:first-of-type .qa-box__top").addClass("is-open");
    $(".js-accordion").on("click", function () {
      $(this).next().slideToggle(300);
      $(this).toggleClass("is-open");
    });
  });

  // p-spot-swiper
  const spotsSwiper = new Swiper(".p-spot-swiper", {
    loop: true,
    slidesPerView: 1.55,
    spaceBetween: 16,
    centeredSlides: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      500: {
        slidesPerView: 1.7,
        spaceBetween: 16,
        centeredSlides: true,
      },
      600: {
        slidesPerView: 1.9,
        spaceBetween: 16,
        centeredSlides: true,
      },
      700: {
        slidesPerView: 2.3,
        spaceBetween: 16,
        centeredSlides: true,
      },
      900: {
        slidesPerView: 2.7,
        spaceBetween: 16,
        centeredSlides: false,
      },
      1200: {
        slidesPerView: 3.2,
        spaceBetween: 32,
        centeredSlides: false,
      },
    },
  });

  // コンタクトフォーム
  $(function () {
    // 一度入力して入力内容が消えた場合に背景色を変更
    $(".js-form-input").on("input", function () {
      if ($(this).val().trim() === "") {
        $(this).css({
          outline: "1px solid #ce2073",
          "background-color": "#ffcccc",
        });
      } else {
        $(this).css({
          outline: "",
          "background-color": "", // デフォルトの背景色
        });
      }
    });

    $("#submit-btn").on("click", function (event) {
      event.preventDefault(); // ボタンのデフォルトの動作（リンク先への遷移）をキャンセル

      let allInputsValid = true;

      // フォームの入力値を取得してバリデーション
      $(".js-form-input").each(function () {
        let input = $(this)[0]; // DOM要素にアクセス
        // フォーカスを当ててvalidationMessageを設定
        input.focus();
        input.blur();
        if (!input.checkValidity()) {
          // バリデーションエラーがある場合
          allInputsValid = false;
          $(this).css({
            outline: "1px solid #ce2073",
            "background-color": "#ffcccc",
          });
          // エラーメッセージを設定
          $(this).next(".error-message").text(input.validationMessage);
          console.log(input.validationMessage);
        } else {
          // バリデーションエラーがない場合
          $(this).css({
            outline: "",
            "background-color": "", // デフォルトの背景色
          });
          $(this).next(".error-message").text("");
        }
        07044820343;
      });

      // チェックボックスのバリデーション
      let checkbox = $(".p-form__check")[0];
      if (!checkbox.checkValidity()) {
        allInputsValid = false;
        $(checkbox)
          .closest("label")
          .next(".error-message")
          .text(checkbox.validationMessage);
        console.log(checkbox.validationMessage);
      } else {
        $(checkbox).closest("label").next(".error-message").text("");
      }

      // 全ての入力が有効であれば成功アラートを表示
      if (allInputsValid) {
        alert("送信成功しました！");
      }
    });
  });

  // ふわっと表示
  $(function () {
    $(".js-fadeUp").on("inview", function () {
      $(this).addClass("is-inview");
    });
  });

  // ページトップボタンの表示設定
  $(function () {
    if ($(window).width() >= 768) {
      $(".js-pagetop").hide();
      $(window).on("scroll", function () {
        if ($(this).scrollTop() > 300) {
          $(".js-pagetop").fadeIn(300);
        } else {
          $(".js-pagetop").fadeOut(400);
        }
      });
    }
  });
});
