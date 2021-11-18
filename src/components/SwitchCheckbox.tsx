import * as React from "react";
import { Options } from "../models/options";
import './SwitchCheckbox.scss'
import OptionsService from "./optionsService"

export class SwitchCheckbox extends React.Component {
    //TODO change default options place to Background.ts
    options = new Map([
            ["preview", {name: "Prévisualisation", check: false}],
            ["retrivePolice", {name: "Récupérer la police", check: false}],
            ["retriveFormat", {name: "Récupérer la mise en forme", check: false}],
    ]);

    tt = {
        preview: false,
        retrivePolice: false,
        retriveFormat: false,
        translateLanguage: null
    }

    state: {checkOptions: Map<string,{name: string, check: boolean}>};

    constructor(props: any){
        super(props)
        
        this.state = {checkOptions: this.options };

        let optionsString = localStorage.getItem("options");
        if(optionsString){
            let options = JSON.parse(optionsString);
            Array.from(this.options.keys()).forEach( key=>{
                const value: any = this.options.get(key);
                this.options.set(key, {name: value.name, check: options.checkOptions[key]})
            });
        }
        this.handleChange = this.handleChange.bind(this);
        this.setState( {checkOptions: this.options } );
    }

    private handleChange(e: any, state: any) {
        const id = e.target.id;
        let newValue: any = state;
        const changeField = newValue.get(id);
        newValue.set(id, {name: changeField.name, check: e.target.checked});
        this.setState({checkOptions: newValue});

        this.setOption(newValue);
        //Transforming the map into array is require, otherwise it will be empty for most data storage/manipulation
    }

    setOption(optionsMap: Map<string,any>){
        OptionsService.getOptions().then( options=>{
            let checkOptions: any = {};
            Array.from(optionsMap.keys()).forEach( (key)=>{
                checkOptions[key] = optionsMap.get(key).check;
            })
            options.checkOptions = checkOptions;
            OptionsService.updateOptions(options);
        });
    }

    render(){
        let value: any = this.state.checkOptions
        return (
            <>
                { Array.from(value.keys()).map((key: any) =>
                    <div key={key}>
                        <label htmlFor={key}>{value.get(key).name}</label>
                        <input
                            name={key}
                            checked={value.get(key).check}
                            onChange={  (e)=>this.handleChange(e,value) }
                            className="react-switch-checkbox"
                            id={key}
                            type="checkbox"
                        />
                        <label
                            className={`react-switch-label ${value.get(key).check ? "background-color-of-switch" : ""}`}
                            htmlFor={key}>
                            <span className='react-switch-button'/>
                        </label>
                    </div>
                )}
            </>
        );
    }
}
