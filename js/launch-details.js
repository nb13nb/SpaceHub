document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const launchId = urlParams.get('id');

    if (launchId) {
        fetch(`https://api.spacexdata.com/v4/launches/${launchId}`)
            .then(response => response.json())
            .then(data => populateLaunchDetails(data))
            .catch(err => console.error('Failed to fetch launch details:', err));
    } else {
        console.error('Error');
    }
});

function populateLaunchDetails(launch) {
    document.querySelector('#launch-details h2').innerText = launch.name || 'No title available';
    document.querySelector('#launch-image').src = launch.links.patch.large || 'No Image found';
    document.querySelector('#launch-image').alt = launch.name || 'No title available';
    document.querySelector('#launch-description').innerText = launch.details || 'No description available.';
    document.querySelector('#launch-date').innerText = launch.date_utc ? new Date(launch.date_utc).toLocaleDateString() : 'No date available';

    if (launch.launchpad) {
        fetch(`https://api.spacexdata.com/v4/launchpads/${launch.launchpad}`)
            .then(response => response.json())
            .then(data => {
                document.querySelector('#launch-location').innerText = data.name || 'No location name available';
            })
            .catch(err => console.error('Failed to fetch launchpad details:', err));
    } else {
        document.querySelector('#launch-location').innerText = 'No location available';
    }

    if (launch.rocket) {
        fetch(`https://api.spacexdata.com/v4/rockets/${launch.rocket}`)
            .then(response => response.json())
            .then(data => {
                document.querySelector('#launch-vehicle').innerText = data.name || 'No vehicle name available';
            })
            .catch(err => console.error('Failed to fetch rocket details:', err));
    } else {
        document.querySelector('#launch-vehicle').innerText = 'No vehicle available';
    }
}
