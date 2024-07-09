const { BertForTokenClassification, BertTokenizer } = require('transformers');
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

// Define the labeled dataset with text and corresponding labels (e.g., 'O' for non-date, 'DATE' for date)
const trainTexts = [
    "🌟 CodeRIT Recruitment 2023-2024! 🌟",
    "Deadline for application: 12 October 2023",
    "Please submit your application by the last date, which is November 15, 2023.",
    "Apply before 31st December 2023 for the upcoming event.",
    "The closing date for registration is September 10, 2023.",
    "Don't forget to meet the deadline on July 7, 2023."
];

const trainLabels = [
    ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'DATE', 'DATE', 'DATE'],
    ['O', 'O', 'O', 'O', 'DATE', 'DATE', 'DATE', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'DATE', 'DATE', 'DATE', 'DATE', 'DATE', 'DATE'],
    ['O', 'O', 'DATE', 'DATE', 'DATE', 'DATE', 'O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'DATE', 'DATE', 'DATE', 'DATE', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'DATE', 'DATE', 'DATE', 'DATE', 'DATE', 'DATE']
];

// Load a pre-trained BERT model and tokenizer
const modelName = 'bert-base-cased';  // Choose a BERT model suitable for your language and case requirements
const tokenizer = BertTokenizer.fromPretrained(modelName);

// Tokenize and process the training data
const inputIds = [];
const attentionMasks = [];
const labelIds = [];

for (const [text, labels] of trainTexts.map((text, index) => [text, trainLabels[index]])) {
    const inputs = tokenizer.encodePlus(
        text,
        {
            addSpecialTokens: true,
            maxSequenceLength: 128,
            padToMaxSequenceLength: true,
            truncation: true,
            returnAttentionMask: true
        }
    );

    inputIds.push(inputs.inputIds);
    attentionMasks.push(inputs.attentionMask);

    // Convert label tags to label IDs
    labelIds.push(labels.map(label => tokenizer.convertTokensToIds(label)));
}

// Create tensors for input data and labels
const inputIdsTensor = tf.tensor(inputIds, 'int32');
const attentionMasksTensor = tf.tensor(attentionMasks, 'int32');
const labelIdsTensor = tf.tensor(labelIds, 'int32');

// Set up the model architecture
const numLabels = 2;  // Adjust numLabels to match the number of unique labels in your dataset
const customModel = BertForTokenClassification.fromPretrained(modelName, { numLabels });

// Set up the optimizer and learning rate scheduler
const optimizer = tf.train.adam(1e-5);
const batchSize = 1;
const numWarmupSteps = 0;
const numTrainingSteps = Math.ceil(trainTexts.length / batchSize) * numEpochs;
const scheduler = tf.train.linearSchedule(optimizer, numWarmupSteps, numTrainingSteps);

// Training loop
const numEpochs = 3;  // Adjust as needed

for (let epoch = 0; epoch < numEpochs; epoch++) {
    for (let i = 0; i < trainTexts.length; i += batchSize) {
        const batchInputIds = inputIdsTensor.slice([i, 0], [batchSize, -1]);
        const batchAttentionMasks = attentionMasksTensor.slice([i, 0], [batchSize, -1]);
        const batchLabelIds = labelIdsTensor.slice([i, 0], [batchSize, -1]);

        const labels = { labels: batchLabelIds };
        const loss = customModel.trainOnBatch([batchInputIds, batchAttentionMasks], labels);
        optimizer.applyGradients(optimizer.computeGradients(() => loss));
        scheduler.step();
    }
}

// Specify the directory path to save the fine-tuned model
const modelSavePath = 'C:\Users\anusm\OneDrive\Desktop\MLTRIES\index.js';

// Save the fine-tuned model
customModel.savePretrained(modelSavePath);

// Load the saved model
const loadedModel = BertForTokenClassification.fromPretrained(modelSavePath);

// Ask the user to enter input text
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Please enter your text: ', (userText) => {
    // Tokenize and extract date entities from user-provided text
    const nlp = pipeline('ner', { model: loadedModel, tokenizer });
    const dateEntities = nlp(userText);

    // Process the extracted date entities
    dateEntities.forEach(entity => {
        if (entity.entity === 'DATE') {
            const extractedDate = entity.word;
            console.log('Extracted Deadline:', extractedDate);
        }
    });

    rl.close();
});



