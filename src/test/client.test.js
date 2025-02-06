global.fetch = require('node-fetch');
// Mock the DOM before requiring app.js
document.body.innerHTML = `
  <form id="travel-form">
    <input id="destination" value="Paris" />
    <input id="departure-date" value="2025-01-01" />
    <button type="submit">Submit</button>
  </form>
  <div id="results"></div>
`;

// Use node-fetch as a polyfill
global.fetch = require('node-fetch');

const { handleSubmit } = require('../client/js/app'); // Adjust the path to your app.js

describe('Client JavaScript', () => {
  it('should handle form submission', async () => {
    // Trigger the form submission
    document.getElementById('travel-form').dispatchEvent(new Event('submit'));

    // Wait for the async code to complete
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Optionally, check if the results element was updated
    const results = document.getElementById('results');
    expect(results.innerHTML).toBe('<p>Loading...</p>');
  });
});