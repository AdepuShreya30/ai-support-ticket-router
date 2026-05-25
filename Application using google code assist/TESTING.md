# Testing Strategy

This document outlines the test cases for the AI Support Ticket Router application to ensure its quality, reliability, and correctness.

## 1. Backend Unit Tests

Unit tests for the backend should be written using `pytest` and should mock the external API call to the Hugging Face Router to isolate the application's logic.

- **Tool:** `pytest` with `unittest.mock`.
- **Test Case 1: Valid High-Urgency Ticket**
  - **Input:** A ticket string like "My website is down and I am losing money every minute!"
  - **Mock:** Mock the `query_hf_router` function. The first call should return a JSON string: `{"category": "Technical Issue", "urgency": "High", "sentiment": "Negative"}`.
  - **Assert:** Verify that the `get_troubleshooting_prompt` function is used to generate the prompt for the second call.

- **Test Case 2: Valid Low-Urgency Ticket**
  - **Input:** A ticket string like "How do I reset my password?"
  - **Mock:** Mock the `query_hf_router` function. The first call should return a JSON string: `{"urgency": "Low"}`.
  - **Assert:** Verify that the `get_self_service_prompt` function is used to generate the prompt for the second call.

- **Test Case 3: Invalid Input from Frontend**
  - **Action:** Send a POST request to `/api/process-ticket` with a ticket string shorter than 10 characters.
  - **Assert:** The API should return a `422 Unprocessable Entity` status code with a descriptive error message.

- **Test Case 4: AI Fails to Return JSON**
  - **Input:** A valid ticket string.
  - **Mock:** Mock the `query_hf_router` function to return a non-JSON string like "I am sorry, I cannot help with that." for the analysis step.
  - **Assert:** The API should handle the `ValueError` and return a `500 Internal Server Error` with the detail "AI failed to generate a valid analysis."

## 2. Frontend Manual Tests

These tests verify the end-to-end user experience.

- **Test Case 1: Full High-Urgency Flow**
  - **Action:** Go to the frontend UI, enter "My payment gateway is broken and no customers can check out. This is an emergency!", and submit.
  - **Expected Result:** The UI should display an analysis with "Urgency: High". The "Generated Guidance" should contain immediate, actionable steps. The "Suggested Customer Email" should have a reassuring and urgent tone.

- **Test Case 2: Full Low-Urgency Flow**
  - **Action:** Enter "I have a question about my last invoice." and submit.
  - **Expected Result:** The UI should display "Urgency: Low" or "Medium". The "Generated Guidance" should provide links to a knowledge base or self-service portal. The "Suggested Customer Email" should have a helpful, standard tone.

- **Test Case 3: API Error Handling**
  - **Action:** Stop the backend server. Submit a ticket from the frontend.
  - **Expected Result:** The UI should display a clear error message in the error box, such as "An unexpected error occurred. Please try again later."