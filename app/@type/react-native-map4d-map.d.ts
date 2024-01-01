// import * as React from 'react';

// import {
//     Animated,
//     LayoutChangeEvent,
//     NativeSyntheticEvent,
//     NativeScrollEvent,
//     StyleProp,
//     ScrollViewProps,
//     ViewStyle,
//     ImageProps,
//     FlatListProps,
//     ViewPropTypes,
// } from 'react-native';

declare module 'react-native-map4d-map' {
    export class MFMapView extends React.Component<MFMapViewTypes & any, any> {}
    export class MFMarker extends React.Component<any> {}
    export class MFCircle extends React.Component<> {}
    export class MFPolyline extends React.Component<> {}
    export class MFPolygon extends React.Component<> {}
    export class MFPOI extends React.Component<> {}
    export class MFDirectionsRenderer extends React.Component<> {}
    export class MFTileOverlay extends React.Component<> {}
    export class MFGroundOverlay extends React.Component<> {}
    export class MFMarkerCluster extends React.Component<> {}
    export class MFClusterItem extends React.Component<> {}
    interface MFMapViewTypes {
        /**
         * If `false` hide the button to move map to the current user's location.
         * Default value is `false`.
         */
        showsMyLocationButton: boolean;

        /**
         * If `true` the app will ask for the user's location.
         * Default value is `false`.
         */
        showsMyLocation: boolean;

        /**
         * A Boolean indicating whether the map displays buildings.
         * Default value is `true`.
         */
        showsBuildings: boolean;

        /**
         * A Boolean indicating whether the map displays POIs.
         * Default value is `true`.
         */
        showsPOIs: boolean;

        /**
         * If `false` the user won't be able to zoom the map.
         * Default value is `true`.
         */
        zoomGesturesEnabled: boolean;

        /**
         * If `false` the user won't be able to scroll the map.
         * Default value is `true`.
         */
        scrollGesturesEnabled: boolean;

        /**
         * If `false` the user won't be able to pinch/rotate the map.
         * Default value is `true`.
         */
        rotateGesturesEnabled: boolean;

        /**
         * If `false` the user won't be able to tilt the map.
         * Default value is `true`.
         */
        tiltGesturesEnabled: boolean;

        /**
         * The camera view position.
         */
        camera: CameraShape;

        /**
         * Type of map tiles to be rendered.
         */
        mapType: 'roadmap' | 'raster' | 'satellite' | 'map3d';

        /**
         * Callback that is called once the map is fully loaded.
         * @platform android
         */
        onMapReady: () => void;

        /**
         * Callback that is called when user taps on the map.
         */
        onPress: () => void;

        /**
         * Callback that is called when user taps on the POIs
         */
        onPoiPress: () => void;

        /**
         * Callback that is called when user taps on the Buildings
         */
        onBuildingPress: () => void;

        /**
         * Callback that is called when user taps on the Places
         */
        onPlacePress: () => void;

        /**
         * @deprecated This prop is no longer support, which is subject to removal in a future versions.
         */
        onModeChange: () => void;

        /**
         * Callback that is called when moving camera
         */
        onCameraMove: () => void;

        /**
         * Callback that is called when camera start moving
         */
        onCameraMoveStart: () => void;

        /**
         * Callback that is called when camera idle
         */
        onCameraIdle: () => void;

        /**
         * Callback that is called when user taps on location Button
         */
        onMyLocationButtonPress: () => void;

        /**
         * @deprecated This prop is no longer support, which is subject to removal in a future versions.
         */
        onShouldChangeMapMode: () => void;

        /**
         * Callback that is called when user zoom in/out reach limited zoom (min/max zoom or zoom at 17 on 3D)
         */
        onReachLimitedZoom: () => void;
    }
    // interface BarChartProps {
    //     data: BarChartData[];
    //     //height?: number //commented out to show how the "& any" allows us to use this property even when not declared
    //     width?: number;
    //     margin?: MarginValues;
    // }

    // export interface BarChartData {
    //     label: string;
    //     values: BarChartValue | BarChartValue[];
    // }

    // export interface BarChartValue {
    //     x: string;
    //     y: number;
    // }

    // export interface MarginValues {
    //     top?: number;
    //     bottom?: number;
    //     left?: number;
    //     right?: number;
    // }
}
