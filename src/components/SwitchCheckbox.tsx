import * as React from 'react';
import {
  ChangeEvent,
  useEffect,
  useState,
} from 'react';
import './SwitchCheckbox.scss';
import { useTranslation } from 'react-i18next';
import OptionsService from '../utils/optionsService';
import UserService from '../services/user-service';
import { User } from '../models/user';
import { Options } from '../models/options';

const SwitchCheckbox: React.FC = () => {
  const { t } = useTranslation();

  const [user, setUser] = useState<User>();
  const [checkOptions, setCheckOptions] = useState(new Map([
    ['preview', { name: 'Prévisualisation', check: false }],
  ]));

  UserService.getMe(setUser);

  const getOptions = () => {
    const optionsString = localStorage.getItem('options');
    if (optionsString) {
      const options: Options = JSON.parse(optionsString);
      return options;
    }
    return OptionsService.defaultOptions;
  };

  useEffect(() => {
    const optionsString = localStorage.getItem('options');
    const newCheckOptions = new Map(checkOptions);
    if (optionsString) {
      const options = JSON.parse(optionsString);
      if (options.checkOptions) {
        Array.from(checkOptions.keys()).forEach((key) => {
          const value: any = checkOptions.get(key);
          newCheckOptions.set(key, { name: value.name, check: options.checkOptions[key] });
        });
      }
    }
    setCheckOptions(newCheckOptions);
  }, []);

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked: check } = e.target;
    const newCheckOptions = new Map(checkOptions);
    setCheckOptions(newCheckOptions.set(id, { name: newCheckOptions.get(id)!.name, check }));
    setOption(newCheckOptions);
  };

  const isEnable = (key: string) => {
    if (key === 'preview') {
      if (getOptions().translateLanguage) {
        return false;
      }
      return user?.permissions.quickCapture;
    }
    return true;
  };

  const isChecked = (key: string) => {
    if (key === 'preview') {
      if (getOptions().translateLanguage) {
        return true;
      }
      if (!user?.permissions.quickCapture) {
        return true;
      }
    }
    return checkOptions.get(key)!.check;
  };

  return (
    <>
      { Array.from(checkOptions.keys()).map((key: any) => (
        <div key={key}>
          <label htmlFor={key} style={{ opacity: isEnable(key) ? 1 : 0.7 }}>{t(key)}</label>
          <input
            name={key}
            checked={isChecked(key)}
            onChange={(e) => handleChange(e)}
            className="react-switch-checkbox"
            id={key}
            type="checkbox"
            disabled={!isEnable(key)}
          />
          <label
            className={`react-switch-label ${
              isChecked(key) ? 'background-color-of-switch' : ''
            }`}
            style={{ opacity: isEnable(key) ? 1 : 0.7 }}
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
