// Gestione overlay filtro mobile/landscape per carrello.php
(function () {
  function updateCloseFilterAsideBtn() {
    var btn = document.getElementById("closeFilterAsideBtn");
    if (!btn) return;
    if (window.innerWidth <= 900) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  }
  function checkMobileFilterBtn() {
    var btn = document.getElementById("mobileFilterBtn");
    var aside = document.getElementById("filterSidebar");
    if (!btn || !aside) return;
    if (window.innerWidth <= 900) {
      btn.style.display = "flex";
      aside.style.display = "none";
    } else {
      btn.style.display = "none";
      aside.style.display = "";
      aside.style.position = "absolute";
      aside.style.top = "50vh";
      aside.style.left = "40px";
      aside.style.transform = "translateY(-50%)";
      aside.style.width = "";
      aside.style.maxWidth = "";
      aside.style.height = "";
      aside.style.boxShadow = "";
      aside.style.overflowY = "";
    }
  }
  function openFilterAside() {
    var aside = document.getElementById("filterSidebar");
    if (!aside) return;
    aside.style.display = "block";
    aside.style.position = "fixed";
    aside.style.top = "0";
    aside.style.right = "0";
    aside.style.left = "auto";
    aside.style.margin = "0";
    aside.style.zIndex = "1002";
    aside.style.width = "88vw";
    aside.style.maxWidth = "340px";
    aside.style.height = "100vh";
    aside.style.transform = "none";
    aside.style.boxShadow = "0 4px 24px rgba(0,0,0,0.18)";
    aside.style.overflowY = "auto";
  }
  function closeFilterAside() {
    var aside = document.getElementById("filterSidebar");
    if (!aside) return;
    aside.style.display = "none";
    aside.style.position = "";
    aside.style.top = "";
    aside.style.right = "";
    aside.style.left = "";
    aside.style.margin = "";
    aside.style.zIndex = "";
    aside.style.width = "";
    aside.style.maxWidth = "";
    aside.style.transform = "";
    aside.style.boxShadow = "";
    aside.style.overflowY = "";
    aside.style.height = "";
  }
  function handleMobileFilterBtnClick() {
    openFilterAside();
  }
  function handleCloseFilterAsideBtnClick() {
    closeFilterAside();
  }
  function handleDocumentClick(e) {
    var aside = document.getElementById("filterSidebar");
    var btn = document.getElementById("mobileFilterBtn");
    if (!aside || !btn) return;
    if (window.innerWidth <= 900 && aside.style.display === "block") {
      if (!aside.contains(e.target) && !btn.contains(e.target)) {
        closeFilterAside();
      }
    }
  }
  window.addEventListener("resize", updateCloseFilterAsideBtn);
  window.addEventListener("DOMContentLoaded", updateCloseFilterAsideBtn);
  window.addEventListener("resize", checkMobileFilterBtn);
  window.addEventListener("DOMContentLoaded", checkMobileFilterBtn);
  document.addEventListener("DOMContentLoaded", function () {
    var mobileBtn = document.getElementById("mobileFilterBtn");
    var closeBtn = document.getElementById("closeFilterAsideBtn");
    if (mobileBtn) {
      mobileBtn.addEventListener("click", handleMobileFilterBtnClick);
    }
    if (closeBtn) {
      closeBtn.addEventListener("click", handleCloseFilterAsideBtnClick);
    }
  });
  document.addEventListener("click", handleDocumentClick);
})();
