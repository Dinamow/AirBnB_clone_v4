$(function () {
  const am = {};
  $("*[name='amenity']").change(function () {
    if ($(this).is(':checked')) { am[$(this).attr('data-name')] = $(this).attr('data-id'); } else delete am[$(this).attr('data-name')];
    const objNames = Object.keys(am);
    $('.amenities h4').text(objNames.sort().join(', '));
  });
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    method: 'GET',
    success: function (data) {
      if (data.status === "OK") {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    },
    error: function () {
      $('div#api_status').removeClass('available');
    }
  });
});
