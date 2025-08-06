import {JSX} from "react";
import {View, ImageBackground} from "react-native";
import {background} from "../../assets";
import {globalStyles} from "../../src/styles/globalStyles";
import DiaryScreen from "../../src/components/DiaryScreen";




export default function firstDiary(): JSX.Element {
    console.log("firstDiary");
    return (
        <ImageBackground
            source={background}
            style={globalStyles.background}
            resizeMode="cover"
        >
            <View style={globalStyles.container}>
                <DiaryScreen diary={1} />
            </View>
        </ImageBackground>
    );
}
