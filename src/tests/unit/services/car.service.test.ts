import * as sinon from 'sinon';
import chai from 'chai';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/car.model';
import CarService from '../../../services/car.service';
import { carMock, carMockId } from '../../car.mocks';
const { expect } = chai;

describe('testa a camada car service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  before(() => {
    sinon.stub(carModel, 'create').resolves(carMockId);
    sinon.stub(carModel, 'read').resolves([carMockId]);
    sinon.stub(carModel, 'readOne').onCall(0).resolves(carMockId).onCall(1).resolves(null);
  });

  after(()=>{
    sinon.restore();
  })

  describe('create a new car', () => {
    it('sucess', async () => {
      const carCreated = await carService.create(carMock);
      expect(carCreated).to.be.equal(carMockId);
    })
  });

  describe('read car by id', () => {
    it('sucess', async () => {
      const car = await carService.readOne(carMockId._id);
      expect(car).to.be.equal(carMockId);
    });
    it('failure', async () => {
      try {
        await carService.readOne(carMockId._id);
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
      }
    });
  })

  describe('read car', () => {
    it('sucess', async () => {
      const car = await carService.read();
      expect(car.length).to.be.equal(1);
      expect(car[0]).to.be.equal(carMockId);
    })
  })
});