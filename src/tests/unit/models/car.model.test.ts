import * as sinon from 'sinon';
import chai from 'chai';
import {Model} from 'mongoose';
import CarModel from '../../../models/car.model';
import { carMock, carMockId } from '../../car.mocks';
const { expect } = chai;

describe('Car Model test', () => {
  const carModel = new CarModel();
  before(() => {
    sinon.stub(Model, 'create').resolves(carMockId);
    sinon.stub(Model, 'findOne').resolves(carMockId);
    sinon.stub(Model, 'find').resolves([carMockId]);
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a new car', async () => {
    it('sucess', async () => {
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.deep.equal(carMockId);
    })
  });

  describe('searching a car', async () => {
    it('sucess', async () => {
      const car = await carModel.read();
      expect(car.length).to.be.equal(1);
      expect(car[0]).to.be.equal(carMockId);
    })
  });

  describe('searching a car by id', async () => {
    it('sucess', async () => {
      const car = await carModel.readOne(carMockId._id);
      expect(car).to.be.equal(carMockId);
    })
  });

});