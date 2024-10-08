const sinon = require('sinon');
const { expect } = require('chai');
const Service = require('../src/service');
const PrimaryRepository = require('../src/repository'); // Pastikan ini benar
const SecondaryRepository = require('../src/SecondaryRepository'); // Pastikan ini benar

describe('Service Integration Tests with Multiple Stubs', () => {
    let service;
    let primaryRepositoryStub;
    let secondaryRepositoryStub;

    beforeEach(() => {
        primaryRepositoryStub = sinon.createStubInstance(PrimaryRepository);
        secondaryRepositoryStub = sinon.createStubInstance(SecondaryRepository);
        service = new Service(primaryRepositoryStub, secondaryRepositoryStub); // Pastikan ini mengirimkan stubs
    });

    it('should throw an error if item is not found in both repositories', () => {
        primaryRepositoryStub.getItemById.returns(null);
        secondaryRepositoryStub.getItemById.returns(null);
        
        expect(() => service.getItemById(5)).to.throw('Item not found in both repositories'); // Sesuaikan dengan pesan error
        expect(primaryRepositoryStub.getItemById.calledOnceWith(5)).to.be.true;
        expect(secondaryRepositoryStub.getItemById.calledOnceWith(5)).to.be.true;
    });

    it('should return item from primary repository if found', () => {
        const item = { id: 1, name: 'Item 1' };
        primaryRepositoryStub.getItemById.withArgs(1).returns(item);
        
        const result = service.getItemById(1);
        expect(result).to.deep.equal(item); // Gunakan deep equality
        expect(primaryRepositoryStub.getItemById.calledOnceWith(1)).to.be.true;
        expect(secondaryRepositoryStub.getItemById.notCalled).to.be.true;
    });

    it('should return item from secondary repository if not found in primary', () => {
        primaryRepositoryStub.getItemById.withArgs(3).returns(null);
        const item = { id: 3, name: 'Item 3' };
        secondaryRepositoryStub.getItemById.withArgs(3).returns(item);
        
        const result = service.getItemById(3);
        expect(result).to.deep.equal(item); // Gunakan deep equality
        expect(primaryRepositoryStub.getItemById.calledOnceWith(3)).to.be.true;
        expect(secondaryRepositoryStub.getItemById.calledOnceWith(3)).to.be.true;
    });

    it('should delete an item from primary repository', () => {
        const item = { id: 1, name: 'Item 1' };
        primaryRepositoryStub.getItemById.withArgs(1).returns(item);
        primaryRepositoryStub.deleteItem = sinon.stub().returns(true); // Stub the deleteItem method
    
        const result = service.deleteItem(1);
        expect(result).to.be.true;
        expect(primaryRepositoryStub.getItemById.calledOnceWith(1)).to.be.true;
        expect(primaryRepositoryStub.deleteItem.calledOnceWith(1)).to.be.true;
    });
    
});