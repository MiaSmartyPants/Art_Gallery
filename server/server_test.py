import unittest
import requests
# *Functional test* to ensure images are present when endpoint is triggered
class ServerTest(unittest.TestCase):

    def test_generate_images(self):
        # Define the URL for the POST request
        url = 'http://localhost:3001/generate-images'

        # Define the payload for the POST request
        payload = {
            'prompt': 'sunset over mountains'
        }

        # Send the POST request
        response = requests.post(url, json=payload)
        
        # Check that the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Get the response data
        data = response.json()

        # Check that the response contains the 'images' key
        self.assertIn('images', data)

        # Check that the 'images' list contains at least one item
        self.assertGreater(len(data['images']), 0)

        # Print the first image data to verify it visually (optional)
        print(data['images'][0])

if __name__ == '__main__':
    unittest.main()
