const { BertForTokenClassification, BertTokenizer, pipeline } = require('transformers');
const readline = require('readline');

(async () => {
    // Load the fine-tuned BERT model
    const modelPath = ''; // Replace with the path to your saved model
    const loadedModel = BertForTokenClassification.fromPretrained(modelPath);
    const tokenizer = BertTokenizer.fromPretrained(modelPath);

    // Create a function to extract deadlines from user input
    const extractDeadline = async (userText) => {
        const nlp = pipeline('ner', { model: loadedModel, tokenizer });
        const dateEntities = await nlp(userText);

        dateEntities.forEach(entity => {
            if (entity.entity === 'DATE') {
                const extractedDate = entity.word;
                console.log('Extracted Deadline:', extractedDate);
            }
        });
    };

    // Ask the user to enter a text
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Please enter your text: ', async (userText) => {
        await extractDeadline(userText);
        rl.close();
    });
})();
