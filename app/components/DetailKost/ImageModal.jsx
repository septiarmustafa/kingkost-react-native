import React from 'react';
import { Modal, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../utils/Colors';

export default ImageModal = ({ visible, closeModal, imageSource }) => (
  <Modal visible={visible} transparent>
    <View style={styles.modalContainer}>
      <Image source={imageSource} style={styles.modalImageLarge} />
      <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
        <AntDesign name="closecircle" size={35} color={Colors.PRIMARY_COLOR} />
      </TouchableOpacity>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImageLarge: {
    width: '80%',
    height: '80%',
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 70,
    right: 45,
  },
});

