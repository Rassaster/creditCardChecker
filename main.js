// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// Valid Credit cards inputed as strings:

const validCreditString1 = '4539677908016808';
const validCreditString2 = '5535766768751439';
const validCreditString3 = '371612019985236';
const validCreditString4 = '6011144340682905';
const validCreditString5 = '4539404967869666';

// Invalid Credit cards inputed as strings added by me:

const invalidCreditString1 = '4532778771091795';
const invalidCreditString2 = '5795593392134643';
const invalidCreditString3 = '375796084459914';
const invalidCreditString4 = '6011127961777935';
const invalidCreditString5 = '5382019772883854';

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2,
  invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5,
  validCreditString1, validCreditString2, validCreditString3, validCreditString4, 
  validCreditString5, invalidCreditString1, invalidCreditString2, invalidCreditString3, 
  invalidCreditString4, invalidCreditString5]

// Add your functions below:

const validCreditCard = [];
const invalidCreditCard = [];
const companiesInvalidNoRepeat = [];
const batchCopy = [];

//stringToArray() checks if the nested arrays are object-type or string-type. If string-type values
//are found, with the (Array.from(String(), Number)) methods the string-type will be turn to be object-type Arrays,
//and will be pushed to a batchCopy[]. All the values in the batchCopy[] array, will be object-type from know on.
const stringToArray = () => {
  for (i = 0; i <= (batch.length); i++) {
    if ((typeof batch[i]) === 'object') {
      batchCopy.push(batch[i]);
    }
    if ((typeof batch[i]) === 'string') {
      batchCopy.push(Array.from(String(batch[i]), Number));
    }
  }
}

//validateCred() is used to classify the credit cards numbers stored in the batchCopy[] Array as valid or invalid, 
// in the validCreditCard[] and invalidCreditCard[] Arrays respectively. With the use of a nested for-loop, it iterates
// throught the batchCopy[] elements (credit card numbers) to splice each of them into the variable getCredNum,
// where the Luhn Algorithm is being applied to verify if the numbers are valid or invalid, and finally push them into the 
// designated empty arrays.
const validateCred = () => {
  let digitsSum;
  for (b = 0; b <= (batchCopy.length - 1); b++) {
    let getCredNum = batchCopy[b].slice();
    for (i = (getCredNum.length - 2); i >= 0; i -=2) {
      checkDigit = getCredNum[i] * 2;
      if (checkDigit > 9) {
        checkDigit -= 9;
        getCredNum.splice(i, 1, checkDigit);
      } else {
        getCredNum.splice(i, 1, checkDigit)
      }  
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    digitsSum = getCredNum.reduce(reducer);
    if ((digitsSum % 10 === 0)) {
      validCreditCard.push(batchCopy[b]);
    }
    if ((digitsSum % 10 !== 0)) {
      invalidCreditCard.push(batchCopy[b]);
    }
  }
  console.log(validCreditCard);
  console.log(`The following are the Valid Credit Cards: ${validCreditCard.join((' <-✓✓✓-> '))}`);
  console.log(invalidCreditCard);
  console.log(`The following are the Invalidad Credit Cards: ${invalidCreditCard.join(' <-xxx-> ')}`);
}

//idInvalidCompanies() determines, based in the initial digit of the credit card numbers, from which companies are the invalid credit cards,
//stored in the invalidCreditCard[] Array. This is made through a control-flow with the if...else-statement, and using the .indexOf() method
//inside an if-statement nested in a foor-loop to guarentee no repetition in returning the Credit Card Companies.
let idInvalidCompanies = () => {
  let companies = [];
  for (i = 0; i <= (invalidCreditCard.length -1); i++) {
    let invalidScopeCard = invalidCreditCard[i].slice();
    if (invalidScopeCard[0] === 3) {
      companies.push('Amex');
    } else if (invalidScopeCard[0] === 4) {
      companies.push('Visa');
    } else if (invalidScopeCard[0] === 5) {
      companies.push('Mastercard');
    } else if (invalidScopeCard[0] === 6) {
      companies.push('Discover');
    } else {
      companies.push('Company not found');
    }
  }
  for (i = 0; i <= (companies.length-1); i++) {
    if (companiesInvalidNoRepeat.indexOf(companies[i]) === -1) {
      companiesInvalidNoRepeat.push(companies[i]);
    }
  }
  console.log(`The following are the companies that holds invalid Credit Cards: ${companiesInvalidNoRepeat.join(', ')}`);
}

stringToArray();
validateCred();
idInvalidCompanies();
