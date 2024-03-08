import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(30, 48, 66, 1)',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  Container: {
    flex: 1,
  },
  line: {
    height: 4,
    width: 75,
    backgroundColor: 'gray',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
  BodyContainer: {
    flex: 1,
  },
  BottomContainer: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  bottomCenter: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '80%',
  },
  inputContainer: {
    width: '100%',
    height: 50,
    paddingLeft: 20,
    borderRadius: 50,
    flexDirection: 'row',
    backgroundColor: 'rgba(208, 223, 217, 1)',
  },
  bottomRight: {
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardText: {
    color: 'black',
    width: '95%',
  },
  iconMicInput: {
    color: 'rgba(1, 164, 253, 1)',
  },
  lineBottom: {
    height: 2,
    backgroundColor: 'rgba(76, 115, 111, 1)',
  },
  wrapBody: {
    resizeMode: 'cover',
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  itemName: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  itemContent: {
    color: 'white',
    fontSize: 13,
  },
  contentContainer: {
    backgroundColor: 'rgba(133, 145, 146, 0.3)',
    marginLeft: 10,
    padding: 15,
    borderRadius: 20,
    maxWidth: '90%',
  },
  itemContainer: {
    marginTop: 10,
    marginLeft: 10,
    flexDirection: 'row',
  },
  bottomContainer: {
    width: 200,
    flexDirection: 'row',
    height: 20,
    marginTop: 5,

    justifyContent: 'space-around',
  },
  textBottom: {
    color: 'rgba(194, 209, 210, 1)',
    fontWeight: 'bold',
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
});

export default styles;
