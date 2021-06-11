export * from "./tests/index"



export function describe(name: string, test: Function) {
    console.info("Running "+name)
    try{
        let testFunc = test()
        if(testFunc.catch){
            testFunc.catch((e:Error)=>{console.error("Test: error on '"+name+"' :",e)})
            testFunc.then( ()=>{
                console.info("Test: all test on",name,"passe") 
            })
        }else{
            console.info("Test: all test on",name,"passe")
        }
    }catch(e){
        console.error("Test error on '"+name+"' :",e);
    }
}

export function expected(actual: any) {
    return { 
        toBe: (expected: any) => {
            return checkSame(actual,expected)
        }

    }
}

//Todo make sure all test can be tested
function checkSame(actual: any, expected: any): boolean{
    let type = typeof actual
    switch(type){
        case "object":
            //if is a table
            if(actual.length){
                if(actual.length != expected.length) return false;
                for(let i=0; i<actual.length;i++){
                    if(!checkSame(actual[i],expected[i])) return false;
                }
                return true;
            }else{
                throw new Error(`can't compare '${actual}' and '${expected}'`)
            }
        default:
            if( actual === expected){
                return true
            }else{
                throw new Error(`'${actual}' should be '${expected}'`)
            }
    }
}

