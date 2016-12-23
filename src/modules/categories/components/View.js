import React from 'react';
import { Tags } from './../../utils/components';
import { Link } from 'react-router';
export default React.createClass({
  getInitialState() {
    return {
      data: this.props.data || []
    }
  },
  componentWillReceiveProps(props) {
    this.setState({
      data: props.data
    })
  },
  render() {
    var data = this.state.data;
    return (
      <div className="card layout-one-card">
        <div className="card-title primary-background">
          {data.category_name}
        </div>
        <div className="card-content">
          <div className="entity">
            <label>Title</label>
            <p>{data.category_name}</p>
          </div>
          <div className="entity">
            <label>Description</label>
            <p>{data.category_desc}</p>
          </div>
          <div className="entity">
            <label>Slug</label>
            <p>{data.category_slug}</p>
          </div>
          <div className="entity feature-image">
            <label>Featured Image</label>
            <img className="materialboxed"  src={data.topic_feature_img}/>
          </div>
          <div className="entity">
            <label>Tags</label>
            <Tags data={data.tags}/>
          </div>
        </div>
        <div className="card-action">
         <Link className="btn" to={'/categories/'+data.category_slug+'/edit'}>
          Edit
         </Link>
        </div>
      </div>



    )
  }
});
