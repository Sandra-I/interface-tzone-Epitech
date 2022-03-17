export * from './check-result';

export function describe(name: string, test: Function) {
  console.info(`Running ${name}`);
  try {
    const testFunc = test();
    if (testFunc.catch) {
      testFunc.catch((e:Error) => { console.error(`Test: error on '${name}' :`, e); });
      testFunc.then(() => {
        console.info('Test: all test on', name, 'passe');
      });
    } else {
      console.info('Test: all test on', name, 'passe');
    }
  } catch (e) {
    console.error(`Test error on '${name}' :`, e);
  }
}

// Todo make sure all test can be tested
function checkSame(actual: any, expected: any): boolean {
  const type = typeof actual;
  switch (type) {
    case 'object':
      // if is a table
      if (actual.length) {
        if (actual.length !== expected.length) return false;
        for (let i = 0; i < actual.length; i += 1) {
          if (!checkSame(actual[i], expected[i])) return false;
        }
        return true;
      }
      throw new Error(`can't compare '${actual}' and '${expected}'`);

    default:
      if (actual === expected) {
        return true;
      }
      throw new Error(`'${actual}' should be '${expected}'`);
  }
}

export function checkExpected(actual: any) {
  return {
    toBe: (expected: any) => checkSame(actual, expected),

  };
}
