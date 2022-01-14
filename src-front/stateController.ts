export class StateController {
    public constructor(
        private _mainClass,
        private _activeStateClass
    ) {}

    public activate(): void {
        $(`.${this._mainClass}`).addClass(`${this._activeStateClass}`);
    }

    public disable(): void {
        $(`.${this._mainClass}`).removeClass(`${this._activeStateClass}`);
    }
}