import { Investigation } from '@/src/types/investigation';
import { delay } from '../delay';
import { post, request } from './queryClient';

const mock = {
  content:
    "I'm sorry, but I can't generate specific paragraphs from external websites. However, I can provide you with some general information about stomachaches and back pain based on my training. \n\nStomachaches, also known as abdominal pain, can occur for various reasons. The discomfort can range from mild to severe and may be accompanied by bloating, cramping, nausea, or vomiting. Common causes of stomachaches include indigestion, gas, constipation, food poisoning, or stomach viruses. However, more serious conditions such as ulcers, gastritis, gallstones, or appendicitis can also lead to stomach pain. It's important to consult a healthcare professional for an accurate diagnosis and appropriate treatment.\n\nBack pain refers to discomfort or pain in the upper, middle, or lower back. It can be acute (lasting a few days to a few weeks) or chronic (lasting for more than three months). Common causes of back pain include muscle strains, poor posture, lifting heavy objects, or sudden awkward movements. Additionally, underlying conditions like herniated discs, spinal stenosis, arthritis, or osteoporosis may contribute to back pain. Treatment options for back pain vary depending on the cause and severity, ranging from rest, gentle exercises, and pain medications to physical therapy or surgical interventions if necessary.\n\nRemember, the information provided here is general in nature. It's always recommended to consult a healthcare professional or visit reliable medical websites for personalized advice and accurate information based on your specific symptoms and medical history.",
};
const mockInvestigations = [
  {
    createdAt: Date.now(),
    content:
      "I'm sorry, but I can't generate specific paragraphs from external websites. However, I can provide you with some general information about stomachaches and back pain based on my training. \n\nStomachaches, also known as abdominal pain, can occur for various reasons. The discomfort can range from mild to severe and may be accompanied by bloating, cramping, nausea, or vomiting. Common causes of stomachaches include indigestion, gas, constipation, food poisoning, or stomach viruses. However, more serious conditions such as ulcers, gastritis, gallstones, or appendicitis can also lead to stomach pain. It's important to consult a healthcare professional for an accurate diagnosis and appropriate treatment.\n\nBack pain refers to discomfort or pain in the upper, middle, or lower back. It can be acute (lasting a few days to a few weeks) or chronic (lasting for more than three months). Common causes of back pain include muscle strains, poor posture, lifting heavy objects, or sudden awkward movements. Additionally, underlying conditions like herniated discs, spinal stenosis, arthritis, or osteoporosis may contribute to back pain. Treatment options for back pain vary depending on the cause and severity, ranging from rest, gentle exercises, and pain medications to physical therapy or surgical interventions if necessary.\n\nRemember, the information provided here is general in nature. It's always recommended to consult a healthcare professional or visit reliable medical websites for personalized advice and accurate information based on your specific symptoms and medical history.",
  },
  {
    createdAt: Date.now(),
    content:
      "I'm sorry, but I can't generate specific paragraphs from external websites. However, I can provide you with some general information about stomachaches and back pain based on my training. \n\nStomachaches, also known as abdominal pain, can occur for various reasons. The discomfort can range from mild to severe and may be accompanied by bloating, cramping, nausea, or vomiting. Common causes of stomachaches include indigestion, gas, constipation, food poisoning, or stomach viruses. However, more serious conditions such as ulcers, gastritis, gallstones, or appendicitis can also lead to stomach pain. It's important to consult a healthcare professional for an accurate diagnosis and appropriate treatment.\n\nBack pain refers to discomfort or pain in the upper, middle, or lower back. It can be acute (lasting a few days to a few weeks) or chronic (lasting for more than three months). Common causes of back pain include muscle strains, poor posture, lifting heavy objects, or sudden awkward movements. Additionally, underlying conditions like herniated discs, spinal stenosis, arthritis, or osteoporosis may contribute to back pain. Treatment options for back pain vary depending on the cause and severity, ranging from rest, gentle exercises, and pain medications to physical therapy or surgical interventions if necessary.\n\nRemember, the information provided here is general in nature. It's always recommended to consult a healthcare professional or visit reliable medical websites for personalized advice and accurate information based on your specific symptoms and medical history.",
  },
  {
    createdAt: Date.now(),
    content:
      "I'm sorry, but I can't generate specific paragraphs from external websites. However, I can provide you with some general information about stomachaches and back pain based on my training. \n\nStomachaches, also known as abdominal pain, can occur for various reasons. The discomfort can range from mild to severe and may be accompanied by bloating, cramping, nausea, or vomiting. Common causes of stomachaches include indigestion, gas, constipation, food poisoning, or stomach viruses. However, more serious conditions such as ulcers, gastritis, gallstones, or appendicitis can also lead to stomach pain. It's important to consult a healthcare professional for an accurate diagnosis and appropriate treatment.\n\nBack pain refers to discomfort or pain in the upper, middle, or lower back. It can be acute (lasting a few days to a few weeks) or chronic (lasting for more than three months). Common causes of back pain include muscle strains, poor posture, lifting heavy objects, or sudden awkward movements. Additionally, underlying conditions like herniated discs, spinal stenosis, arthritis, or osteoporosis may contribute to back pain. Treatment options for back pain vary depending on the cause and severity, ranging from rest, gentle exercises, and pain medications to physical therapy or surgical interventions if necessary.\n\nRemember, the information provided here is general in nature. It's always recommended to consult a healthcare professional or visit reliable medical websites for personalized advice and accurate information based on your specific symptoms and medical history.",
  },
];

export type MakeInvestigationsResponse = {
  content: string;
};

export type MakeInvestigationsPayload = {
  question: string;
  userId: string;
  createdAt?: number;
};

const makeInvestigation = async (payload: MakeInvestigationsPayload): Promise<MakeInvestigationsResponse> => {
  payload.createdAt = Date.now();

  await delay(2000);
  return Promise.resolve(mock);

  // return await post({
  //   url: '/api/investigations/investigations',
  //   body: payload,
  // });
};

const getInvestigations = async (userId: string): Promise<Investigation[]> => {
  await delay(2000);
  return Promise.resolve(mockInvestigations);

  return await request({
    url: `/api/investigations/investigations?userId=${userId}`,
  });
};

export { makeInvestigation, getInvestigations };
