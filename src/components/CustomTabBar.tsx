import {ImageBackground} from "react-native";
import {tabs} from "../../assets";
import {globalStyles} from "../styles/globalStyles";

function CustomTabBar(props: BottomTabBarProps) {
    return (
        <ImageBackground
            source={tabs}
            style={globalStyles.imageBackground}
            resizeMode="cover"
        >
            <BottomTabBar {...props} />
        </ImageBackground>
    );
}
