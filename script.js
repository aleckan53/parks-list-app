function generateUrl(params) {
    return Object.keys(params)
        .map(key =>
            `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
        )
        .join("&")
}

function getParksList(q, maxResults) {
    const api = 'V6am0sq9z5Ryh4HuzfxaSDqWaicvMH1aL9kjh9sC';
    const baseUrl = 'https://api.nps.gov/api/v1/parks';

    const options = {
        "api_key": api
    }

    const params = {
        stateCode: q,
        limit: maxResults || 10,
        start: 0,
        sort: "ascending"

    }
    const url = baseUrl + "?" + generateUrl(params)

    console.log(url);

    fetch(url, options)
        .then(res1 => {
            if (res1.ok) {
                return res1.json()
            }
            throw new Error(res1.statusText)
        })
        .then(res1JSON => generateList(res1JSON))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        })

}


function generateList(obj) {
    $('#results').empty();
    obj.data.forEach(park => {
        $('#results').append(`
            <li id="park">
                <h3>${park.fullName}</h3>
                <p>${park.description}</p>
                <a href="${park.url}">${park.url}</a>
                <p></p>
            </li>
        `)

        // getAddress(park.fullName)
        
    })

    $('#results').removeClass('hidden')
}

function watchForm() {
    $('form').submit(function (event) {
        event.preventDefault();
        getParksList($('#js-search-state').val(), $('#js-max-results').val())
    })
}

$(function () {
    watchForm();
})


// to improve
// function getAddress(name) {
//     const api = 'AIzaSyBx-Gz1CsU8Uof8Z965JX4kWpukb3qai60';
//     const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

//     const params = {
//         key: api,
//         address: name
//     }
//     const url = baseUrl + "?" + generateUrl(params)

//     fetch(url)
//         .then(res2 => {
//             if (res2.ok){
//                 return res2.json()          
//             }
//             throw new Error(res2.statusText)
//         })
//         .then(res2JSON => {
//             generateAddress(res2JSON)
//         })
//         .catch(err => {
//             $('#js-error-message').text(`Something went wrong: ${err.message}`);
//         })
// }

// function generateAddress(obj) {
//     console.log(obj.results[0].formatted_address);
//     return obj.results[0].formatted_address;

// }   


