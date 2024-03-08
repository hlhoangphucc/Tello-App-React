import { StyleSheet, Dimensions } from 'react-native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    paddingTop: 20,
  },
  moon: {
    backgroundColor: '#181819',
  },
  suny: {
    backgroundColor: 'white',
  },
  header: {
    paddingRight: 20,
    height: '10%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  iconHeader: {
    color: '#50a7ea',
  },
  body: {
    height: '80%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  contentBody: {
    height: '80%',
  },
  scrollContent: {
    alignItems: 'center',
  },
  title: {
    marginTop: 15,
    color: 'white',
    fontSize: 20,
  },
  content: {
    fontSize: 15,
    color: '#757575',
    textAlign: 'center',
  },

  wrap: {
    height: '30%',
    width: WIDTH,
    resizeMode: 'contain',
  },
  wrapDot: {
    position: 'absolute',
    bottom: 150,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotActive: {
    margin: 3,
    color: '#2ca3de',
  },
  dot: {
    margin: 3,
    color: '#555555',
  },
  buttonClick: {
    marginTop: 50,
    height: '10%',
    width: '80%',
    backgroundColor: '#50a7ea',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
export default styles;
