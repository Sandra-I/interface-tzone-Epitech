import * as React from 'react';
import './SwitchCheckbox.scss';

export class SwitchCheckbox extends React.Component {
  //TODO change default options place to Background.ts
  options = {
    checkOptions: new Map([
      ['previous', { name: 'Prévisualisation', check: false }],
      ['getWord', { name: 'Récupérer la police', check: false }],
      ['getForm', { name: 'Récupérer la mise en forme', check: false }],
    ]),
  };

  constructor(props: any) {
    super(props);
    this.state = this.options;
    this.handleChange = this.handleChange.bind(this);
    chrome.storage.local.get('checkOptions', (result) => {
      if (result.checkOptions && this.options.checkOptions.size == result.checkOptions.length) {
        this.setState({ checkOptions: new Map(result.checkOptions) });
      }
    });
  }

  private handleChange(e: any, state: any) {
    const id = e.target.id;
    let newValue: any = state;
    const changeField = newValue.get(id);
    newValue.set(id, { name: changeField.name, check: e.target.checked });
    this.setState({ checkOptions: newValue });
    //Transforming the map into array is require, otherwise it will be empty for most data storage/manipulation
    chrome.storage.local.set({ 'checkOptions': Array.from(newValue.entries()) });
  }

  render() {
    let value: any = this.state;
    value = value.checkOptions;
    return (
            <>
                { Array.from(value.keys()).map((key: any) => <div key={key} className="Options">
                        <label htmlFor={key}>{value.get(key).name}</label>
                        <input
                            name={key}
                            checked={value.get(key).check}
                            onChange={ (e) => this.handleChange(e, value) }
                            className="react-switch-checkbox"
                            id={key}
                            type="checkbox"
                        />
                        <label
                            className={`react-switch-label ${value.get(key).check ? 'background-color-of-switch' : ''}`}
                            htmlFor={key}>
                            <span className="react-switch-button"/>
                        </label>
                    </div>)}
            </>
    );
  }
}
