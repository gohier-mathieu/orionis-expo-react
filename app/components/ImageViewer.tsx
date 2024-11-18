import { StyleSheet } from 'react-native';
import { Image, type ImageSource } from "expo-image";

type Props = {
  imgSource: ImageSource;
  selectedImage?: string;
};

export default function ImageViewer({ imgSource, /* @tutinfo Pass the <CODE>selectedImage</CODE> prop.*/selectedImage }: Props) {
  /* @tutinfo If the selected image is not null, show the image from the device, otherwise, show the placeholder image. */
  const imageSource = selectedImage ? { uri: selectedImage } : imgSource;

  /* @tutinfo <CODE>imgSource</CODE> replaced by <CODE>imageSource</CODE>. */
  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
