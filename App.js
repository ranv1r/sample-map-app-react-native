import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';

const DEFAULT_ZOOM_LEVEL = {
  latitudeDelta: 5 / 69,
  longitudeDelta: 5 / 69,
};
export default () => {
  const [region, setRegion] = useState({
    latitude: 40.82293731510131,
    longitude: -101.89044299070224,
    ...DEFAULT_ZOOM_LEVEL,
  });

  const getLocationPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'MapApp Wants to access your location',
          message: 'Location is necessary to find nearby vaccine operators.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const updateRegion = () => {
    Geolocation.getCurrentPosition(
      position => {
        // console.log(position.coords.latitude, position.coords.longitude);
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          ...DEFAULT_ZOOM_LEVEL,
        });
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    switch (Platform.OS) {
      case 'ios':
        Geolocation.requestAuthorization('whenInUse');
        break;
      case 'android':
        getLocationPermissionAndroid().then();
        break;
      default:
        break;
    }
    updateRegion();
  }, []);

  return <MapView style={{...StyleSheet.absoluteFillObject}} region={region} />;
};
