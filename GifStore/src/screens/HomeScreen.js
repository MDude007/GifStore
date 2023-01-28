import { useEffect, useState } from "react";
import { View } from "react-native";
import GifComponent from "../components/GifComponent";
import MasonryList from '@react-native-seoul/masonry-list';
import { GIPHY_API_KEY } from "../constants";
import { MasonryFlashList } from "@shopify/flash-list";

const HomeScreen = () => {

    const [gifData, setGifData] = useState([]);
    const [colHeight1, setColHeight1] = useState(0);
    const [colHeight2, setColHeight2] = useState(0);

    const apiCall = async () => {
        try {
            await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}&limit=20&rating=g&offset=0`)
                .then((resp) => resp.json())
                .then((resp) => {
                    let height1 = colHeight1;
                    let height2 = colHeight2;
                    for (let i = 0; i < resp.data.length - 1; i += 2) {
                        console.log(height1, height2)
                        if (height1 <= height2) {
                            if ((resp.data[i].images.original.height / resp.data[i].images.original.width) < (resp.data[i + 1].images.original.height / resp.data[i + 1].images.original.width)) {
                                let temp = resp.data[i];
                                resp.data[i] = resp.data[i + 1];
                                resp.data[i + 1] = temp;
                            }
                        } else {
                            if ((resp.data[i].images.original.height / resp.data[i].images.original.width) > (resp.data[i + 1].images.original.height / resp.data[i + 1].images.original.width)) {
                                let temp = resp.data[i];
                                resp.data[i] = resp.data[i + 1];
                                resp.data[i + 1] = temp;
                            }
                        }
                        height1 += 200 * resp.data[i].images.original.height / resp.data[i].images.original.width;
                        height2 += 200 * resp.data[i + 1].images.original.height / resp.data[i + 1].images.original.width;
                    }
                    setColHeight1(height1);
                    setColHeight2(height2);
                    setGifData(resp.data);
                })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        apiCall();
    }, [])

    return (
        <View style={{ flex: 1 }}>
            {
                gifData.length != 0
                    ?
                    // <MasonryList
                    //     data={gifData}
                    //     keyExtractor={(item) => item.id}
                    //     numColumns={2}
                    //     showsVerticalScrollIndicator={false}
                    //     renderItem={({ item, index }) => {
                    //         return <GifComponent gifItem={item} />
                    //     }}
                    // //   refreshing={isLoadingNext}
                    // //   onRefresh={() => refetch({first: ITEM_CNT})}
                    // //   onEndReachedThreshold={0.1}
                    // //   onEndReached={() => loadNext(ITEM_CNT)}
                    // />
                    <MasonryFlashList
                        data={gifData}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return <GifComponent gifItem={item} />
                        }}
                        estimatedItemSize={200}
                    />
                    :
                    null
            }

        </View>
    )
}

export default HomeScreen;