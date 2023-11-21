import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from '../components/SearchInput';
import SearchResults from '../components/searchResults';
import { updateHistory, clearHistory } from '../redux/actions/searchActions';

class SearchWrap extends Component { 
  render() {
    return (
      <div className = "searchCont">
        <Search triggerStoreMethod={this.props.dispatchSearchResults}/>
        <SearchResults />
      </div>        
    )
  }
}

const mapStateToProps = (state) => {
  return {
    renderResults: state.recentSearch,
    count: state.count
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSearchResults: () => {
      let location = document.getElementById('autocomplete');
      dispatch(updateHistory(location.value));
      document.getElementById('autocomplete').value = '';
    },
    dispatchClearResults: () => {
      dispatch(clearHistory());
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchWrap)
