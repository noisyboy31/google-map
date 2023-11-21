import React, { Component } from 'react';
import {Paper, InputBase, Divider, IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { loadScriptURL } from '../constants/scriptURL';
import defaultMessages from '../constants/staticText';
import MAP_JSON from '../constants/map';

/*This component is designed to have a google autocomplete location search box and a map with a marker pointing to the location that is searched. */

class Search extends Component {
  googleMapRef = React.createRef()
  constructor(props) {
    super(props);
    this.state = {
      lat: MAP_JSON.defaultLocation.lat,
      lng: MAP_JSON.defaultLocation.lng
    }
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.triggerMethod = this.triggerMethod.bind(this);
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = loadScriptURL.initScript;
    script.async = true;
    script.onload = () => this.handleScriptLoad();
    document.body.appendChild(script);
  }

  triggerMethod() {
    this.props.triggerStoreMethod();
  }

  handleScriptLoad() { 
    var options = {
      types: ['(cities)'],
    };
    var _this = this;

    // Initialize Google Autocomplete functionality
    /*global google*/
    var autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options,
    ); 
    autocomplete.addListener('place_changed', function(){
      var place = autocomplete.getPlace();
      if (place && place.geometry && place.geometry.location && place.geometry.location.lat()) {
        _this.setState({
          lat: place.geometry.location.lat()
        });
      }
      else if(place && place.geometry && place.geometry.viewport && place.geometry.viewport.oa && place.geometry.viewport.oa.g) {
        _this.setState({
          lat: place.geometry.viewport.oa.g
        });
      }
      if (place && place.geometry && place.geometry.location && place.geometry.location.lng()) {
        _this.setState({
          lng: place.geometry.location.lng()
        });
      }
      else if(place && place.geometry && place.geometry.viewport && place.geometry.viewport.oa && place.geometry.viewport.oa.h) {
        _this.setState({
          lat: place.geometry.viewport.oa.h
        });
      }
      _this.googleMap = _this.createGoogleMap();
      _this.marker = _this.createMarker();  
      _this.triggerMethod();
    })
    _this.googleMap = _this.createGoogleMap();
    _this.marker = _this.createMarker();  
  }
  
  createGoogleMap = () =>
    new window.google.maps.Map(this.googleMapRef.current, {
      zoom: MAP_JSON.zoom,
      center: {
        lat: this.state.lat,
        lng: this.state.lng,
      },
      disableDefaultUI: true,
  })

  createMarker = () =>
    new window.google.maps.Marker({
      position: { lat: this.state.lat, lng: this.state.lng },
      map: this.googleMap,
  })

  render() {
    return (
      <div className = "InpMapWrap">
        <div className="InpCont">
          <div className = "InputWrap">
            <div className="locationWrapper">
              <Paper className="root">
                <InputBase 
                  className="input" 
                  id = "autocomplete"
                  placeholder= {defaultMessages.searchPlaces}  
                  inputProps={{ 'aria-label': defaultMessages.searchPlaces }}
                />
                <IconButton className="iconButton" aria-label="search">
                  <SearchIcon />
                </IconButton>
                <Divider className="divider" orientation="vertical" />
                <IconButton color="primary" className="iconButton" aria-label="directions">
                  <DirectionsIcon />
                </IconButton>
              </Paper>
            </div>
          </div>
        </div>
        <div className = "Map_Wrapper">
          <div className = "map_cont" id="google-map" ref={this.googleMapRef}></div>
        </div>
      </div>
    );
  }
}

export default Search;
