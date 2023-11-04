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
      if (data.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    },
    error: function () {
      $('div#api_status').removeClass('available');
    }
  });
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({amenities: Object.values(am)}),
    success: function (result) {
      for (const re of result) {
        const art = `<article> <div class="title_box"> <h2>${re.name}</h2> <div class="price_by_night">$${re.price_by_night}</div> </div> <div class="information"> <div class="max_guest">${re.max_guest} Guest(s)</div> <div class="number_rooms">${re.number_rooms} Bedroom(s)</div> <div class="number_bathrooms">${re.number_bathrooms} Bathroom(s)</div> </div> <div class="description"> ${re.description} </div> </article>`;
        $('SECTION.places').append(art);
      }
    },
    error: function (error) {
      console.log(error);
    }
  });
});
