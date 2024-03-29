import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15202b',
  },
  headerContainer: {
    height: 60,

    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  headerLeft: {
    width: '55%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconHeader: {
    color: 'white',
  },
  name: {
    marginLeft: 20,
    color: 'white',
    fontSize: 25,
  },
  avtCircle: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginLeft: 20,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: 'rgba(44, 68, 94, 0.76)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomContainer: {
    height: 50,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  bottomContainerEdit: {
    height: 70,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  bottomLeft: {
    width: '20%',
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomCenter: {
    width: '65%',
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomRight: {
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconInput: {
    color: 'white',
  },
  iconMicInput: {
    color: '#7454f5',
  },
  micTrash: {
    color: 'red',
  },
  keyboardText: {
    color: 'white',
  },
  keyboardTextEdit: {
    color: 'black',
  },
  wrapBody: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },

  messageTextRight: {
    color: 'white',
    fontWeight: '600',
    backgroundColor: 'rgba(29, 44, 60, 0.9)',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    alignSelf: 'flex-end',
    padding: 10,
    justifyContent: 'center',
  },
  messageTextLeft: {
    color: 'white',
    fontWeight: '600',
    backgroundColor: '#999',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignSelf: 'flex-start',
    padding: 10,
  },
  messageItem: {
    margin: 10,
    flex: 1,
  },
  Imgmsg: {
    width: 150,
    height: 150,
    resizeMode: 'stretch',
  },
  clearImageButtonContainer: {
    position: 'absolute',
    width: 25,
    height: 25,
    right: 0,
    borderRadius: 50,
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },

  clearImageButtonText: {
    color: 'black',
    fontSize: 15,
  },
  uploadMedia: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightboxImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  VoiceChatContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  DurationText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#57A7F4',
    paddingHorizontal: 10,
    borderRadius: 20,
    width: '50%',
    height: '50%',
    textAlign: 'center',
  },
  audioPlayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  audioText: {
    color: 'white',
  },
  gridView: { flex: 1 },
  gridItem: {
    width: 120,
    aspectRatio: 1,
    paddingHorizontal: 1,
    paddingVertical: 1,
  },
  buttonContainer: {
    width: '60%',
    backgroundColor: 'rgba(26, 36, 47, 0.9)',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    padding: 25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  handleButton: {
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(210, 210, 210, 1)',
    color: 'black',
    fontWeight: '500',
    borderRadius: 5,
    height: 40,
    width: 100,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  InputContainer: {
    width: '80%',
    borderBottomWidth: 2,
    borderRadius: 5,
    left: 10,
  },
  EditContainer: {
    flexDirection: 'row',
  },
  saveEdit: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});
export default styles;
