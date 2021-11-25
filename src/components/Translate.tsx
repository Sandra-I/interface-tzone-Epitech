import * as React from "react";
import { Options } from "../models/options";
import OptionsService from "./optionsService"

class Translate extends React.Component {

    langueAvailable: any = {
        Aucun: "",
        France: 'FR',
        German: 'DE',
        American: 'EN-US',
        British: 'EN-GB',
        Spain: 'ES',
    }

    state: { loading: boolean, options?: Options } = {loading: true};

    _asyncRequest: Promise<void | Options> | null = null;

    componentWillMount() {
        this._asyncRequest = OptionsService.getOptions().then( options => {
            this._asyncRequest = null;
            this.setState({loading: false,options})
            console.log("request :",options)
          }
        );
    }

    handleSubmit(e: any) {
        OptionsService.getOptions().then( options=>{
            if(e.target.value === "") options.translateLanguage = null;
            else options.translateLanguage = e.target.value;
            OptionsService.updateOptions(options);
        });
    }

    render(){
        let language = this.state.options?.translateLanguage
        if(!language) language = "";
        return (
            <>
                {
                            <form>
                                <label>
                                    Traduire mon texte en :
                                </label>
                                {!this.state.loading?<select onChange={this.handleSubmit} defaultValue={language}>
                                    {Object.keys(this.langueAvailable).map(key =>
                                        <option key={key} value={this.langueAvailable[key]}>{key}</option>
                                    )}
                                </select>:""}
                            </form>
                    
                }
            </>
        )
    };
}
export default Translate
