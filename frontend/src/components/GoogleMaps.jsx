import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } 
    from 'react-places-autocomplete';
import AddressService from '../services/address';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.isElVisible = this.isElVisible.bind(this);
    this.state = {
      // for google map places autocomplete
      address: '',

      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      // intial center possition(umss)
      mapCenter: {
        lat: -17.393839589156165,
        lng: -66.14732105790308,
      },
      dataAddress: [],
      isVisible: false
    };
  }

  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        //console.log('Success', latLng, address );
        this.setState({address})
        this.setState({ mapCenter: latLng });
      })
      .catch(error => console.error('Error', error));
  };
  
  componentDidMount() {
    /* AddressService.getAll()
    .then(res => {
      //console.log(res.data.address);
      this.setState({dataAddress: res.data.address})
    })
    .catch(error => {
      console.log(error);
    }) */
    this.getAdress()
  }

  getAdress = async () => {
    try {
      const res = await AddressService.getAll()
      console.log(res.data.address);
      this.setState({dataAddress: res.data.address})
    } catch (error) {
      console.log(error);
    }
  } 

  saveAddress = async () => {
    let data = {
      lat: this.state.mapCenter.lat,
      lng: this.state.mapCenter.lng,
      address: this.state.address  
    } 

   try {
      const res = await AddressService.create(data)
      console.log(res.data);
      this.setState({
        lat: res.data.lat,
        lng: res.data.lng,
        address: res.data.address
      });
   } catch (error) {
     console.log(error);
   }
     /* AddressService.create(data)
    .then(res => {
      this.setState({
        lat: res.data.lat,
        lng: res.data.lng,
        address: res.data.address
      });
      //console.log(res.data);
    })
    .catch(e => {
      console.log(e);
    }); */

    this.componentDidMount()
    this.setState( {address: ''})
  }
  
  isElVisible() {
    this.setState({isVisible: !this.isVisible})
  }
  
  render() {
    const { dataAddress } = this.state
  
    return (
      
      <div className="mt-5">
        <div className="row align-items-start">
          <p>Find Address</p>
        <div className="col mt-3">
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>  
              <input style={{width: '90%'}}
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />

              <div className="autocomplete-dropdown-container" style={{height: '200px'}}>
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  const style = suggestion.active
                    ? { backgroundColor: 'green', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span onClick={this.isElVisible}>                    
                        {suggestion.description}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

        <div style={{height: '70px'}} >
          {this.state.isVisible? 
            <button className = "btn btn-primary" onClick={this.saveAddress}>Save</button>
              :''
          }
        </div>

        <div style={{height: '50px'}}>
          <p>Saved Address</p>
          {
            dataAddress.length ? 
            dataAddress.map(data => 
              <p key={data.id} style={{padding: '0', margin: '0'}}> 
                  {data.address}
               </p>):null
          }

        </div>
        </div>

        <div className="col mt-3">
          <div style={{ position: 'absolute', width: '40%', height: '60%'}}>
            <Map 
              google={this.props.google} zoom={14}
              initialCenter={{
                lat: this.state.mapCenter.lat,
                lng: this.state.mapCenter.lng
              }}
              center={{
                lat: this.state.mapCenter.lat,
                lng: this.state.mapCenter.lng
              }}
              >
              {/* <Marker 
                position={{
                  lat: this.state.mapCenter.lat,
                  lng: this.state.mapCenter.lng
                }} /> */}

                {dataAddress.length ? 
                    dataAddress.map(data => <Marker key={data.id} position={{lat: data.lat, lng: data.lng}} />)
                  :null
                }
             
            </Map>
          </div>
        </div>
        </div>  
      </div>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('YOUR-KEY')
})(MapContainer)

