export interface Plan {
    id: string;
    name: string;
    selection: boolean;
    preview: boolean;
    quickCopy: boolean;
    history: boolean;
    translation: boolean;
    capture: boolean;
    quickCapture: boolean;
    hidden: boolean;
    price: number;
    annuelPrice: number;
    color: string;
}
