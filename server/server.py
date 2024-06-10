from flask import Flask, request, jsonify
from flask_cors import CORS
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import base64
import logging
import time
import requests

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

@app.route('/generate-images', methods=['POST'])
def generate_images():
    data = request.get_json()
    prompt = data.get('prompt')

    if not prompt:
        logging.error('No prompt provided in the request.')
        return jsonify({'error': 'No prompt provided.'}), 400

    options = Options()
    # options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')

    service = ChromeService(executable_path='../chromedriver-mac-x64/chromedriver')

    driver = None
    try:
        logging.info('Creating WebDriver...')
        driver = webdriver.Chrome(service=service, options=options)
        logging.info('WebDriver created successfully.')

        logging.info('Opening Craiyon website...')
        driver.get('https://www.craiyon.com')
        logging.info('Craiyon website opened.')

        logging.info('Waiting for Cloudflare challenge to complete...')
        time.sleep(10)  # This should be replaced with more robust handling if possible
        logging.info('Waited for Cloudflare challenge.')

        logging.info('Finding search input...')
        wait = WebDriverWait(driver, 20)
        search_input = wait.until(EC.element_to_be_clickable((By.ID, 'prompt')))
        logging.info('Search input found.')

        logging.info(f'Sending prompt: {prompt}')
        driver.execute_script("arguments[0].scrollIntoView(true);", search_input)
        search_input.click()
        search_input.send_keys(prompt)

        logging.info('Clicking the Draw button...')
        draw_button = wait.until(EC.element_to_be_clickable((By.ID, 'generateButton')))
        draw_button.click()
        logging.info('Draw button clicked.')

        logging.info('Waiting for images to load...')
        time.sleep(75)
        images = wait.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'img.h-full.w-full.object-cover.object-center'))
        )
        logging.info(f'{len(images)} images found.')

        image_data = []
        for i, img in enumerate(images):
            if i >= 8:
                break

            src = img.get_attribute('src')
            if src:
                logging.info(f'Image SRC: {src}')
                if src.startswith('data:image'):
                    image_data.append(src)
                else:
                    response = requests.get(src)
                    if response.status_code == 200:
                        image_data.append(f'data:image/jpeg;base64,{base64.b64encode(response.content).decode()}')
                    else:
                        logging.error(f'Failed to download image from {src}')
            else:
                logging.warning('Image element does not have a src attribute.')

        logging.info('Images extracted successfully.')
        return jsonify({'images': image_data})

    except Exception as e:
        logging.error(f'An error occurred: {str(e)}')
        if driver:
            logging.debug('Page source for debugging:')
            logging.debug(driver.page_source)  # Print the page source for debugging
        return str(e), 500

    finally:
        if driver:
            driver.quit()
            logging.info('WebDriver closed.')

if __name__ == '__main__':
    app.run(port=3001)
