$(document).ready(function () {
  $("#informationClose").on("click", function () {
    $("#informationOverlay").removeClass("visible");
  });
});

function showLoader() {
  $("#loaderOverlay").fadeIn();
}

function hideLoader() {
  $("#loaderOverlay").fadeOut();
}

function showInfoSplash(message) {
  showMessageSplash(message, "info");
}

function showErrorSplash(message) {
  showMessageSplash(message, "error");
}

function showMessageSplash(message, type) {
  const $splashOverlay = $("#splashOverlay");
  const $splashContent = $("#splashContent");

  $splashContent.text(message);

  if (type === "error") {
    $splashContent.css("color", "red");
  } else {
    $splashContent.css("color", "black");
  }

  $splashOverlay.addClass("visible");

  setTimeout(() => {
    $splashOverlay.removeClass("visible");
  }, 2000);
}

function showInfo(messageArray) {
  showMessage(messageArray, "info");
}

function showError(messageArray) {
  showMessage(messageArray, "error");
}

function showMessage(messageArray, type) {
  const $informationOverlay = $("#informationOverlay");
  const $informationContent = $("#informationContent");

  $informationContent.empty();
  messageArray.forEach((line) => {
    $informationContent.append(`<p>${line}</p>`);
  });

  if (type === "error") {
    $informationContent.css("color", "red");
  } else {
    $informationContent.css("color", "black");
  }

  $informationOverlay.addClass("visible");
}
