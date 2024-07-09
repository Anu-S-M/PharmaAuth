import torch
from transformers import BertForTokenClassification, BertTokenizer, AdamW, get_linear_schedule_with_warmup
from torch.utils.data import DataLoader, TensorDataset
from transformers import pipeline

#Define the labeled dataset with text and corresponding labels (e.g., 'O' for non-date, 'DATE' for date)
train_texts = [
    "🌟 CodeRIT Recruitment 2023-2024! 🌟",
    "Deadline for application: 12 October 2023",
    "Please submit your application by the last date, which is November 15, 2023.",
    "Apply before 31st December 2023 for the upcoming event.",
    "The closing date for registration is September 10, 2023.",
    "Don't forget to meet the deadline on July 7, 2023."
]

train_labels = [
    ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'DATE', 'DATE', 'DATE'],
    ['O', 'O', 'O', 'O', 'DATE', 'DATE', 'DATE', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'DATE', 'DATE', 'DATE', 'DATE', 'DATE', 'DATE'],
    ['O', 'O', 'DATE', 'DATE', 'DATE', 'DATE', 'O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'DATE', 'DATE', 'DATE', 'DATE', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'DATE', 'DATE', 'DATE', 'DATE', 'DATE', 'DATE']
]

# Load a pre-trained BERT model and tokenizer
model_name = "bert-base-cased"  # Choose a BERT model suitable for your language and case requirements
model = BertForTokenClassification.from_pretrained(model_name)
tokenizer = BertTokenizer.from_pretrained(model_name)

# Tokenize and process the training data
input_ids = []
attention_masks = []
label_ids = []

for text, labels in zip(train_texts, train_labels):
    inputs = tokenizer.encode_plus(
        text,
        add_special_tokens=True,
        max_length=128,
        pad_to_max_length=True,
        truncation=True,
        return_attention_mask=True,
        return_tensors="pt"
    )

    input_ids.append(inputs["input_ids"])
    attention_masks.append(inputs["attention_mask"])

    # Convert label tags to label IDs
    label_ids.append([tokenizer.convert_tokens_to_ids(label) for label in labels])

# Create DataLoader
dataset = TensorDataset(torch.cat(input_ids, dim=0), torch.cat(attention_masks, dim=0), torch.tensor(label_ids))
train_dataloader = DataLoader(dataset, batch_size=1)

# Set up the model architecture
model = BertForTokenClassification.from_pretrained(model_name, num_labels=3)  # Adjust num_labels to your dataset

# Set up the optimizer and learning rate scheduler
optimizer = AdamW(model.parameters(), lr=1e-5)
scheduler = get_linear_schedule_with_warmup(optimizer, num_warmup_steps=0, num_training_steps=len(train_dataloader))

# Training loop
num_epochs = 3  # Adjust as needed

for epoch in range(num_epochs):
    model.train()
    for batch in train_dataloader:
        input_ids = batch[0]
        attention_mask = batch[1]
        labels = batch[2]

        outputs = model(input_ids, attention_mask=attention_mask, labels=labels)
        loss = outputs.loss
        loss.backward()
        optimizer.step()
        scheduler.step()
        optimizer.zero_grad()

# Specify the directory path to save the fine-tuned model
model_save_path = 'path/to/save/model'

# Save the fine-tuned model
model.save_pretrained(model_save_path)

# Load the saved model
model = BertForTokenClassification.from_pretrained(model_save_path)

# Ask the user to enter input text
user_text = input("Please enter your text: ")

# Tokenize and extract date entities from user-provided text
nlp = pipeline("ner", model=model, tokenizer=tokenizer)
date_entities = nlp(user_text)

# Process the extracted date entities
for entity in date_entities:
    if entity['entity'] == 'DATE':
        extracted_date = entity['word']
        print("Extracted Deadline:", extracted_date)
