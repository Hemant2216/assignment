import express from"express";
import mongoose from"mongoose";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());
const MONGO_URL='mongodb+srv://root:root@assign.ecgtlqe.mongodb.net/?retryWrites=true&w=majority&appName=assign'

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const FlightSchema = new mongoose.Schema({
  origin: String,
  destination: String,
  partner_program: String,
  min_business_miles: Number,
  min_business_tax: Number,
  min_economy_miles: Number,
  min_economy_tax: Number,
  min_first_miles: Number,
  min_first_tax: Number,
});

const Flight = mongoose.model('Flight', FlightSchema);

app.post('/search', async (req, res) => {
  try {
    const { origin, destination, cabinSelection } = req.body;
    const flights = await Flight.find({ origin, destination });
    res.json({ data: flights });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching for flights.' });
  }
});

const PORT =5555;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));