import * as React from 'react';
import './SwitchCheckbox.scss';
import OptionsService from './optionsService';

export default class SwitchCheckbox extends React.Component {
  // TODO change default options place to Background.ts
  options = new Map([
    ['preview', { name: 'Prévisualisation', check: false }],
  ]);

  state: {checkOptions: Map<string, {name: string, check: boolean}>};

  constructor(props: any) {
    super(props);

    this.state = { checkOptions: this.options };

    const optionsString = localStorage.getItem('options');
    if (optionsString) {
      const options = JSON.parse(optionsString);
      Array.from(this.options.keys()).forEach((key) => {
        const value: any = this.options.get(key);
        this.options.set(key, { name: value.name, check: options.checkOptions[key] });
      });
    }
    this.handleChange = this.handleChange.bind(this);
    this.setState({ checkOptions: this.options });
  }

  private handleChange(e: any, state: any) {
    const { id } = e.target;
    const newValue: any = state;
    const changeField = newValue.get(id);
    newValue.set(id, { name: changeField.name, check: e.target.checked });
    this.setState({ checkOptions: newValue });

    SwitchCheckbox.setOption(newValue);
    chrome.storage.local.set({ [id]: e.target.checked });
    // Transforming the map into array is require, otherwise it will be empty for most data storage/manipulation
  }

  private static setOption(optionsMap: Map<string, any>) {
    OptionsService.getOptions().then((options) => {
      const checkOptions: any = {};
      Array.from(optionsMap.keys()).forEach((key) => {
        checkOptions[key] = optionsMap.get(key).check;
      });
      OptionsService.updateOptions({ ...options, checkOptions });
    });
  }

  render() {
    const { checkOptions } = this.state;
    return (
      <>
        { Array.from(checkOptions.keys()).map((key: any) => (
          <div key={key}>
            <label htmlFor={key}>{checkOptions.get(key)?.name}</label>
            <input
              name={key}
              checked={checkOptions.get(key)?.check}
              onChange={(e) => this.handleChange(e, checkOptions)}
              className="react-switch-checkbox"
              id={key}
              type="checkbox"
            />
            <label
              className={`react-switch-label ${checkOptions.get(key)?.check ? 'background-color-of-switch' : ''}`}
              htmlFor={key}
            >
              {/* Flo s'en occupe */}
              <span className="react-switch-button" />
            </label>
          </div>
        ))}
      </>
    );
  }
}
