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
});