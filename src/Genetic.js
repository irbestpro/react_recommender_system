/*
'''These Codes Are Written By Mehdi Touyserkani
    Email Address: Ir_Bestpro@yahoo.com
    Website: Https://www.Ir-Bestpro.com
 '''
*/


import { JOBS } from "./Data";

//_________Create Chromosome Class_________

class Chromosome {
    // Coefficients : title - location - level - salary
    static coeffs = [0.15,0.15,0.2,0.45]; // coefficient of each Gen
    static matached_items = 10; // number of matched Jobs or number of gens
    static uniques;

    //_____Particles constructor______________

    constructor()
    {
        this.gens = [];
        this.fitness_value = Infinity; // set fitness initial value to the worst case
    }

    setGensRandomly(){
        for(var i=0; i<= Chromosome.matached_items-1;i++){
            this.gens[i] = Math.floor(Math.random() * JOBS.length);
        }
    }

    //_________Fitness Function_______________

    fitness (expected) // this is wrong
    {
        // expected structure: title - location - level - salary
        // expected is user expectations of a job
        var dist = 0;
        for(var i = 0; i<= this.gens.length -1 ; i++){
            dist += ((Math.abs(expected[0] - Chromosome.uniques.titles.indexOf(JOBS[this.gens[i]].Title)+1) / Chromosome.uniques.titles.length) * Chromosome.coeffs[0]);
            dist += ((Math.abs(expected[1] - Chromosome.uniques.locations.indexOf(JOBS[this.gens[i]].Location)+1)/Chromosome.uniques.locations.length) * Chromosome.coeffs[1]);
            dist += ((Math.abs(expected[2] - Chromosome.uniques.levels.indexOf(JOBS[this.gens[i]].Levels)+1) / Chromosome.uniques.levels.length) * Chromosome.coeffs[2]);
            dist += ((Math.abs(expected[3] - JOBS[this.gens[i]].Salary) / 250000)* Chromosome.coeffs[3]);
        }
        this.fitness_value = dist / this.gens.length ;
    }
}

export function Genetic_Recommander_System(expected,uniques)
{    
    var res_prom = new Promise((resolve)=> {
        Chromosome.uniques = uniques; // unique values of title,location,level and salary
        var generations = 1000;
        var pop_count = 800;
        var population = []; // storing each generation population
        var fitness_values = []; // population fitness values
        var itr = 0;
        var mutation_rate = 0.2;

        //___________Generate First Population_____________________

        for(var i = 0; i<= pop_count-1; i++){
            var temp = new Chromosome();
            temp.setGensRandomly();
            temp.fitness(expected);
            population[i] = temp;
            fitness_values.push({index:i,score:temp.fitness_value}); // adding fitness values to a separate object array
        }

        //___________Generate new generations______________________

        while(itr < generations){

            fitness_values = fitness_values.sort((a,b) => a.score - b.score); // sort population ascendingly
            var temp1 = []; // the new population
            fitness_values.map(x=> temp1.push(population[x.index]));
            population = [...temp1]; // sorted population

            //alert("Iteration # " + itr + " Best Solution : " + fitness_values[0].score + " : " + fitness_values[0].index)

            for(i=0;i<=pop_count/4-1;i++){

                var child1 = new Chromosome();
                var child2 = new Chromosome();

                var p1 = population[Math.floor(Math.random()* (pop_count/2))]
                var p2 = population[Math.floor(Math.random()* (pop_count/2))]
                var pivot = Math.floor(Math.random() * Chromosome.matached_items);

                //_______Cross Over Technique___________________

                for(var k=0;k<=pivot-1;k++){
                    child1.gens[k] = p1.gens[k];
                    child2.gens[k] = p2.gens[k];
                }

                for(k=pivot;k<=Chromosome.matached_items-1;k++){
                    child2.gens[k] = p1.gens[k];
                    child1.gens[k] = p2.gens[k];
                }
                
                //_________Applying Mutation Operator___________

                child1.gens[pivot] = Math.ceil(child1.gens[pivot] + child1.gens[pivot] * mutation_rate); // applying mutation operator
                child1.gens[pivot] =  child1.gens[pivot] > JOBS.length-1 ?  Math.floor(Math.random() * JOBS.length): child1.gens[pivot]; 
                
                child2.gens[pivot] = Math.ceil(child2.gens[pivot] + child2.gens[pivot] * mutation_rate); // applying mutation operator
                child2.gens[pivot] =  child2.gens[pivot] > JOBS.length-1 ?  Math.floor(Math.random() * JOBS.length) : child2.gens[pivot];
                
                //_________Adding new children to List__________

                child1.fitness(expected);
                child2.fitness(expected);

                population[pop_count/2 + i] = child1;
                population[pop_count/2 + pop_count/4 + i ] = child2;

                fitness_values[pop_count/2 + i] = {index : pop_count/2+i, score : child1.fitness_value}
                fitness_values[pop_count/2 + pop_count/4 + i] = {index : pop_count/2 + pop_count/4 + i, score : child2.fitness_value}

            }

            itr ++;
        }

            fitness_values = fitness_values.sort((a,b) => a.score - b.score); // sort population ascendingly    
            resolve({gens : population[fitness_values[0].index].gens , score : fitness_values[0].score});
    });

    return res_prom;

};
