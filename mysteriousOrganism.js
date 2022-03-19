// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

//Factory Function
const pAequorFactory = (specimenNum, dna) => {
  return {
    _specimenNum: specimenNum,
    dna,

    get specimenNum() {
      if (this._specimenNum){
        return this._specimenNum;
      }
    },

    set specimenNum (speciValue){
      if (speciValue && speciValue === this._specimenNum) {
        console.log('no two organisms should have the same number');
      } else {
        this.specimenNum = speciValue;
      }
    },
    //Mutates the dna of the organism (pAequorFactory.dna)
    mutate() {
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      let randomBase = returnRandBase();
      while (this.dna[randomIndex] === randomBase) {
        randomBase = returnRandBase();
      }
      this.dna[randomIndex] = randomBase;
      return this.dna;
    },

    willLikelySurvive() {
      const cOrGCount = this.dna.filter(base => {
        if(base === "C" || base === "G") {
          return true;
        } else {
          return false;
        }
      });

      if (cOrGCount.length/this.dna.length >= 0.6){
        return true;
      } else {
        return false
      }
    }    
  }
}


//Creates 30 instances of the pAequor that can survive
const canSurvive = [];
let count = 1;

while (canSurvive.length < 30) {
  let createdOrg = pAequorFactory(count, mockUpStrand());
  if (createdOrg.willLikelySurvive()) {
    canSurvive.push(createdOrg);
  }
  count++;
}

//Tests to see if code runs and returns the expected results.
console.log(canSurvive);
console.log(canSurvive[0].dna);
console.log(pAequorFactory(1, mockUpStrand()));