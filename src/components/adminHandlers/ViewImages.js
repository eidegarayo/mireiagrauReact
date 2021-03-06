import { getGallery } from '../../services/apiSessions'
import React, { Component } from 'react'
import { Grid, Row} from 'react-bootstrap'
import{Form} from 'react-bootstrap'
import GalleryImages from './GalleryImages'


class ViewImages extends Component {
  constructor(props){
    super(props)
    this.state = {
      sessionsView: [],
      gallery:''
    }
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    getGallery()
      .then(data => {
        this.setState({
          sessionsView: data
        })
     })
  }
  
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event){
  	event.preventDefault()
  }

  render() {
  	

  	const gallerySelected = this.state.gallery.length && this.state.gallery
		const fashionCollections = this.state.sessionsView.filter(session => session.gallery === gallerySelected)
    const imageSession = fashionCollections.map((session, i) => ({
    	name: session.name,
      images: session.img
    }))
    
    
    return (
      <div className="ViewImages">
        <h2 className='titleView'>View collections</h2>
        <Form onSubmit={this.handleSubmit}>
        <select className='selectGallery' value={this.state.gallery} name='gallery' onChange={this.handleChange}>
            <option value="">Select one</option>
            <option value="fashion" name='gallery'>fashion</option>
            <option value="commercial" name='gallery'>commercial</option>
          </select>
        </Form>
        <h3>{this.state.gallery.toUpperCase()} GALLERY:</h3>
        <Grid>
          <Row>
         	<ul>
          {
          	imageSession.map(
          		(gallery, i) =>
          			<GalleryImages title={gallery.name} images={gallery.images} />
          	)
          }
          </ul>
		      
          </Row>
		    </Grid>
      </div>
    );
  }
}

export default ViewImages
