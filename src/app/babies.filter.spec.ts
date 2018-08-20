import { TestBed, async } from '@angular/core/testing';
import { FilterBabies } from './babies.filter';
import { Baby} from './entities/baby';


describe('babiesFilter', () => {
    let items : Baby[] = [
       { id: 601, firstname:'lamin', postalCode: '2400', picture: 'no picture yet', age: 8, gender:'MALE'},
       { id: 602, firstname:'oliver', postalCode: '2400', picture: 'no picture yet', age: 18, gender:'MALE'},
       { id: 603, firstname:'feicia', postalCode: '2000', picture: 'no picture yet', age: 48, gender:'FEMALE'},
       { id: 604, firstname:'benjamin', postalCode: '2000', picture: 'no picture yet', age: 8, gender:'MALE'},
    ]

    let filter: FilterBabies;

    beforeEach(() => {
        filter = new FilterBabies();
    })

    it('No search string returns input', () => {
        let result = filter.transform(items, '');
        expect(result.length).toBe(4);
    });


    it('should filter lamin and return 1', () => {
        let filterItems = filter.transform(items, 'lamin')
        expect(filterItems.length).toEqual(1);
    })

    it('Empty array returns empty array', () => {
        let filterItems = filter.transform([], 'Hi');
        expect(filterItems.length).toBe(0);
    });

   /* it('Search for all properties', () => {
        let filterItems = filter.transform(items, 'items');
        expect(filterItems.length).toBe(0);
    });*/
})


/*describe('App: Babies', () => {
 beforeEach(() => {
   this.babies = [
       {_id: '11', firstname: 'Per'},
       {_id: '11', firstname: 'Jens'},
       {_id: '12', firstname: 'Helle'},
       {_id: '13', firstname: 'Jørgen'},
       {_id: '14', firstname: 'Berit'},
      
   ];
   TestBed.configureTestingModule({
     declarations: [
       FilterBabies
     ],
   });
   
   
   describe('FilterBabies', () => {
    let pipe = new FilterBabies();
    it('No search string returns input', () => {
        let result = pipe.transform(this.babies, '');
        expect(result.length).toBe(5);
    });

    describe('FilterOne', () => {
        let pipe = new FilterBabies();
        it('should filter Per and return 1', () => {
            let result = pipe.transform(this.babies, 'per')
            expect(result.length).toBe(1);
        })
    })

    it('Empty array returns empty array', () => {
        let result = pipe.transform([], 'Hi');
        expect(result.length).toBe(0);
    });

    //...More tests
  });
});

 });*/