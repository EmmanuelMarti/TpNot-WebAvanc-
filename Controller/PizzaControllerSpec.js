const pizzaController = require('./PizzaController');
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('TP pizza Controlleur', () => {
    beforeEach(() => {
        let self = this;
        self.server = "https://pizzatp-manumarti.c9users.io/pizzas";
        self.path = "/";
    });

    it("should return array", () => {
        let self = this;
        return chai.request(self.server)
            .get(self.path)
            .then((res) => {
               expect(res).to.be.an('array');
            })
            .catch(err =>{
                console.log(err);
            });
    });
    
    it("should return object", () =>{
       let self = this;
       self.path= "/name";
        return chai.request(self.server)
            .get(self.path)
            .then((res) => {
               expect(res).to.be.an('object');
            })
            .catch(err =>{
                console.log(err);
            });
    });
});
