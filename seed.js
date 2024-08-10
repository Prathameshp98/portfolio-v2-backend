const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Schema = mongoose.Schema;

const TranslationSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});
  

const AboutSchema = new Schema({
    defaultLanguage: { type: String, required: true },
    translations: {
        type: Map,
        of: TranslationSchema,
        required: true
    }
    }, {
    timestamps: true 
});

dotenv.config();   
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_DATABASE_USER}:${process.env.MONGO_DATABASE_PASSWORD}@${process.env.MONGO_DATABASE_CLUSTER}/${process.env.MONGO_DATABASE_NAME}?retryWrites=true&w=majority`;

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const Db = mongoose.model('About', AboutSchema);

    // Read data from JSON file
    const data = JSON.parse(fs.readFileSync('./data/about.json', 'utf-8'));

    // Seed the database
    await Db.deleteMany({});
    await Db.insertMany(data);
    console.log('Database seeded successfully');

    // Close the connection
    await mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding database:', err);
  }
}

seedDatabase();
