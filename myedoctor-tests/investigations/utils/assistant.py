from os import environ
from openai import OpenAI
import os

MODEL = "gpt-4-1106-preview"

class Assistant:
  def __init__(self) -> None:
    openai_api_key = os.environ.get('OPEN_AI_KEY')
    self.client = OpenAI(api_key='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')

  def get_response(self, input, tokens_max, new_temperature):
    response = self.client.chat.completions.create(
      model=MODEL,
      messages=[{"role": "user", "content" : input}],
      max_tokens= tokens_max,
      temperature=new_temperature,
    )
    return response.choices[0].message.content
  
  def extract_search_term(self, symptom_description):
    prompt = f"USING 1 WORD Identify only one health issue in the following sentence and respond just with it: {symptom_description}"
    return self.get_response(prompt, 25, .7)
  
  def translate_search_term(self, search_term):
    prompt = f"Translate the following term to Romanian and respond only with the term: {search_term}"
    return self.get_response(prompt, 50, .7)
  
  def translate_response(self, search_term):
    prompt = f"Translate this to ENGLISH: {search_term}"
    return self.get_response(prompt, 800, .7)
  
  def get_relevant_content(self, content, initial_symptom_description):
    prompt = f"Given the following symptom description provide only the best 5 relevant paragraphs and concatenate the text WITHOUT CHANGING IT: {initial_symptom_description}, please select the most relevant content from the following list: {content} and please adhere to the requirements mentioned in the beginning of the promt."
    response = self.get_response(prompt, 800, .8)
    # If there are structures like P1: or P2: remove them using a loop
    response = response.replace('P1:', '').replace('P2:', '').replace('P3:', '').replace('P4:', '').replace('P5:', '')
    # Replace the end of line characters with a space
    response = response.replace('\n', ' ')

    print('Initial response: ', response)

    translation = self.translate_response(response)
    return translation.strip()
