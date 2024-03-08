import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15202b',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderColor: '#ccc',
  },
  iconUser: {
    alignItems: 'center',
    padding: 16,
    borderColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  chatInfo: {
    flex: 1,
  },
  iconHeader: {
    color: 'rgba(0, 255, 53, 1)',
    position: 'absolute',
    right: 12,
    bottom: 0,
  },
  flatListHeader: {
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 16,
    color: 'grey',
  },
  message: {
    fontSize: 15,
    color: 'grey',
  },
  line: { height: 1, backgroundColor: 'white', margin: 5 },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    height: 40,
    width: 100,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default styles;
