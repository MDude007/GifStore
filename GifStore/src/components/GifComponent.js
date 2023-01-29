import { useContext, useState } from "react";
import { ActivityIndicator, Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../../App";

const GifComponent = ({ gifItem }) => {

    const [loading, setLoading] = useState(true);
    const [pause, setPause] = useState(false);

    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <TouchableOpacity onPress={() => { setPause((curr) => !curr) }}>
            {
                pause
                    ?
                    <View>
                        <Image
                            source={{ uri: gifItem.images.downsized_still.url }}
                            style={{ width: '100%', height: Dimensions.get('screen').width * 0.5 * (gifItem.images.original.height) / (gifItem.images.original.width) }}
                        />
                        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{
                                elevation: 4,
                                shadowColor: '#171717',
                                shadowOffset: { width: 0, height: 3 },
                                shadowOpacity: 0.4,
                                shadowRadius: 2,
                                backgroundColor: 'white',
                                borderRadius: 15
                            }}>
                                <Image source={require('../assets/play_button.png')} style={{ width: 30, height: 30 }} />
                            </View>
                        </View>
                    </View>
                    :
                    <View>
                        <Image
                            source={{ uri: gifItem.images.fixed_width_downsampled.url }}
                            style={{ width: '100%', height: Dimensions.get('screen').width * 0.5 * (gifItem.images.original.height) / (gifItem.images.original.width) }}
                            onLoadStart={() => { setLoading(true); }}
                            onLoadEnd={() => { setLoading(false); }}
                        />
                        {
                            loading
                                ?
                                <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: theme.primary }}>
                                    <ActivityIndicator color={theme.secondary} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} />
                                </View>
                                :
                                null
                        }
                    </View>

            }

        </TouchableOpacity>
    )
}

export default GifComponent;