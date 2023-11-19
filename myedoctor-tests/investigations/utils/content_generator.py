import requests
from bs4 import BeautifulSoup, NavigableString
import os

from investigations.utils.assistant import Assistant

SOURCE_BASE_URL = "https://www.reginamaria.ro/"

class ContentGenerator:
    def __init__(self):
        self.base_url = SOURCE_BASE_URL

        self.assistant = Assistant()
    # Function to check if an element is a leaf
    def is_leaf(self, element):
        return not any(isinstance(child, NavigableString) and child.strip() == '' for child in element.contents)
    
    def get_search_query(self, symptom_description):
        print(symptom_description)
        extracted_term = self.assistant.extract_search_term(symptom_description)
        print("extracted term", extracted_term)
        translated_term = self.assistant.translate_search_term(extracted_term)

        return translated_term

    def get_query_results(self, search_query_url):
        # Make it to lowercase and add %20 between words
        search_query_url = search_query_url.lower().replace(' ', '%20')
        url = self.base_url + 'rezultate-cautare/' + search_query_url
        print('Mock url: ', url)
        response = requests.get(url)

        soup = BeautifulSoup(response.content, 'html.parser')
        articles = soup.find_all('article', class_='node node--type-article node--view-mode-article-card clearfix', limit=3)
        
        links = []
        for article in articles:
            link = article.find('a')
            if link and link.has_attr('href'):
                links.append(link['href'])

        return links

    def get_content_for_url(self, search_link):
        url = self.base_url + search_link
        print(url)
        response = requests.get(url)

        soup = BeautifulSoup(response.content, 'html.parser')
        content_text = ''
        for element in soup.find_all(string=lambda text: isinstance(text, NavigableString)):
            parent = element.parent
            if parent and self.is_leaf(parent):
                current_element = element.strip()
                # Exclude elements that contain [ or { to remove divs that were not previously removed
                if '[' in current_element or '{' in current_element:
                    continue

                if len(current_element) > 150:
                    content_text += 'P1: ' + current_element + '\n'

        return content_text

    def get_relevant_content(self, content, initial_symptom_description):
        get_relevant_content = self.assistant.get_relevant_content(content, initial_symptom_description)

        return get_relevant_content

    def choose_best_content(self, content_list):
        return content_list[0]

    def get_content(self, user_symptom_description):
        search_query = self.get_search_query(user_symptom_description)
        print(f"Search query: {search_query}")
        search_results = self.get_query_results(search_query)
        print(f"Search results: {str(search_results)}")


        content = self.get_content_for_url(search_results[0])
        relevant_content = self.get_relevant_content(content, user_symptom_description)
        return relevant_content, search_results[0]