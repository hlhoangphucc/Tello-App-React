import { StyleSheet, Dimensions } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15202b',
  },
  line: {
    height: 0.5,
    backgroundColor: '#38444d',
  },
  lineBody: {
    height: 5,
    backgroundColor: 'black',
  },
  headerContainer: {
    height: 150,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 60,
  },
  headerLeft: {
    width: '85%',
    justifyContent: 'center',
  },
  headerRight: {
    width: '15%',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    color: 'white',
    fontWeight: '600',
  },
  wrap: {
    resizeMode: 'contain',
    width: '50%',
    height: '50%',
  },
  wrapBody: {
    resizeMode: 'cover',
    width: 45,
    height: 45,
    borderRadius: 100,
  },

  bodyContainer: {
    flex: 1,
    width: '100%',
  },

  headerBody: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  headercenterBody: {
    width: '60%',
  },
  imageContainer: {
    width: '20%',
  },
  boderradiusBody: {
    borderRadius: 50,
    borderWidth: 1,
    paddingLeft: 10,
    height: 40,
    justifyContent: 'center',
    borderColor: 'white',
  },
  textheaderBody: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  statusheaderBody: { color: 'white' },
  bottomContainer: {
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentBody: { flex: 1, backgroundColor: 'red' },
  bowshadow: {
    height: '100%',
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#15202b',
    borderRadius: 5,
    shadowColor: '#A0A0A0',
    shadowOpacity: 0,
    shadowRadius: 5,
    elevation: 5,
  },
  boderText: {
    color: 'white',
  },
});
export default styles;
