import requests
from bs4 import BeautifulSoup, NavigableString
import os


class ContentGenerator:
    def __init__(self, url):
        self.base_url = url
        self.openai_api_key = os.getenv("OPENAI_API_KEY")
        self.search_query_instruction = "Give only a list of keywords and no additional information."
        self.search_query_promt_beginning = "Given the following text break it down into a list of keywords not separated by a comma: "

        self.get_relevant_content_instruction = "Provide just the list of paragraphs in the form 'P1, P5, 68' or something similar."
        self.get_relevant_content_beginning = "Given the following text break it down into a list of paragraphs not separated by a comma in like P1, P3, P5: "

    # Function to check if an element is a leaf
    def is_leaf(self, element):
        return not any(isinstance(child, NavigableString) and child.strip() == '' for child in element.contents)
    
    def get_search_query(self, syntom_description):
        result = ''
        # TODO: OpenAI API call

        prompt = f"{query}\n\n{instruction}"
        response = openai.Completion.create(
            model="text-davinci-004",  # Assuming GPT-4 model is "text-davinci-004"
            prompt=prompt,
            max_tokens=150,  # Adjust as needed
            temperature=0.7  # Adjust for creativity level
        )
        
        return response.choices[0].text.strip()

        return result
    
    def get_query_results(self, search_query_url):
        url = self.base_url + search_query_url
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

    def get_relevant_content(self, content):
        # TODO: OpenAI API call
        pass

    def choose_best_content(self, content_list):
        return content_list[0]

    def get_content(self, user_syntom_description):
        search_query = self.get_search_query(user_syntom_description)
        search_results = self.get_query_results(search_query)
        content_list = []
        for search_result in search_results:
            content = self.get_content_for_url(search_result)
            content_list.append(content)
        relevant_content = self.get_relevant_content(content_list)
        return self.choose_best_content(relevant_content)
 

# import requests
# from bs4 import BeautifulSoup

# # URL of the page to scrape
# url = "https://www.reginamaria.ro/rezultate-cautare/dureri%20de%20burta"

# # Send a GET request to the URL
# response = requests.get(url)

# # Parse the HTML content of the page
# soup = BeautifulSoup(response.content, 'html.parser')

# # Find the article elements
# articles = soup.find_all('article', class_='node node--type-article node--view-mode-article-card clearfix', limit=3)

# # Extract and print the links from each article
# for article in articles:
#     link = article.find('a')
#     if link and link.has_attr('href'):
#         print(link['href'])


# import requests
# from bs4 import BeautifulSoup, NavigableString

# url = "https://www.reginamaria.ro/articole-medicale/sport-dupa-ce-ai-nascut-cum-sa-incepi"

# # Send a GET request to the URL
# response = requests.get(url)

# # Parse the HTML content
# soup = BeautifulSoup(response.content, 'html.parser')

# def is_leaf(element):
#     return not any(isinstance(child, NavigableString) and child.strip() == '' for child in element.contents)
    


# # Find all leaf elements
# leaf_texts = []
# for element in soup.find_all(string=lambda text: isinstance(text, NavigableString)):
#     parent = element.parent
#     if parent and is_leaf(parent):
#         current_element = element.strip()
#         # Exclude elements that contain [ or {
#         if '[' in current_element or '{' in current_element:
#             continue

#         if len(current_element) > 150:
#             leaf_texts.append(current_element)  # Truncate to 100 characters

# # Print all leaf texts
# for i, text in enumerate(leaf_texts, start=1):
#     print(f"Leaf {i}: {text}")
