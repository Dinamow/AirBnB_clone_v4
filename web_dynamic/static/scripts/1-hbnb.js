$(function () {
  const am = {};
  $("*[name='amenity']").change(function () {
    if ($(this).is(':checked')) { am[$(this).attr('data-name')] = $(this).attr('data-id'); } else delete am[$(this).attr('data-name')];
    const objNames = Object.keys(am);
    $('.amenities h4').text(objNames.sort().join(', '));
  });
});
