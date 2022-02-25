import * as React from 'react';
import {
  ChangeEvent,
  useEffect,
  useState,
} from 'react';
import './SwitchCheckbox.scss';
import OptionsService from './optionsService';

const SwitchCheckbox: React.FC = () => {
  const [checkOptions, setCheckOptions] = useState(new Map([
    ['preview', { name: 'Prévisualisation', check: false }],
  ]));

  useEffect(() => {
    const optionsString = localStorage.getItem('options');
    if (optionsString) {
      const options = JSON.parse(optionsString);
      Array.from(checkOptions.keys()).forEach((key) => {
        const value: any = checkOptions.get(key);
        checkOptions.set(key, { name: value.name, check: options.checkOptions[key] });
      });
    }
    setCheckOptions(checkOptions);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked: check } = e.target;
    setCheckOptions(checkOptions.set(id, { name: checkOptions.get(id)!.name, check }));
    chrome.storage.local.set({ [id]: e.target.checked });
    // Transforming the map into array is require, otherwise it will be empty for most data storage/manipulation
  };

  const setOption = (optionsMap: Map<string, any>) => {
    OptionsService.getOptions().then((options) => {
      const optionsToSave: {[key: string]: boolean} = {};
      Array.from(optionsMap.keys()).forEach((key) => {
        optionsToSave[key] = optionsMap.get(key).check;
      });
      OptionsService.updateOptions({ ...options, checkOptions: optionsToSave as any });
    });
  };

  useEffect(() => setOption(checkOptions), [checkOptions]);

  return (
    <>
      { Array.from(checkOptions.keys()).map((key: any) => (
        <div key={key}>
          <label htmlFor={key}>{checkOptions.get(key)!.name}</label>
          <input
            name={key}
            checked={checkOptions.get(key)!.check}
            onChange={(e) => handleChange(e)}
            className="react-switch-checkbox"
            id={key}
            type="checkbox"
          />
          <label
            className={`react-switch-label ${checkOptions.get(key)!.check ? 'background-color-of-switch' : ''}`}
            htmlFor={key}
          >
            {/* Flo s'en occupera */}
            <span className="react-switch-button" />
          </label>
        </div>
      ))}
    </>
  );
};

export default SwitchCheckbox;
