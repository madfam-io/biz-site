// Auto-generated file - Do not edit manually
import common from './common.json';
import assessment from './assessment.json';
import calculator from './calculator.json';
import estimator from './estimator.json';
import products from './products.json';
import corporate from './corporate.json';
import legal from './legal.json';
import pages from './pages.json';
import forms from './forms.json';
import system from './system.json';

export default {
  common,
  ...common, // Spread common at root level for backward compatibility
  assessment,
  calculator,
  estimator,
  products,
  corporate,
  ...pages,
  ...forms,
  ...system,
  legal, // Legal namespace must come AFTER pages to prevent overwrite
};
