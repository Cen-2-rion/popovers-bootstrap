/* global $ jQuery */
$(function () {
  $('[data-toggle="popover"]').popover();
  $(".popover-dismiss").popover({
    trigger: "focus",
  });
  $(document).on("click", (e) => {
    if (!$(e.target).closest(".popover").length) {
      $(".popover").popover("hide");
    }
  });
});
