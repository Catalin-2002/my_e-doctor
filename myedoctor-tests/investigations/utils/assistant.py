from os import environ
from openai import OpenAI

MODEL = "gpt-3.5-turbo"

class Assistant:
  def __init__(self) -> None:
    # TODO ADD API KEY
    openai_api_key = ""
    print(openai_api_key)
    self.client = OpenAI(api_key=openai_api_key)

  def get_response(self, input):
    response = self.client.chat.completions.create(
      model=MODEL,
      messages=[{"role": "user", "content" : input}],
      max_tokens=150,
      temperature=.7
    )
    print(response.choices[0])
    return response.choices[0].message.content
  
  def extract_search_term(self, symptom_description):
    prompt = f"Identify only one health issue in the following sentence and respond just with it: {symptom_description}"
    return self.get_response(prompt)
  
  def translate_search_term(self, search_term):
    prompt = f"Translate the following term to Romanian and respond only with the term: {search_term}"
    return self.get_response(prompt)
  
