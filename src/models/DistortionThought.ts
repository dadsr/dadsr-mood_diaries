import {DistortionsThoughtKey, DistortionsThoughtsConst} from "./consts/DistortionsThoughtsConst";


export class DistortionThought {
    private _distortion: DistortionsThoughtKey | null;


    constructor(distortion: DistortionsThoughtKey | null) {
        this._distortion = distortion;
    }


    get getDistortion(): DistortionsThoughtKey | null {
        return this._distortion;
    }

    get displayName(): string {
        if (!this._distortion) return 'Unknown Thought';
        return DistortionsThoughtsConst[this._distortion]?.displayName || this._distortion;
    }
}
