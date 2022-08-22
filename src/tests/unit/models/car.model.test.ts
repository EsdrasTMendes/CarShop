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

});