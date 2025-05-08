<script>
    // Check if there's a 'hash' in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const hash = urlParams.get('hash');  // Get the 'hash' from the URL

    if (hash) {
        // Linkvertise API URL
        const apiUrl = `https://publisher.linkvertise.com/api/v1/anti_bypassing?token=d05d2b0e7c867c569a0c86a2c4c2559a851eaa8f1f905b5f61b70daab5e8f7ef&hash=${hash}`;

        // Send the POST request to validate the hash
        fetch(apiUrl, {
            method: 'POST',
        })
        .then(response => response.json())  // Parse the response as JSON
        .then(data => {
            if (data.status === 'success') {
                // If the hash is validated, show the "ACCESS MAIN SITE" message
                document.getElementById('page-content').innerHTML = `
                    <h2>ACCESS MAIN SITE</h2>
                    <a href="https://app.genn.lu/auth/pharaohbe4m" target="_blank" style="font-size: 18px; color: green;">
                        Click here to access the main site
                    </a>
                `;
            } else {
                // If validation fails, show an error message
                document.getElementById('page-content').innerHTML = `
                    <h2>Error: Invalid Hash</h2>
                    <p>The hash provided is not valid. Please try again.</p>
                `;
            }
        })
        .catch(error => {
            // If there's an error with the fetch request
            console.error('Error validating hash:', error);
            document.getElementById('page-content').innerHTML = `
                <h2>Error: Something went wrong</h2>
                <p>There was an error processing the hash. Please try again later.</p>
            `;
        });
    }
</script>
