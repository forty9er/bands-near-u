'use strict';

$('.modal').on('show.bs.modal', function () {
  $('.modal-content').css('height',$( window ).height()*0.8);
});