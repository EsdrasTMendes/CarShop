import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './mongoModel';

const frameMongooseSchema = new Schema<ICar>({
  model: String, 
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false });

class CarModel extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('Cars', frameMongooseSchema)) {
    super(model);
  }
}

export default CarModel;