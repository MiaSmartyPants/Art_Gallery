import unittest
import requests
# *Functional test* to ensure images are present when endpoint is triggered
class ServerTest(unittest.TestCase):

    def test_generate_images(self):
        url = 'http://localhost:3001/generate-images'

        payload = {
            'prompt': 'sunset over mountains'
        }
        response = requests.post(url, json=payload)
        
        self.assertEqual(response.status_code, 200)
        data = response.json()

        self.assertIn('images', data)

        self.assertGreater(len(data['images']), 0)

        print(data['images'][0])

if __name__ == '__main__':
    unittest.main()
