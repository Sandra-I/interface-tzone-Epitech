export * from "./tests/index"

export function describe(name: string, test: Function) {
    console.info("Running "+name)
    try{
        test()
    }catch(e){
        console.error("Error",e);
    }
}

export function expected(actual: any) {
    return { 
        toBe: (expected: any) => {
            if( actual == expected){
                return true
            }else{
                throw new Error(`'${actual}' should be '${expected}'`)
            }
        }

    }
}

