import { useState } from "react";
import { ActivityIndicator, Dimensions, Image, Text, TouchableOpacity, View } from "react-native";

const GifComponent = ({ gifItem }) => {

    const [loading, setLoading] = useState(true);
    const [pause, setPause] = useState(false);

    return (
        <TouchableOpacity onPress={() => { setPause((curr) => !curr) }}>
            {
                pause
                    ?
                    <View>
                        <Image
                            source={{ uri: gifItem.images.downsized_still.url }}
                            style={{ width: 200, height: 200 * (gifItem.images.original.height) / (gifItem.images.original.width) }}
                        />
                        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: 5, height: 20, backgroundColor: 'red', marginHorizontal: 2 }} />
                                <View style={{ width: 5, height: 20, backgroundColor: 'red', marginHorizontal: 2 }} />
                            </View>
                        </View>
                    </View>
                    :
                    <View>
                        <Image
                            source={{ uri: gifItem.images.fixed_width_downsampled.url }}
                            style={{ width: 200, height: 200 * (gifItem.images.original.height) / (gifItem.images.original.width) }}
                            onLoadStart={() => { setLoading(true); }}
                            onLoadEnd={() => { setLoading(false); }}
                        />
                        {
                            loading
                                ?
                                <ActivityIndicator style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} />
                                :
                                null
                        }
                    </View>

            }

        </TouchableOpacity>
    )
}

export default GifComponent;