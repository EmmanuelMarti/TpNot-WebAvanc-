const pizzaController = require('./PizzaController');
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
// On va tester les routes définies dans le contrôleur.
describe('TP pizza Controlleur', () => {
    beforeEach(() => {
        let self = this;
        self.server = "https://pizzatp-manumarti.c9users.io/pizzas";
        self.path = "/";
    });
//on va tester la route principale : le get qui va tout récupérer en base de données
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
//on va tester un getter qui va récupérer l'objet de la pizza demandé
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
