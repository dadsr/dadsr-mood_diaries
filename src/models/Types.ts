import {CounterThoughtKey} from "./consts/CounterConditioningThoughtsConst";
import {DistortionsThoughtKey} from "./consts/DistortionsThoughtsConst";
import {Emotion} from "./Emotion";
import {DistortionThought} from "./DistortionThought";
import {CounterConditioningThought} from "./CounterConditioningThought";
import {EmotionKey} from "./consts/EmotionsConst";


export interface SerializedEmotion {
    _emotion: EmotionKey | null;
    _intensity: number;
}

export interface SerializedDistortionThought {
    _distortion: DistortionsThoughtKey | null;
}
export interface SerializedCounterConditioningThought {
    _counterThought: CounterThoughtKey | null;
}

export interface SerializedCase {
    id: number;
    caseDate: string;
    caseName: string | null;
    caseDescription: string | null;
    thought: string | null;
    emotions: SerializedEmotion[];
    behavior: string | null;
    symptoms: string | null;
    distortions: SerializedDistortionThought[];
    counterThoughts: SerializedCounterConditioningThought[];
}

export type CaseFormValues = {
    id: number;
    caseName: string;
    caseDescription: string;
    caseDate: Date;
    thought: string;
    emotions: Emotion[];
    behavior: string;
    symptoms: string;
    distortions: DistortionThought[];
    counterThoughts: CounterConditioningThought[];
};

export interface EmotionOption {
    value: EmotionKey;
    label: string;
    intensity: number;
}

export interface ThoughtItem {
    id: string;
    displayName: string;
    description: string;
}

