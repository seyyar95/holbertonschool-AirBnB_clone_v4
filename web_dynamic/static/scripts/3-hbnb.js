// $(document).ready(init);

// function init() {
//     const amenityObj = {};
//     $('.amenities .popover input').change(function () {
//         if ($(this).is(':checked')) {
//             amenityObj[$(this).attr('data-name')] = $(this).attr('data-id');
//         } else if ($(this).is(':not(:checked)')) {
//             delete amenityObj[$(this).attr('data-name')];
//         }
//         const names = Object.keys(amenityObj);
//         $('.amenities h4').text(names.sort().join(', '));
//     });

//     getApi();
//     postRequest();
// }

// function getApi() {
//     $.getJSON('http://127.0.0.1:5001/api/v1/places_search/', function (data) {
//         console.log('getApi');
//         if (data.status === 'OK') {
//             $('#api_status').addClass('available');
//         } else {
//             $('#api_status').removeClass('available');
//         }
//     });
// }

// function postRequest() {
//     $.ajax({
//         type: 'POST',
//         url: 'http://127.0.0.1:5001/api/v1/places_search/',
//         data: '{}',
//         dataType: 'json',
//         contentType: 'application/json',
//         success: function (data) {
//             $('SECTION.places').append(data.map(place => {
//                 return `<article>
//         <div class="title_box">
//           <h2>{{ place.name }}</h2>
//           <div class="price_by_night">${place.price_by_night }</div>
//         </div>
//         <div class="information">
//           <div class="max_guest">{ place.max_guest } Guest{% if place.max_guest != 1 %}s{% endif %}</div>
//           <div class="number_rooms">{{ place.number_rooms }} Bedroom{% if place.number_rooms != 1 %}s{% endif %}</div>
//           <div class="number_bathrooms">{{ place.number_bathrooms }} Bathroom{% if place.number_bathrooms != 1 %}s{% endif %}</div>
//         </div>
//         <div class="user">
//               <b>Owner:</b> {{ place.user.first_name }} {{ place.user.last_name }}
//             </div>
//             <div class="description">
//           {{ place.description | safe }}
//             </div>
//       </article>`
//             }));
//         }
//     });
// }

$(function () {
    const amenityIds = {};
  
    $('.amenities input[type=checkbox]').change(function () {
      if (this.checked) {
        amenityIds[$(this).data('name')] = $(this).data('id');
      } else {
        delete amenityIds[$(this).data('name')];
      }
  
      $('.amenities h4').text(Object.keys(amenityIds).join(', '));
    });
  
    const API_URL = 'http://127.0.0.1:5001/api/v1/status';
    $.get(API_URL, function (data, response) {
      if (response === 'success' && data.status === 'OK') {
        $('DIV#api_status').addClass('available');
      } else {
        $('DIV#api_status').removeClass('available');
      }
    });
  
    $.ajax({
      url: 'http://127.0.0.1:5001/api/v1/places_search/',
      method: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({}),
      success: function (data) {
        data.forEach(d => $('.places').append(addPlace(d)));
      }
    });
  
    function addPlace (place) {
      return `
      <article>
      <div class="title_box">
        <h2>${place.name}</h2>
        <div class="price_by_night">${place.price_by_night}
        </div>
        </div>
        <div class="information">
        <div class="max_guest">
        ${place.max_guest} Guest
        </div>
        <div class="number_rooms">${place.number_rooms} Bedroom
        </div>
        <div class="number_bathrooms">${place.number_bathrooms} Bathroom
        </div>
        </div>
        <div class="description">${place.description}
        </div>
        </article>
      `;
    }
  });