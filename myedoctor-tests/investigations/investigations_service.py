from investigations.mongodb import MongoDBConnection
from investigations.utils.content_generator import ContentGenerator


class InvestigationsService:
  def __init__(self):
    self.db = MongoDBConnection()
    self.db.connect()
    self.investigations = self.db.db['investigations']
    self.content_generator = ContentGenerator()

  def add_investigation(self, investigation):
    result = self.content_generator.get_content(investigation.get('question'))
    print(f"Content rasp: {str(result)}")
    return result
    # result = self.investigations.insert_one(investigation)
    # return result.inserted_id

