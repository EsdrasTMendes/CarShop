import * as sinon from 'sinon';
import chai from 'chai';
import { NextFunction, Request, Response } from 'express';
import { carMock, carMockId } from '../../car.mocks';
import CarController from '../../../controllers/car.controller';
import CarService from '../../../services/car.service';
import CarModel from '../../../models/car.model';
const { expect } = chai;

describe('testa a camada car controller ', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;
  before(() => {
    sinon.stub(carService, 'create').resolves(carMock);
    sinon.stub(carService, 'read').resolves([carMockId]);
    sinon.stub(carService, 'readOne').resolves(carMockId);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('create a new car', () => {
    it('sucess', async () => {
      req.body = carMock;
      await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    })
  });

  describe('read a car by id', () => {
    it('sucess', async () => {
      req.params = { id: carMockId._id };
      await carController.getOne(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockId)).to.be.true;
    })
  });

  describe('read a car', () => {
    it('sucess', async () => {
      await carController.getAll(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([carMockId])).to.be.true;
    })
  });

});