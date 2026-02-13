# Pricing Estimator API Integration Guide

The pricing estimator feature in this application requires an API key from a real estate data provider to fetch the square footage of a property based on its address. This guide will walk you through the process of obtaining an API key and integrating it into the application.

## 1. Choose a Real Estate Data Provider

There are several services that provide APIs for real estate data. Some popular options include:

- **ATTOM Data Solutions:** A comprehensive provider of property and neighborhood data.
- **Zillow API:** The Zillow API provides access to a wide range of real estate data, including property details and valuations. (Note: Zillow's API access may have restrictions, so be sure to review their terms of service).
- **RealtyMole:** Offers a simple and affordable API for property data.

Choose a provider that best fits your needs and budget, and sign up for an API key.

## 2. Store Your API Key in Environment Variables

Once you have your API key, you need to store it securely in your application's environment variables. This prevents your API key from being exposed in your client-side code.

1.  Create a new file named `.env` in the `frontend` directory of your project.
2.  Add the following line to the `.env` file, replacing `YOUR_API_KEY` with your actual API key:

    ```
    VITE_APP_REAL_ESTATE_API_KEY=YOUR_API_KEY
    ```

    **Important:** The `VITE_` prefix is required for Vite to expose the environment variable to your client-side code.

## 3. Update the PricingEstimator Component

Now you need to modify the `PricingEstimator.tsx` component to use your API key and make a real API call.

1.  Open the `frontend/src/components/PricingEstimator.tsx` file.
2.  Locate the `handleEstimate` function. You will see a `setTimeout` function that simulates an API call. You need to replace this with a real `fetch` call to your chosen API provider.

    Here is an example of how you might modify the code to use the `fetch` API:

    ```javascript
    const handleEstimate = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://api.realestatedata.com/v1/property?address=${encodeURIComponent(address)}&apiKey=${import.meta.env.VITE_APP_REAL_ESTATE_API_KEY}`);
        if (!response.ok) {
          throw new Error('Could not retrieve property data.');
        }
        const data = await response.json();
        const sqFt = data.property.squareFootage;
        setSquareFootage(sqFt);
        const price = sqFt - 500;
        setEstimatedPrice(Math.max(price, 250)); // Set a minimum price of $250
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    ```

    **Note:** The exact URL and the structure of the response will vary depending on the API provider you choose. Be sure to consult the provider's documentation for the correct API endpoint and response format.

## 4. Test the Integration

Once you have updated the `PricingEstimator.tsx` component, you can test the integration by running the application and entering an address in the pricing estimator. If the integration is successful, you should see the estimated price based on the square footage of the property.

If you encounter any issues, check the browser's console for any error messages. You can also add `console.log` statements to the `PricingEstimator.tsx` component to debug the API call and response.
