import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },

  header: {
    flex: 1,
    flexDirection: 'row',
    left: 20,
  },
  headerLeft: {
    width: '20%',
    paddingLeft: 10,
    justifyContent: 'center',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    right: 20,
  },
  bodyContainer: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
  },

  wrap: {
    resizeMode: 'cover',
    width: '10%',
    height: 45,
    borderRadius: 100,
  },
  imgcontent: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  videocontent: {
    width: '100%',
    height: 250,
    borderRadius: 5,
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  post_time: { color: 'grey', fontWeight: '400', fontSize: 12 },
  content: {
    color: 'white',
    fontWeight: '400',
    fontSize: 15,
  },
  bottomRight: {
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    color: '#38444d',
  },
  line: {
    height: 3,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#38444d',
  },
  contentContainer: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    height: 40,
    width: 100,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  InteractContainer: {
    flexDirection: 'row',
  },
  textInteract: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    left: 10,
  },
});

export default styles;
