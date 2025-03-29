import {formatCurrency} from '../script/utils/money.js';

if(formatCurrency(2095)==='20.95'){
    console.log("Test Passed");
}
else {
  console.log("Test Failed");
}

if(formatCurrency(0)==='0.00'){
    console.log("Test Passed");
}
else {
  console.log("Test Failed");
}

if(formatCurrency(2000.5)==='20.01'){
  console.log("Test Passed");
}
else {
  console.log("Test Failed");
}